import React from 'react'
import styled from 'styled-components'
import Container from "react-bootstrap/Container";

const LayoutWrapper = styled.div`
margin: 0 auto;
display: grid;
grid-template-rows: auto 1fr auto;
grid-gap: 10px;
padding: 10px;
height: 100vh;
width: 90%;
`

const TitleWrapper = styled.div`
background: black;
color: white;
font-size: 3em;
padding: 10px;
font-family: 'Lacquer', cursive;
`

const Footer = styled.footer`
background: black;
color: white;
  text-align: center;
  padding: 10px;
`;

export default function Layout({ children }) {
    return (
        <Container>
            <LayoutWrapper>
                <TitleWrapper>Obscurify</TitleWrapper>
                {children}
                <Footer>Obscurify - 2020</Footer>
            </LayoutWrapper>
        </Container>
    )

}
