import React, {Fragment} from 'react';
import {HashRouter} from "react-router-dom";
import AppRoute from "./route/AppRoute";

const App = () => {
    return (
        <Fragment>
            <HashRouter>
                <AppRoute/>
            </HashRouter>
        </Fragment>
    );
};

export default App;
