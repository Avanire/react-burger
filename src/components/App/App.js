import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegistrationPage} from '../../pages';
import AppHeader from "../AppHeader/AppHeader";
import ResetPasswordPage from "../../pages/ResetPassword";

const App = () => {

    return (
        <>
            <AppHeader/>
            <Switch>
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path="/login" exact>
                    <LoginPage/>
                </Route>
                <Route path='/register' exact>
                    <RegistrationPage/>
                </Route>
                <Route path='/forgot-password' exact>
                    <ForgotPasswordPage/>
                </Route>
                <Route path='/reset-password' exact>
                    <ResetPasswordPage/>
                </Route>
                <Route path='/profile' exact>
                    <ProfilePage/>
                </Route>
            </Switch>
        </>
    );

}

export default App;
