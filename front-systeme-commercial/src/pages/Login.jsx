import { Container } from "@mui/material";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import "../assets/scss/login.scss";
import Bouton from "../components/Bouton";
import { useState } from "react";

function Login() {
    const loginBtn = {
        variant: "contained",
        text: "Se connecter",
        className: "login__button"
    };

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(loginForm);
    };

    return (
        <Container fixed className="login">
            <div className="login__box-one">
                <Title text="Log In" className="login__title"/>
            </div>

            <div className="login__box-two">
                <TextInput type="email" label="Email" className="login__input" required={true} value={loginForm.email} onChange={handleChange} name="email" />
            </div>

            <div className="login__box-three">
                <TextInput type="password" label="Password" className="login__input" required={true} value={loginForm.password} onChange={handleChange} name="password" />
            </div>

            <div className="login__box-four">
                <Bouton variant={loginBtn.variant} text={loginBtn.text} className={loginBtn.className} onClick={handleLogin}/>
            </div>
        </Container>
    );
}

export default Login;

            
            