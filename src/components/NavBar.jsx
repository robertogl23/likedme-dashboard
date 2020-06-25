import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
export default function NavBar() {
  const [data, setDate] = useState(JSON.parse(sessionStorage.getItem('id')))
  const history = useHistory();
  const logout = () => {
    sessionStorage.removeItem("id");
    history.push("/");
  }
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#home">LikedMe</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title={data.firtsName} id="basic-nav-dropdown">
            <NavDropdown.Item >Perfil</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>
              Cerrar Sesion
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
     
      </Navbar.Collapse>
    </Navbar>
  );
}
