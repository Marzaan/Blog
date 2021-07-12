import React, {Fragment} from 'react';
import NavMenu from "../components/common/NavMenu";
import Registration from "../components/common/Registration";

const RegistrationPage = () => {
    return (
        <Fragment>
            <NavMenu/>
            <Registration/>
        </Fragment>
    );
};

export default RegistrationPage;