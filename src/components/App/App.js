import React from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {
    ForgotPasswordPage,
    HomePage,
    IngredientDetailsPage,
    LoginPage,
    ProfilePage,
    RegistrationPage
} from '../../pages';
import AppHeader from "../AppHeader/AppHeader";
import ResetPasswordPage from "../../pages/ResetPassword";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {ToastContainer} from "react-toast";

const App = () => {
    const history = useHistory();
    const location = useLocation();

    const popUp = (history.action === 'PUSH') && location.state?.popUp;

    return (
        <>
            <AppHeader/>
            <Switch location={popUp || location}>
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
                <Route path={`/ingredients/:id`} exact={true}>
                    <IngredientDetailsPage/>
                </Route>
                <ProtectedRoute path='/profile' exact={true}>
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute path='/profile/orders' exact={true}>

                </ProtectedRoute>
            </Switch>
            <ToastContainer delay={3000} />
        </>
    );

}

export default App;
