import { Navigate } from "react-router-dom";

export const Protected = function({ children }) {
    const isLoggedIn = () => {
        return (localStorage.getItem('email') && localStorage.getItem('password') ? true : false);
    }
    return isLoggedIn() ? children : <Navigate to="/" replace/>;
}
