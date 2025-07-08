import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authen/authContext';

function Index() {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })

    const [err, setErr] = useState(null)

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate('/')
        } catch (err) {
            setErr(err.response.data)
        }
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello Word</h1>
                    <p>
                        Welcome back! 👋 <br />
                        We’re glad to see you again. <br />
                        The community has missed you — and there’s so much waiting for you to explore! ✨ <br />
                        Go ahead, catch up with friends, share what’s new, or just enjoy the vibe. <br />
                        Your world is just a click away. <br />
                        Let’s pick up where you left off. 🚀
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" name='username' onChange={handleChange} />
                        <input type="password" placeholder="Password" name='password' onChange={handleChange} />
                        <button onClick={handleLogin}>Login</button>
                        {err && <span className="error">{err}</span>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Index
