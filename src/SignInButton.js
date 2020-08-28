import React from 'react'
import { FaSpotify } from 'react-icons/fa'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
padding: 10px;
background: #1DB954;
height: 100px;
width: 200px;
margin: 0 auto;
border: 1px solid green;
font-size: 1em;
`

// makes request to backend to sign in using Spotify when clicked
export default function SignInButton() {
    return (
        <ButtonWrapper
        onClick={() =>
          (window.location =
            "https://mysterious-mountain-71204.herokuapp.com/login")
        }
      >
        Login in with Spotify <FaSpotify /></ButtonWrapper>
    )
}
