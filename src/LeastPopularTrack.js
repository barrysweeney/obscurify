import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'

export default function LeastPopularTrack({ leastPopularTrackName, leastPopularTrackURL }) {
    // renders track name and a link to a preview of the track
    return (
        <div style={{gridArea:`track`}}>
            <h2>Least Popular Track</h2>
            {leastPopularTrackName}&nbsp;
            {leastPopularTrackURL ? <a href={leastPopularTrackURL}><FaPlayCircle /></a> : null}
        </div>
    )
}
