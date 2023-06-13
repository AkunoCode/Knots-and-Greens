import axios from "axios";
import { useEffect, useState } from "react";
import MainPage from "../MainPage/MainPage";
const URL_PATH = 'http://localhost:2003/customers'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [customers, setCustomers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getAccounts();
    }, [])

    const getAccounts = async () => {
        try {
            const response = await axios.get(URL_PATH)
            setCustomers(response.data.result)
        } catch (error) {
            alert('An Error Occured While Loading the Contents')
        }
    }

    console.log(customers)
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    // Check if email and password matches the database
    const handleSubmit = (event) => {
        event.preventDefault();
        const foundCustomer = customers.find((customer) => customer.email === email && customer.password === password)
        console.log(foundCustomer)
        if (foundCustomer) {
            setIsLoggedIn(true)
            clearInputs();
            <MainPage loggedIn={isLoggedIn} adminAccount={isAdmin} />
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
        <>
            <div className="Login-Container">
                <input type="text" placeholder="Email" onChange={handleEmail} />
                <input type="password" placeholder="Password" onChange={handlePassword} />
                <button onClick={handleSubmit}>Login</button>
            </div>
        </>
    )
}

export default Login;