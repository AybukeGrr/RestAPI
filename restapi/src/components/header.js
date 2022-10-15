import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavBar(){
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Photos API
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
}

export default NavBar
