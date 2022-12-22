import {Redirect, Route} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "../../services/actions/Auth";

const ProtectedRoute = ({children, ...rest}) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <Route
            {...rest}
            render={({location}) => isAuth ? (children) : (
                <Redirect to={{pathname: '/login', state: {from: location}}}/>)}
        />
    );
}

export default ProtectedRoute;