import './Login.css'
import axios from "axios";
import { useEffect, useState } from "react";


const URL_PATH = 'http://localhost:2003/customers'
function Login() {
    // State Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [customers, setCustomers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);

    // Loading Data on first load of the page
    useEffect(() => {
        setFailedLogin(false);
    }, [email, password])

    // // Loading Data from the database and setting the state variable products
    // const getAccounts = async () => { // Asynchronous function
    //     try {
    //         const response = await axios.get(URL_PATH) // await for the response from the server
    //         setCustomers(response.data.result)
    //     } catch (error) {
    //         alert('An Error Occured While Loading the Contents')
    //     }
    // }

    // Check if email and password matches the database
    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: email,
            password: password
        }
        const response = axios.post(URL_PATH + '/login', payload).then((response) => {
            if (response.data.message === "Successfully logged in.") {
                setIsLoggedIn(true);
                setFailedLogin(false);
                clearInputs();
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
