import './Login.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const URL_PATH = 'http://localhost:2003/customers/login'
function Login({ props }) {
    //Lifting State Up
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = props;

    // State Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);
    const navigate = useNavigate();

    // Loading Data on first load of the page
    useEffect(() => {
        setFailedLogin(false);
    }, [email, password])

    // Check if email and password matches the database
    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: email,
            password: password
        }
        const response = axios.post(URL_PATH, payload).then((response) => {
            if (response.data.message === "Successfully logged in.") {
                localStorage.setItem('token', response.data.token);
                console.log(localStorage.getItem('token'));
                setIsLoggedIn(true);
                setFailedLogin(false);
                clearInputs();
                navigate('/');
            }
        }
        ).catch((error) => {
            if (error.response.status === 401) {
                setFailedLogin(true);
            } else {
                alert('An Error Occured While Logging In')
            }
        });
    }

    //Clears the inputs
    const clearInputs = () => {
        setEmail("");
        setPassword("");
    }


    return (
        <div className='Body'>
            <div className="Login-Container">
                <h1>Login Your Account</h1>
                <p>Email</p>
                <input type="text" placeholder="sample@email.com" value={email} onChange={(e) => { setEmail(e.target.value) }} id='Email-Input' />
                <p>Password</p>
                <input type="password" placeholder="sample123" value={password} onChange={(e) => { setPassword(e.target.value) }} id='Password-Input' />
                <button onClick={handleSubmit} id='Login-Button'>Login</button>
                {failedLogin ? <p id='Failed-Login'>Invalid Email or Password</p> : null}
            </div>
        </div>
    )
}

export default Login;
