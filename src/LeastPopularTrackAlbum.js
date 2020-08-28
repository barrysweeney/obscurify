import React from 'react'

export default function LeastPopularTrackAlbum({ leastPopularTrackAlbumName, leastPopularTrackAlbumImageURL }) {
    return (
        <div style={{gridArea:"album"}} >
            <h2>Album</h2>
            {leastPopularTrackAlbumName}<br/>
            <img src={leastPopularTrackAlbumImageURL} alt={`${leastPopularTrackAlbumName} album cover`}/>

        </div>
    )
}
