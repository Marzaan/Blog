import React, {Fragment, useState, useEffect} from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import {Link} from "react-router-dom";

const Posts = () => {
    const [postState, setPostState] = useState({
        postData:[],
    });
    useEffect(() => {
        axios.get(ApiURL.posts)
            .then(response=>{
                setPostState({postData: response.data});
            })
    });
    const myPostData = postState.postData;
    const myView = myPostData.map((data,index)=>{
        return (
            <Card style={{width:'50rem',margin:5}}>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Post by {data.name}</Card.Subtitle>
                    <Card.Text>
                        {data.description}
                    </Card.Text>
                    <Link to={"comments/"+data.pid}>View Details</Link>
                </Card.Body>
            </Card>
        );
    })
    return(
        <Fragment>
            <Row style={{marginTop:80,padding:20}} className="justify-content-center">
                {myView}
            </Row>
        </Fragment>
    )
};

export default Posts;