import React, {Component, Fragment} from 'react';
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import {toast, ToastContainer} from "react-toastify";
import SessionHelper from "../../sessionHelper/SessionHelper";
import {Redirect} from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavMenu from "../common/NavMenu";

class EditPost extends Component {
    constructor({match}) {
        super();
        this.state= {
            code: match.params.code,
            name: "",
            title: "",
            description: "",
            postRedirect:false,
        }
    }
    titleOnChange=(event)=> {
        let name = SessionHelper.getUsername();
        let title = event.target.value;
        this.setState({name: name});
        this.setState({title: title});
    }
    descriptionOnChange=(event)=>{
        let description = event.target.value;
        this.setState({description:description});
    }
    onPostRedirect=()=>{
        if(this.state.postRedirect === true){
            return(
                <Redirect to="/posts"/>
            )
        }
    }
    onFormSubmit=(event)=>{
        let name = this.state.name;
        let title = this.state.title;
        let description = this.state.description;
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
            axios.post(ApiURL.updatePost(this.state.code),myFormData)
                .then(response=>{
                    this.setState({postRedirect:true});
                    toast.success("Post Successfully Updated",{
                        position:'bottom-center'
                    })
                })
                .catch(error=>{
                    toast.error("Server Problem");
                })
        }
        event.preventDefault();
    }
    render() {
        return (
            <Fragment>
                <NavMenu/>
                <Container>
                    <Row style={{marginTop:80}} className="justify-content-center">
                        <Card style={{padding:20,width:'30rem'}}>
                            <Card.Header className="text-center" as="h3"><b>Edit Post</b></Card.Header>
                            <Form onSubmit={this.onFormSubmit} style={{padding:10}}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" value={SessionHelper.getUsername()} placeholder="Enter username" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control onChange={this.titleOnChange} type="text" placeholder="Post Title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control onChange={this.descriptionOnChange} type="text" placeholder="Post Description" />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Post Update
                                </Button>
                            </Form>
                        </Card>
                    </Row>
                    <ToastContainer/>
                </Container>
            </Fragment>
        );
    }
}

export default EditPost;