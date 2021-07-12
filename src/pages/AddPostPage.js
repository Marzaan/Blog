import React, {Fragment} from 'react';
import NavMenu from "../components/common/NavMenu";
import AddPost from "../components/other/AddPost";

const AddPostPage = () => {
    return (
        <Fragment>
            <NavMenu/>
            <AddPost/>
        </Fragment>
    );
};

export default AddPostPage;