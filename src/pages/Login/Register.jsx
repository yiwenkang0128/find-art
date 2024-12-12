import { useState } from "react";
import LoginBanner from "../../components/LoginBanner/LoginBanner";
import './Login.css';

function Register({ onRegister, toHome, dispatchPage }) {
    const [tempUsername, setTempUsername] = useState('');
    function handleRegister() {
        if (tempUsername) {
            onRegister(tempUsername);
        }
        setTempUsername('');
    }
    return (
        <div className="register-page">
            <LoginBanner toHome={toHome} />
            <div className="register-body">
                <div className="register-form">
                    <h2>Register</h2>
                    <input type="text" className="register-input" placeholder="Username"
                        onInput={(e) => setTempUsername(e.target.value)} />
                    <button className="register-btn" onClick={() => handleRegister()}>Register and Login</button>
                    <a onClick={() => dispatchPage({ type: 'login' })}>Already had an account? Login</a>
                </div>
            </div>
        </div>
    );
}
export default Register;