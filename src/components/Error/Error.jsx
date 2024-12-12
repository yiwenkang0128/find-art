import { MESSAGES } from '../../constants';
import './Error.css';
function Error({ error }) {
    const message = MESSAGES[error] || MESSAGES.default;
    return (
        <div className="error">
            <p className='error-msg'>{error && message}</p>
        </div>
    );
}
export default Error;