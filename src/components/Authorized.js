import { Navigate } from "react-router-dom";

export const Authorized = function({ children }) {
    const isLoggedIn = () => {
        return (localStorage.getItem('access_token')  ? true : false);
    }
    return isLoggedIn() ? children : <Navigate to="/" replace/>;
}
