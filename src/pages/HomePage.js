import React, {Fragment} from 'react';
import NavMenu from "../components/common/NavMenu";
import Home from "../components/home/Home";

const HomePage = () => {
    return (
        <Fragment>
            <NavMenu/>
            <Home/>
        </Fragment>
    );
};

export default HomePage;