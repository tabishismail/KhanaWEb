
import { Login, SignUp } from "../../components"
import { Container, Col, Row } from "react-bootstrap";
import "./css/style.css"




let LoginSignUp = () => {

    return (
        <>
            <Container fluid className='loginMain'>
                <Row>                    
                    <Col className="heads">
                    <div className="myLogin">
                    <h1 className="loginHead">Login</h1>
                        <Login/>
                    </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginSignUp;