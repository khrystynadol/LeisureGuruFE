import { Navigate } from "react-router-dom";

export const Authorized = function({ children }) {
    const isLoggedIn = () => {
        return (localStorage.getItem('email')  ? true : false);
    }
    return isLoggedIn() ? children : <Navigate to="/" replace/>;
}
