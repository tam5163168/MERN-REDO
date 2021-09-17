import LoginForm from "components/auth/LoginForm";
import RegisterForm from "components/auth/RegisterForm";
import { AuthContext } from "context/AuthContext";
import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Redirect } from "react-router";

function Auth({ authRoute }) {
    // Context
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    // Body
    let body;

    if (authLoading)
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        );
    else if (isAuthenticated) return <Redirect to="/dashboard"></Redirect>;
    else
        body = (
            <>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </>
        );

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learn IT</h1>
                    <h4>Keep track of what are you learning</h4>
                    {body}
                </div>
            </div>
        </div>
    );
}

export default Auth;
