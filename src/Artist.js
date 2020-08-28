import React from 'react'

export default function Artist({artistName, artistImageURL}) {
    return (
        <div style={{gridArea:`artist`}}>
            <h2>Artist</h2>
            <div>
                {artistName}<br/>
                <img src={artistImageURL} alt={artistName}/>
            </div>
        </div>
    )
}
