import React, { Component } from 'react';
import queryString from "query-string";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import Search from './Search';
import Artist from './Artist';
import LeastPopularTrack from './LeastPopularTrack';
import LeastPopularTrackAlbum from './LeastPopularTrackAlbum';
import SignInButton from './SignInButton';
import Layout from './Layout'

// CSS grid layout that switches from 3 to 2 to 1 column as screen width decreases
const GridContainer = styled.div`
display: grid;
grid-gap: 10px;
padding: 10px;
grid-template-areas: "welcome track track" 
                     "search artist album";
img {
  width: 500px; 
  height: 500px;
}

@media only screen and (max-width: 1380px) {
  grid-template-areas:
    "welcome search"
    "track track"
    "artist album";
}

@media only screen and (max-width: 1090px) {
  img {
    width: 300px;
    height: 300px;
  }
}

@media only screen and (max-width: 663px) {
  grid-template-areas:
    "welcome"
    "search"
    "artist"
    "track"
    "album";
}
`


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      leastPopularTrackName: null,
      leastPopularTrackURL: null,
      leastPopularTrackAlbumName: null,
      leastPopularTrackAlbumImageURL: null,
      searchResults: null,
      artistImageURL: null,
      artistName: null,
      searching: false,
      found: false,
      accessToken: "",
    };
  }

  setArtistDetails(artist) {
    this.setState({
      artistName: artist.name,
      artistImageURL: artist.images[0].url,
      found: false,
      searching: true,
    })
  }

  async componentDidMount() {
    // get access token for API calls from URL
    if (this.state.accessToken.length === 0) {
      let parsed = queryString.parse(window.location.search);
      this.setState({
        accessToken: parsed.access_token,
      })
    }

    // get the logged in user's name
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    const data = await response.json();
    this.setState({
      user: data.display_name,
    });
  }

  async findLeastPopularTrack(trackIDs) {
    let leastPopular;
    let leastPopularTrackAlbum;

    // get each tracks popularity
    for (let i = 0; i < trackIDs.length; i++) {
      const res = await fetch(
        `https://api.spotify.com/v1/tracks/${trackIDs[i]}`,
        {
          headers: {
            Authorization: "Bearer " + this.state.accessToken,
          },
        }
      );
      const data = await res.json();

      // a track is the least popular if it's popularity is less than the current least popular track
      if (leastPopular === null || data.popularity < leastPopular.popularity) {
        if (data.artists[0].name === this.state.artistName) {
          leastPopular = data;
          leastPopularTrackAlbum = data.album;
        }
      }
    }

    this.setState({
      leastPopularTrackName: leastPopular.name,
      leastPopularTrackAlbumImageURL: leastPopularTrackAlbum.images[0].url,
      leastPopularTrackURL: leastPopular.preview_url,
      leastPopularTrackAlbumName: leastPopularTrackAlbum.name,
      found: true,
    })
  }

  async getTracks(albums) {
    // get tracks for each album, resolving the promise on the last album
    const trackIDs = [];
    const prom = new Promise((resolve, reject) => {
      albums.forEach(async (album, index, array) => {
        const res = await fetch(
          `https://api.spotify.com/v1/albums/${album.id}/tracks`,
          {
            headers: {
              Authorization: "Bearer " + this.state.accessToken,
            },
          }
        );
        const data = await res.json();
        data.items.forEach(item => trackIDs.push(item.id))
        if (index === array.length - 1) { resolve(); }
      })
    })
    prom.then(() => this.findLeastPopularTrack(trackIDs));
  }

  async getAlbums(artistID) {
    this.setState({
      searching: true,
    })

    // get all albums for an artist
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums`,
      {
        headers: {
          Authorization: "Bearer " + this.state.accessToken,
        },
      }
    );
    const data = await res.json();
    const albums = data.items;

    this.getTracks(albums);
  }

// render the sign in button if the user is not signed in
  render() {
    return (
      <Layout>
        {
          this.state.user ?
            <GridContainer>
              <div style={{ gridArea: `welcome` }}>
                <h2>Welcome</h2>
                {this.state.user}</div>
              <Search getAlbums={this.getAlbums.bind(this)} setArtistDetails={this.setArtistDetails.bind(this)} accessToken={this.state.accessToken}/>
              {this.state.searching ? <div>
                <Artist artistName={this.state.artistName} artistImageURL={this.state.artistImageURL} /> </div> : null}
              {this.state.found ?
                <LeastPopularTrackAlbum searching={this.state.searching} leastPopularTrackAlbumName={this.state.leastPopularTrackAlbumName} leastPopularTrackAlbumImageURL={this.state.leastPopularTrackAlbumImageURL} />
                : this.state.searching ? <div style={{ paddingTop: `15px` }}>Analyzing<br /><Loader type="Audio" color="#00BFFF" height={80} width={80} /></div> : null}
              {this.state.found ?
                <LeastPopularTrack searching={this.state.searching} leastPopularTrackName={this.state.leastPopularTrackName} leastPopularTrackURL={this.state.leastPopularTrackURL} />
                : null}
            </GridContainer> :
            <SignInButton />
        }
      </Layout>
    )
  }
}

export default App;
