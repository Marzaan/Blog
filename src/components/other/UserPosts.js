import React, {Component, Fragment} from 'react';
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavMenu from "../common/NavMenu";

class UserPosts extends Component {
    constructor({match}) {
        super();
        this.state= {
            code: match.params.code,
            myPostData:[]
        }
    }
    componentDidMount() {
        axios.get(ApiURL.userPosts(this.state.code))
            .then(response=>{
                this.setState({myPostData: response.data});
            })
    }

    render() {
        const myPostData = this.state.myPostData;
        const myView = myPostData.map((data,index)=>{
            return (
                <Card style={{width:'50rem',margin:5}}>
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Post by {data.name}</Card.Subtitle>
                        <Card.Text>
                            {data.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        })
        return (
            <Fragment>
                <NavMenu/>
                <Container>
                    <Row style={{marginTop:80,padding:20}} className="justify-content-center">
                        {myView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default UserPosts;