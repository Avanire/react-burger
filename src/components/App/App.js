import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegistrationPage} from '../../pages';
import AppHeader from "../AppHeader/AppHeader";
import ResetPasswordPage from "../../pages/ResetPassword";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {

    return (
        <>
            <AppHeader/>
            <Switch>
                <Route path="/" exact={true}>
                    <HomePage/>
                </Route>
                <Route path="/login" exact={true}>
                    <LoginPage/>
                </Route>
                <Route path='/register' exact={true}>
                    <RegistrationPage/>
                </Route>
                <Route path='/forgot-password' exact={true}>
                    <ForgotPasswordPage/>
                </Route>
                <Route path='/reset-password' exact={true}>
                    <ResetPasswordPage/>
                </Route>
                <ProtectedRoute path='/profile' exact={true}>
                    <ProfilePage/>
                </ProtectedRoute>
            </Switch>
        </>
    );

}

export default App;
