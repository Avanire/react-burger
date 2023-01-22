import React from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {
    FeedPage,
    ForgotPasswordPage,
    HomePage,
    IngredientDetailsPage,
    LoginPage, ProfileOrdersPage,
    ProfilePage,
    RegistrationPage
} from '../../pages';
import AppHeader from "../AppHeader/AppHeader";
import ResetPasswordPage from "../../pages/ResetPassword/ResetPassword";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {ToastContainer} from "react-toast";
import {IPopUp} from "../../utils/prop-types";

const App = () => {
    const history = useHistory();
    const location = useLocation<IPopUp>();

    const popUp = (history.action === 'PUSH') && location.state?.popUp;

    return (
        <>
            <AppHeader/>
            <Switch location={popUp || location}>
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <ProtectedRoute path="/login" exact onlyAuth={false}>
                    <LoginPage/>
                </ProtectedRoute>
                <ProtectedRoute path='/register' exact onlyAuth={false}>
                    <RegistrationPage/>
                </ProtectedRoute>
                <ProtectedRoute path='/forgot-password' exact onlyAuth={false}>
                    <ForgotPasswordPage/>
                </ProtectedRoute>
                <ProtectedRoute path='/reset-password' exact onlyAuth={false}>
                    <ResetPasswordPage/>
                </ProtectedRoute>
                <Route path={`/ingredients/:id`} exact>
                    <IngredientDetailsPage/>
                </Route>
                <ProtectedRoute path='/profile' exact onlyAuth={true}>
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute path='/profile/orders' exact onlyAuth={true}>
                    <ProfileOrdersPage/>
                </ProtectedRoute>
                <Route path="/feed" exact>
                    <FeedPage/>
                </Route>
            </Switch>
            <ToastContainer delay={3000} />
        </>
    );

}

export default App;
