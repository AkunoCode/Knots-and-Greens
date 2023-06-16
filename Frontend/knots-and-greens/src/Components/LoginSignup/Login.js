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

    // Loading Data on first load of the page
    useEffect(() => {
        getAccounts();
    }, [])

    // Loading Data from the database and setting the state variable products
    const getAccounts = async () => { // Asynchronous function
        try {
            const response = await axios.get(URL_PATH) // await for the response from the server
            setCustomers(response.data.result)
        } catch (error) {
            alert('An Error Occured While Loading the Contents')
        }
    }

    // Check if email and password matches the database
    const handleSubmit = (event) => {
        const foundCustomer = customers.find((customer) => customer.email === email && customer.password === password)
        if (foundCustomer) {
            setIsLoggedIn(true)
            clearInputs();
        } else {
            alert('Invalid Email or Password')
        }
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
            </div>
        </div>
    )
}

export default Login;
