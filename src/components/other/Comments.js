import React, {Component, Fragment} from 'react';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import NavMenu from "../common/NavMenu";
import SessionHelper from "../../sessionHelper/SessionHelper";

class Comments extends Component {
    constructor({match}) {
        super();
        this.state= {
            code: match.params.code,
            comment: "",
            commentsData:[],
            postInfoData:[]
        }
    }
    nameOnChange=(event)=>{
        let comment = event.target.value;
        this.setState({comment:comment});
    }
    onFormSubmit=(event)=>{
        let comment = this.state.comment;
        if(SessionHelper.getUsername()===null){
            toast.error("You must login first",{
                position:"top-center"
            })
        }
        else if(comment.length===0){
            toast.error("Comment Required",{
                position:"top-center"
            });
        }
        else{
            let myFormData = new FormData();
            myFormData.append("comment",comment);

            axios.post(ApiURL.addComment(this.state.code,SessionHelper.getUsername()),myFormData)
                .then(response=>{
                    if(response.data===1){
                        toast.success("Comment Successfully Added",{
                            position:"top-center"
                        })
                    }
                    else{
                        toast.error("Fail To Comment",{
                            position:"top-center"
                        })
                    }
                })
                .catch(error=>{
                    toast.error("Server is not responding",{
                        position:"bottom-center"
                    });
                })
        }
    }
    componentDidMount() {
        axios.get(ApiURL.comments(this.state.code))
            .then(response=>{
                this.setState({commentsData: response.data});
            })
        axios.get(ApiURL.postInfo(this.state.code))
            .then(response=>{
                this.setState({postInfoData: response.data});
            })
    }
    render() {
        const myCommentsData = this.state.commentsData;
        const myView = myCommentsData.map((data,index)=>{
            return (
                <Card style={{width:'45rem',margin:5,padding:10}}>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        {data.comment}
                    </Card.Text>
                </Card>
            );
        })
        const myPostInfoData = this.state.postInfoData;
        const myPostInfoView = myPostInfoData.map((data,index)=>{
            return (
                <Card style={{padding:15}}>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Post by {"Post Author"}</Card.Subtitle>
                    <Card.Text>
                        {data.description}
                    </Card.Text>
                </Card>
            );
        })
        return (
            <Fragment>
                <NavMenu/>
                <Row style={{marginTop:80,padding:20}} className="justify-content-center">
                    <Card style={{width:'50rem',margin:5}}>
                        <Card.Body>
                            {myPostInfoView}
                            <Form onSubmit={this.onFormSubmit} style={{padding:10}}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Control onChange={this.nameOnChange} type="text" placeholder="Write Your Comment" />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Comment
                                </Button>
                            </Form>
                            {myView}
                        </Card.Body>
                    </Card>
                </Row>
                <ToastContainer/>
            </Fragment>
        );
    }
}

export default Comments;