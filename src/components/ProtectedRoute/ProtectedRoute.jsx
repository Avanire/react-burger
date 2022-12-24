import {Redirect, Route} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "../../services/actions/Auth";
import PropTypes from "prop-types";

const ProtectedRoute = ({onlyAuth, children, ...rest}) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (isAuth && onlyAuth) {
        return (
            <Route
                {...rest}
                render={() => children}
            />
        );
    } else if (isAuth && !onlyAuth) {
        return (
            <Route
                {...rest}
                render={() => <Redirect to={{pathname: '/'}}/>}
            />
        );
    } else if (!isAuth && !onlyAuth) {
        return (
            <Route
                {...rest}
                render={() => children}
            />
        );
    } else {
        return (
            <Route
                {...rest}
                render={() => <Redirect to={{pathname: '/login'}}/>}
            />
        );
    }
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    onlyAuth: PropTypes.bool.isRequired,
};