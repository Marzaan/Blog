import React, {Fragment} from 'react';
import NavMenu from "../components/common/NavMenu";
import Profile from "../components/other/Profile";

const ProfilePage = () => {
    return (
        <Fragment>
            <NavMenu/>
            <Profile/>
        </Fragment>
    );
};

export default ProfilePage;