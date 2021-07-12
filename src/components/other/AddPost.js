import React, {Fragment, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import SessionHelper from "../../sessionHelper/SessionHelper";
import {Redirect} from "react-router";

const AddPost = () => {
    const [nameState, setNameState] = useState({
        name:'',
    });
    const [titleState, setTitleState] = useState({
        title:'',
    });
    const [descriptionState, setDescriptionState] = useState({
        description:'',
    });
    const [redirectState, setRedirectState] = useState({
        postRedirect:false,
    });
    function onPostRedirect() {
        if(redirectState.postRedirect === true){
            return(
                <Redirect to="/posts"/>
            )
        }
    }
    const titleOnChange=(event)=>{
        let name = SessionHelper.getUsername();
        let title = event.target.value;
        setNameState({name:name});
        setTitleState({title:title});
    }
    const descriptionOnChange=(event)=>{
        let description = event.target.value;
        setDescriptionState({description:description});
    }
    const onFormSubmit=(event)=>{
        let name = nameState.name;
        let title = titleState.title;
        let description = descriptionState.description;
        if(title.length===0){
            toast.error("Title Required",{
                position:"top-center"
            });
        }
        else if(description.length===0){
            toast.error("Description Required",{
                position:"top-center"
            });
        }
        else{
            let myFormData = new FormData();
            myFormData.append("name",name);
            myFormData.append("title",title);
            myFormData.append("description",description);
            axios.post(ApiURL.addPost,myFormData)
                .then(response=>{
                    if(response.data===1){
                        alert("Post Successfully Added");
                        setRedirectState({postRedirect:true});
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
                        <Card.Header className="text-center" as="h3"><b>Add New Post</b></Card.Header>
                        <Form onSubmit={onFormSubmit} style={{padding:10}}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" value={SessionHelper.getUsername()} placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control onChange={titleOnChange} type="text" placeholder="Post Title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control onChange={descriptionOnChange} type="text" placeholder="Post Description" />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Post Add
                            </Button>
                        </Form>
                    </Card>
                </Row>
                <ToastContainer/>
            </Container>
            {onPostRedirect()}
        </Fragment>
    );
};

export default AddPost;