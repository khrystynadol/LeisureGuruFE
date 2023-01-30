import { Navigate } from "react-router-dom";

export const NotAuthorized = function({ children }) {
    const isLoggedIn = () => {
        return (localStorage.getItem('access_token') ? true : false);
    }
    return isLoggedIn() ? <Navigate to="/homepage" replace/>  : children;
}