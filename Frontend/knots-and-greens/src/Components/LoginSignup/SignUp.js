import './SignUp.css'
import axios from "axios";
import { useState } from "react";

const URL_PATH = 'http://localhost:2003/customers'
function SignUp() {
    // State Variables
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState([]);

    // Handling Checkbox Changes to get which box is checked
    const handlePaymentMethod = (event) => {
        const paymentMethodValue = event.target.value;
        const isChecked = event.target.checked;

        // If the checkbox is checked, add the value to the paymentMethod state variable, else remove the value from the paymentMethod state variable
        if (isChecked) {
            setPaymentMethod((prevPaymentMethod) => [...prevPaymentMethod, paymentMethodValue]);
        } else {
            setPaymentMethod((prevPaymentMethod) =>
                prevPaymentMethod.filter((value) => value !== paymentMethodValue)
            );
        }
    }

    // Handling the submit button
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

        // unchecked all the checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        }
        )
    }

    // Put the customer object to the database
    const createCustomer = async () => {
        try {
            const response = await axios.post(URL_PATH, {
                username: [firstName, lastName],
                email: email,
                password: password,
                address: address,
                phone: phone,
                payment_method: paymentMethod
            });
            clearInputs();
        } catch (error) {
            alert('An Error Occured While Creating Account')
        }
    }



    return (
        <>
            <div className="Signup-Container">
                <h1>Create An Account</h1>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
