import React, { Component } from 'react'
import queryString from "query-string";
import styled from 'styled-components'

const SearchForm = styled.form`
display: grid;
grid-gap: 4px;
grid-template-columns: 2fr 1fr;
button {
  color: white;
  background: black;
  text-transform: uppercase;
  font-weight: 500;
  padding: 5px;
  border: 1px solid white;
}

input {
  border: 1px solid grey;;
}
`

export default class Search extends Component{
    async handleSubmit(e) {
        e.preventDefault();
        // format query string parameters
        const searchParams = e.currentTarget[0].value.split(" ").join("+");
        const res = await fetch(
          `https://api.spotify.com/v1/search?query=${searchParams}&type=artist&limit=1`,
          {
            headers: {
              Authorization: "Bearer " + this.props.accessToken,
            },
          }
        );
        const data = await res.json();

        // break out of function if no artists were found
        if(data.artists.items.length === 0){
          return;
        }

        const artist = data.artists.items[0];
        const artistID = artist.id;
    
        this.props.setArtistDetails(artist)
        this.props.getAlbums(artistID);
      }


    render(){
    return (
        <div style={{gridArea:`search`}}>
            <h2>Search</h2>
                <SearchForm onSubmit={(e) => this.handleSubmit(e)}>
                  <input type="text" />
                  <button type="submit">Find</button>
                </SearchForm>
        </div>
    )
    }
}
