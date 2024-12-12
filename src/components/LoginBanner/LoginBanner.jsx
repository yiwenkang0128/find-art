import './LoginBanner.css';
function LoginBanner({ toHome }) {
    return (
        <div className="login-banner" onClick={() => toHome()}>
            <div className="login-banner-top">
                <h1>Find</h1>
                <h1>Art</h1>

            </div>
            <div className="login-banner-left"></div>
            <div className="login-banner-right"></div>

        </div>
    );
}
export default LoginBanner;