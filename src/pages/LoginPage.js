import React, {Fragment} from 'react';
import Login from "../components/common/Login";
import NavMenu from "../components/common/NavMenu";

const LoginPage = () => {
    return (
        <Fragment>
            <NavMenu/>
            <Login/>
        </Fragment>
    );
};

export default LoginPage;