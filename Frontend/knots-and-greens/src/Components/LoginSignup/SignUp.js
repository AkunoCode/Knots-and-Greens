import './SignUp.css'
import axios from "axios";
import { useState } from "react";

const URL_PATH = 'http://localhost:2003/customers'
function SignUp() {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState([]);

    const handleFirstName = (event) => {
        setfirstName(event.target.value)
    }

    const handleLastName = (event) => {
        setlastName(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleAddress = (event) => {
        setAddress(event.target.value)
    }

    const handlePhone = (event) => {
        setPhone(event.target.value)
    }

    const handlePaymentMethod = (event) => {
        const paymentMethodValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setPaymentMethod((prevPaymentMethod) => [...prevPaymentMethod, paymentMethodValue]);
        } else {
            setPaymentMethod((prevPaymentMethod) =>
                prevPaymentMethod.filter((value) => value !== paymentMethodValue)
            );
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createCustomer();
    }


    //clears the inputs
    const clearInputs = () => {
        setfirstName("");
        setlastName("");
        setPassword("");
        setEmail("");
        setAddress("");
        setPhone("");
        setPaymentMethod([]);
    }

    // Put the customer object to the database
    const createCustomer = async () => {
        try {
            const response = await axios.post(URL_PATH, {
                name: {
                    firstName: firstName,
                    lastName: lastName
                },
                email: email,
                password: password,
                address: address,
                phone: phone,
                payment_method: paymentMethod
            })
            console.log("Account Created")
            clearInputs();
        } catch (error) {
            alert('An Error Occured While Creating Account')
        }
    }



    return (
        <>
            <div className="Signup-Container">
                <h1>Create An Account</h1>
                <input type="text" placeholder="First Name" onChange={handleFirstName} />
                <input type="text" placeholder="Last Name" onChange={handleLastName} />
                <input type="email" placeholder="Email" onChange={handleEmail} />
                <input type="password" placeholder="Password" onChange={handlePassword} />
                <input type="text" placeholder="Address" onChange={handleAddress} />
                <input type="text" placeholder="Phone Number" onChange={handlePhone} />
                <div className="Payment-Method">
                    <h2>Payment Method</h2>
                    <div className="CheckBox">
                        <input
                            type="checkbox"
                            name="GCash"
                            value="GCash"
                            onChange={handlePaymentMethod}
                        />
                        <label for="GCash">GCash</label><br />
                        <input
                            type="checkbox"
                            name="Debit Card"
                            value="Debit Card"
                            onChange={handlePaymentMethod}
                        />
                        <label for="Debit Card">Debit Card</label><br />
                        <input
                            type="checkbox"
                            name="Cash-On-Delivery"
                            value="Cash-On-Delivery"
                            onChange={handlePaymentMethod}
                        />
                        <label for="Cash-On-Delivery">Cash-On-Delivery</label><br />
                    </div>
                </div>
                <button onClick={handleSubmit} id='Signup-Button'>Sign Up</button>
            </div>
        </>
    )
}

export default SignUp;
