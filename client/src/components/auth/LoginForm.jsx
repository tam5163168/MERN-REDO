import AlertMessage from "components/layout/AlertMessage";
import { AuthContext } from "context/AuthContext";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginForm() {
    const style = { marginTop: "10px" };
    // Context
    const { loginUser } = useContext(AuthContext);

    // State
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const [alert, setAlert] = useState(null);

    // History

    const { username, password } = loginForm;

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const login = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (!loginData.success) {
                setAlert({ type: "danger", message: loginData.message });
                setTimeout(() => setAlert(null), 2000);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        style={style}
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        style={style}
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit" style={style}>
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to="/register">
                    <Button variant="info" size="sm" className="ml-2">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
}

LoginForm.propTypes = {};

export default LoginForm;
