import React, {Fragment} from 'react';
import {Route, Switch} from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import PostsPage from "../pages/PostsPage";
import UsersPage from "../pages/UsersPage";
import ProfilePage from "../pages/ProfilePage";
import AddPostPage from "../pages/AddPostPage";
import EditPost from "../components/other/EditPost";
import Comments from "../components/other/Comments";
import UserPosts from "../components/other/UserPosts";

const AppRoute = () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/registration" component={RegistrationPage}/>
                <Route exact path="/posts" component={PostsPage}/>
                <Route exact path="/users" component={UsersPage}/>
                <Route exact path="/profile/:username" component={ProfilePage}/>
                <Route exact path="/addPost" component={AddPostPage}/>
                <Route exact path="/profile/editPost/:code" render={(props) => <EditPost {...props} key={Date.now()}/>}/>
                <Route exact path="/comments/:code" render={(props) => <Comments {...props} key={Date.now()}/>}/>
                <Route exact path="/userPosts/:code" render={(props) => <UserPosts {...props} key={Date.now()}/>}/>
            </Switch>
        </Fragment>
    );
};

export default AppRoute;