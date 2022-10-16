import { Navigate } from "react-router-dom";

export const NotAuthorized = function({ children }) {
    const isLoggedIn = () => {
        return (localStorage.getItem('email') ? true : false);
    }
    return isLoggedIn() ? <Navigate to="/homepage" replace/>  : children;
}