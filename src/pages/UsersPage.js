import React, {Fragment} from 'react';
import NavMenu from "../components/common/NavMenu";
import Users from "../components/other/Users";

const UsersPage = () => {
    return (
        <Fragment>
            <NavMenu/>
            <Users/>
        </Fragment>
    );
};

export default UsersPage;