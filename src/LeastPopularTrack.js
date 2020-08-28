import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'

export default function LeastPopularTrack({ leastPopularTrackName, leastPopularTrackURL }) {
    return (
        <div style={{gridArea:`track`}}>
            <h2>Least Popular Track</h2>
            {leastPopularTrackName}&nbsp;
            {leastPopularTrackURL ? <a href={leastPopularTrackURL}><FaPlayCircle /></a> : null}
        </div>
    )
}
