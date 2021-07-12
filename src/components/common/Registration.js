import React, {Fragment, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import Validation from "../../validation/Validation";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from "react-router";

const Registration = () => {
    const [nameState, setNameState] = useState({
        name:'',
    });
    const [siteState, setSiteState] = useState({
        site:'',
    });
    const [emailState, setEmailState] = useState({
        email:'',
    });
    const [passState, setPassState] = useState({
        password:'',
    });
    const [redirectState, setRedirectState] = useState({
        loginRedirect:false,
    });

    function onLoginRedirect() {
        if(redirectState.loginRedirect === true){
            return(
                <Redirect to="/login"/>
            )
        }
    }
    const nameOnChange=(event)=>{
        let name = event.target.value;
        setNameState({name:name});
    }
    const siteOnChange=(event)=>{
        let site = event.target.value;
        setSiteState({site:site});
    }
    const emailOnChange=(event)=>{
        let email = event.target.value;
        setEmailState({email:email});
    }
    const passwordOnChange=(event)=>{
        let password = event.target.value;
        setPassState({password:password});
    }
    const onFormSubmit=(event)=>{
        let name = nameState.name;
        let site = siteState.site;
        let email = emailState.email;
        let password = passState.password;

        if(name.length===0){
            toast.error("Name Required",{
                position:"top-center"
            });
        }
        else if(email.length===0){
            toast.error("Email Required",{
                position:"top-center"
            });
        }
        else if(site.length===0){
            toast.error("Website link required",{
                position:"top-center"
            });
        }
        else if(password.length===0){
            toast.error("Enter the password",{
                position:"top-center"
            });
        }
        else if(!(Validation.nameRegex).test(name)){
            toast.error("Invalid Name Format",{
                position:"top-center"
            });
        }
        else if(!(Validation.emailRegex).test(email)){
            toast.error("Invalid Email",{
                position:"top-center"
            });
        }
        else{
            let myFormData = new FormData();
            myFormData.append("name",name);
            myFormData.append("site",site);
            myFormData.append("email",email);
            myFormData.append("password",password);

            axios.post(ApiURL.register,myFormData)
                .then(response=>{
                    if(response.data===1){
                        alert("Registration Successful");
                        setRedirectState({loginRedirect:true});
                    }
                })
                .catch(error=>{
                    toast.error("Server is not responding",{
                        position:"top-center"
                    });
                })
        }
        event.preventDefault();
    }
    return (
        <Fragment>
            <Container>
                <Row style={{marginTop:80}} className="justify-content-center">
                    <Card style={{padding:20,width:'30rem'}}>
                        <Card.Header className="text-center" as="h3"><b>Registration</b></Card.Header>
                        <Form onSubmit={onFormSubmit} style={{padding:10}}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control onChange={nameOnChange} type="text" placeholder="Enter username" />
                                <Form.Text className="text-muted">
                                    Username should be valid identifier.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="site">
                                <Form.Label>Website</Form.Label>
                                <Form.Control onChange={siteOnChange} type="text" placeholder="Your Website" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control onChange={emailOnChange} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={passwordOnChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Registration
                            </Button>
                        </Form>
                    </Card>
                </Row>
                <ToastContainer/>
            </Container>
            {onLoginRedirect()}
        </Fragment>
    );
};

export default Registration;