import React, {Fragment, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link, Redirect} from "react-router-dom";
import SessionHelper from "../../sessionHelper/SessionHelper";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ApiURL from "../../api/ApiURL";

const NavMenu = () => {
    const [redirectState, setRedirectState] = useState({
        homeRedirect:false,
    });

    const onLogout=()=>{
        SessionHelper.removeUsername();
        setRedirectState({homeRedirect:true});
        axios.get(ApiURL.logout)
            .then(response=>{
                if(response.data===1){
                    alert("Logout Successful");
                }
                else{
                    alert("Logout Fail");
                }
            })
            .catch(error=>{
                alert("Logout Fail");
            })
    }
    function onHomeRedirect(){
        if(redirectState.homeRedirect === true){
            return(
                <Redirect to="/"/>
            )
        }
    }
    if(SessionHelper.getUsername()===null){
        return (
            <Fragment>
                <Navbar fixed={"top"} bg="dark" variant="dark">
                    <Container>
                        <Row>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand href="/">
                                    Home
                                </Navbar.Brand>
                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand>
                                    <Link to="/posts">Posts</Link>
                                </Navbar.Brand>
                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand>
                                    <Link to="/users">Users</Link>
                                </Navbar.Brand>
                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand className="justify-content-end">
                                    <Link to="/login">Login</Link>
                                </Navbar.Brand>

                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand className="justify-content-end">
                                    <Link to="/registration">Register</Link>
                                </Navbar.Brand>
                            </Col>
                        </Row>
                        {onHomeRedirect()}
                    </Container>
                </Navbar>
            </Fragment>
        );
    }
    else{
        return (
            <Fragment>
                <Navbar fixed={"top"} bg="dark" variant="dark">
                    <Container>
                        <Row>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand href="/">
                                    Home
                                </Navbar.Brand>
                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand>
                                    <Link to="/posts">Posts</Link>
                                </Navbar.Brand>
                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand>
                                    <Link to="/users">Users</Link>
                                </Navbar.Brand>
                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand>
                                    <Link to="/addPost">AddPost</Link>
                                </Navbar.Brand>
                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand className="justify-content-end">
                                    <Link to={"/profile/"+SessionHelper.getUsername()}>Profile</Link>
                                </Navbar.Brand>
                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={8} xs={8}>
                                <Navbar.Brand className="justify-content-end">
                                    <Button onClick={onLogout} variant="danger" type="submit">
                                        Logout
                                    </Button>
                                </Navbar.Brand>
                            </Col>
                        </Row>
                        {onHomeRedirect()}
                    </Container>
                </Navbar>
            </Fragment>
        );
    }
};

export default NavMenu;