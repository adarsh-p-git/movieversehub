import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'; 
import "./footer.css"
import React from 'react'
import "./header.css"
function Header() {
  return (
    <>
     <Navbar className="navbar1">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://www.pngall.com/wp-content/uploads/13/Movie-Hollywood-PNG-File.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
           <span id='titlehead'>MovieVerse Hub :"Your Gateway to Cinematic Realms!"</span> 
          </Navbar.Brand>
        </Container>
      </Navbar></>
  )
}

export default Header