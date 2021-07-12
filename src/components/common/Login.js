import React, {Fragment, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import SessionHelper from "../../sessionHelper/SessionHelper";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from "react-router";

const Login = () => {
    const [nameState, setNameState] = useState({
        name:'',
    });
    const [passState, setPassState] = useState({
        password:'',
    });
    const [redirectState, setRedirectState] = useState({
        userRedirect:false,
    });

    function onUserRedirect() {
        if(redirectState.userRedirect === true){
            return(
                <Redirect to="/"/>
            )
        }
    }
    const nameOnChange=(event)=>{
        let name = event.target.value;
        setNameState({name:name});
    }
    const passwordOnChange=(event)=>{
        let password = event.target.value;
        setPassState({password:password});
    }
    const onFormSubmit=(event)=>{
        event.preventDefault();
        let name = nameState.name;
        let password = passState.password;

        if(name.length===0){
            toast.error("Name Required",{
                position:"top-center"
            });
        }
        else if(password.length===0){
            toast.error("Password Required",{
                position:"top-center"
            });
        }
        else{
            let myFormData = new FormData();
            myFormData.append("name",name);
            myFormData.append("password",password);

            axios.post(ApiURL.login,myFormData)
                .then(response=>{
                    if(response.data===1){
                        SessionHelper.setUsername(name);
                        setRedirectState({userRedirect:true});
                    }
                    else{
                        toast.error("Invalid Information",{
                            position:"bottom-center"
                        });
                    }
                })
                .catch(error=>{
                    toast.error("Server is not responding",{
                        position:"bottom-center"
                    });
                })
        }
    }
    return (
        <Fragment>
            <Container>
                <Row style={{marginTop:150}} className="justify-content-center">
                    <Card style={{padding:20,width:'30rem'}}>
                        <Card.Header className="text-center" as="h3"><b>Login</b></Card.Header>
                        <Form onSubmit={onFormSubmit} style={{padding:10}}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control onChange={nameOnChange} type="text" placeholder="Username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={passwordOnChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                </Row>
                <ToastContainer/>
            </Container>
            {onUserRedirect()}
        </Fragment>
    );
};

export default Login;