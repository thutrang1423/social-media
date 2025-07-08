import { Link } from 'react-router-dom'
import './register.scss'
import { useState } from 'react'
import axios from 'axios'

function Index() {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        name: ''
    })

    const [err, setErr] = useState(null)

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //thực hiện yêu cầu api nên làm 1 hàm bất động bộ
    const handleClick = async e => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:8800/api/auth/register', inputs)
        } catch (err) {
            setErr(err.response.data)
        }
    }

    console.log(err);


    return (
        <div className="register">
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
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Username" name='username' onChange={handleChange} />
                        <input type="email" placeholder="Email" name='email' onChange={handleChange} />
                        <input type="password" placeholder="Password" name='password' onChange={handleChange} />
                        <input type="text" placeholder="Name" name='name' onChange={handleChange} />
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Index
