import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { ClipLoader } from "react-spinners";

const override = {
    display: 'block',
    margin: '100px auto',
}

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) return <ClipLoader loading={loading} cssOverride={override}/>;
    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
