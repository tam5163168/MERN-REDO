import { AuthContext } from "context/AuthContext";
import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import NavbarMenu from "views/NavbarMenu";

function ProtectedRoute({ component: Component, ...rest }) {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading)
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <>
                    <NavbarMenu />
                        <Component {...rest} {...props} />
                    </>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default ProtectedRoute;
