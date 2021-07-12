import React, {Fragment} from 'react';
import NavMenu from "../components/common/NavMenu";
import Posts from "../components/other/Posts";

const PostsPage = () => {
    return (
        <Fragment>
            <NavMenu/>
            <Posts/>
        </Fragment>
    );
};

export default PostsPage;