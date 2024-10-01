import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import PropTypes from 'prop-types'
import Loading from '../Components/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <Loading />
    }
    if (user) {
        return children;
    }
    return (
        <Navigate state={location.pathname} to={'/signin'}></Navigate>
    );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
}