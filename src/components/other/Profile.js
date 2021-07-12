import React, {Fragment, useState, useEffect} from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import SessionHelper from "../../sessionHelper/SessionHelper";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {toast, ToastContainer} from "react-toastify";

const Profile = () => {
    const [postState, setPostState] = useState({
        myPostData:[],
    });
    useEffect(() => {
        axios.get(ApiURL.profile(SessionHelper.getUsername()))
            .then(response=>{
                setPostState({myPostData: response.data});
            })
    });
    function onDelete(id){
        axios.get(ApiURL.deletePost(id))
            .then(response=>{
                toast.success("Successfully Deleted",{
                    position:"top-center"
                });
            })
            .catch(error=>{
                toast.error("Server is not responding",{
                    position:"top-center"
                });
            })
    }
    const myPostData = postState.myPostData;
    const myView = myPostData.map((data,index)=>{
        return (
            <Card style={{width:'50rem',margin:5}}>
                <Card.Body>
                    <Link className='btn btn-info' to={"editPost/"+data.pid}>Edit</Link>{' '}
                    <button className='btn btn-danger' type="submit" onClick={() => onDelete(data.pid)}>Delete</button>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Post by {data.name}</Card.Subtitle>
                    <Card.Text>
                        {data.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    })
    return(
        <Fragment>
            <Container>
                <Row style={{marginTop:80,padding:20}} className="justify-content-center">
                    {myView}
                </Row>
                <ToastContainer/>
            </Container>
        </Fragment>
    )
};

export default Profile;