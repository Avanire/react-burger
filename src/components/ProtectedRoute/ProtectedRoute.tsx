import {Redirect, Route} from 'react-router-dom';
import {FC, useEffect} from "react";
import {getUser} from "../../services/actions/Auth";
import PropTypes from "prop-types";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {TProtectedRoute} from "../../utils/prop-types";

const ProtectedRoute: FC<TProtectedRoute> = ({onlyAuth, children, ...rest}) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.auth.isAuth);

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