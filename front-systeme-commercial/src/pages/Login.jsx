import { Container } from "@mui/material";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import "../assets/scss/login.scss";
import Bouton from "../components/Bouton";
import { useState } from "react";
import axios from "axios";
import AlertSection from "../components/AlertSection";
import { useNavigate } from "react-router-dom";

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

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/api/login/utilisateur', loginForm);
            if(response.data.error) {
                console.log(error)
                setError(response.data.error)
            } else if(response.data.data) {
                sessionStorage.setItem('userData', JSON.stringify(response.data.data));
                navigate('/header/liste_besoins');
            }
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <Container fixed className="login">
            { error && (
                <div className="login__box-error">
                    <AlertSection severity="error" message={error} />
                </div>
            )}

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

            
            