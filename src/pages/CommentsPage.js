import React, {Fragment} from 'react';
import NavMenu from "../components/common/NavMenu";
import Comments from "../components/other/Comments";

const CommentsPage = () => {
    return (
        <Fragment>
            <NavMenu/>
            <Comments/>
        </Fragment>
    );
};

export default CommentsPage;