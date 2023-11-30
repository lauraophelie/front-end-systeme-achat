import { useState } from "react";
import "../assets/scss/login.scss";
import Bouton from "../components/Bouton";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
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
        <>
            <div>

            </div>
            <div className="login">
                <h1 className="login__title"> Login </h1>
                <TextInput
                    type="email"
                    label="Email"
                    required={true}
                    className="login__input"
                    value={loginForm.email}
                    onChange={handleChange} name="email"
                />
                <TextInput
                    type="password"
                    label="Mot de passe"
                    required={true}
                    className="login__input"
                    value={loginForm.password}
                    onChange={handleChange} name="password"
                />
                <Bouton
                    text="Se connecter"
                    variant="contained"
                    className="login__submit"
                    bgColor="darkcyan"onClick={handleLogin}

                />
            </div>
        </>
    )
}

export default Login;