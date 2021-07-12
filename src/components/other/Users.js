import React, {Fragment, useState, useEffect} from 'react';
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import {toast, ToastContainer} from "react-toastify";

const Users = () => {
    const [userState, setUserState] = useState({
        userData:[],
    });
    const [sDataState, setSDataState] = useState({
        searchData:[],
    });
    const [searchState, setSearchState] = useState({
        search:'',
    });
    const [conState, setConState] = useState({
        con:true,
    });
    useEffect(() => {
        axios.get(ApiURL.users)
            .then(response=>{
                setUserState({userData: response.data});
                console.log(response);
            })
    });
    const searchOnChange=(event)=>{
        let search = event.target.value;
        setSearchState({search:search});
    }
    const onFormSubmit=()=>{
        let search = searchState.search;
        axios.get(ApiURL.search(search))
            .then(response=>{
                setConState({con: false});
                setSDataState({searchData:response.data});
                toast.success("Search Success.. Please Wait");
            })
            .catch(error=>{
                toast.error("Server is not responding",{
                    position:"bottom-center"
                });
            })
    }
    const myUserData = userState.userData;
    const myView = myUserData.map((data,index)=>{
        return (
            <tr>
                <td>
                    <Link to={"userPosts/"+data.name}>{data.name}</Link>
                </td>
                <td>{data.email}</td>
                <td>{data.website}</td>
            </tr>
        );
    })
    const mySearchData = sDataState.searchData;
    const myView2 = mySearchData.map((data,index)=>{
        return (
            <tr>
                <td>
                    <Link to={"userPosts/"+data.name}>{data.name}</Link>
                </td>
                <td>{data.email}</td>
                <td>{data.website}</td>
            </tr>
        );
    })
    if(conState.con===true){
        return(
            <Fragment>
                <div style={{margin:100}} className="justify-content-center">
                    <div style={{display:'flex'}} className="justify-content-between">
                        <Form onSubmit={onFormSubmit} style={{padding:10}}>
                            <Form.Group className="mb-3" controlId="search">
                                <Form.Control onChange={searchOnChange} type="search" placeholder="Search" />
                            </Form.Group>
                        </Form>
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Sort By
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/">Name</Dropdown.Item>
                                <Dropdown.Item href="/">Email</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <h1>Users List Table</h1>
                    <Table striped bordered hover>
                        <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Website</th>
                        </tr>
                        </thead>
                        <tbody>
                        {myView}
                        </tbody>
                    </Table>
                </div>
                <ToastContainer/>
            </Fragment>
        )
    }
    else{
        return(
            <Fragment>
                <div style={{margin:100}} className="justify-content-center">
                    <div style={{display:'flex'}} className="justify-content-between">
                        <Form onSubmit={onFormSubmit} style={{padding:10}}>
                            <Form.Group className="mb-3" controlId="search">
                                <Form.Control onChange={searchOnChange} type="search" placeholder="Search" />
                            </Form.Group>
                        </Form>
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Sort By
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Email</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <h1>Users List Table</h1>
                    <Table striped bordered hover>
                        <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Website</th>
                        </tr>
                        </thead>
                        <tbody>
                        {myView2}
                        </tbody>
                    </Table>
                </div>
                <ToastContainer/>
            </Fragment>
        )
    }
};

export default Users;