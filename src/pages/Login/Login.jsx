import { useEffect, useState } from "react";
import LoginBanner from "../../components/LoginBanner/LoginBanner";
import './Login.css';

function Login({ onLogin, toHome, dispatchPage }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [tempUsername, setTempUsername] = useState('');
    function handleLogin() {
        if (tempUsername) {
            onLogin(tempUsername);
        }
        setTempUsername('');
    }
    return (
        <div className="login-page">
            <LoginBanner toHome={toHome} />
            <div className="login-body">
                <div className="login-form">
                    <h2>Login</h2>
                    <input type="text" className="login-input" placeholder="Username"
                        onInput={(e) => setTempUsername(e.target.value)} />
                    <button className="login-btn" onClick={handleLogin}>Login</button>
                    <a onClick={() => dispatchPage({ type: 'register' })}>Don't have an account? Register</a>
                </div>
            </div>
        </div>
    );
}
export default Login;