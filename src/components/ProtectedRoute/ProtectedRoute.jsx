import {Redirect, Route} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "../../services/actions/Auth";
import {getCookie} from "../../utils/utils";

const ProtectedRoute = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const token = getCookie('token');

    useEffect(() => {
        if (token) {
            dispatch(getUser(`Bearer ${token}`));
        }
    }, [dispatch, token]);

    return (
        <Route
            {...rest}
            render={() => user ? (children) : (<Redirect to='/login' />)}
        />
    );
}

export default ProtectedRoute;