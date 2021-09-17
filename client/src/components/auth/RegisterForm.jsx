import { AuthContext } from "context/AuthContext";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertMessage from "components/layout/AlertMessage";

function RegisterForm() {
    const style = { marginTop: "10px" };

    // Context
    const { registerUser } = useContext(AuthContext);

    // State
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [alert, setAlert] = useState(null);

    // History
    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (event) =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });

    const register = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert({ type: "danger", message: "Password do not match" });
            setTimeout(() => {
                setAlert(null);
            }, 3000);
            return;
        }

        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({ type: "danger", message: registerData.message });
                setTimeout(() => setAlert(null), 2000);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <Form className="my-4" onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        style={style}
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        style={style}
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        required
                        style={style}
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit" style={style}>
                    Register
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to="/login">
                    <Button variant="info" size="sm" className="ml-2">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default RegisterForm;
