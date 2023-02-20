import { useRef, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const LOGIN_URL = '/auth'

const Login = () => {
    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles
            setAuth({ username, roles, accessToken })
            setUsername('')
            setPassword('')
            navigate(from, { replace: true})
        } catch (err) {
            if (!err?.response) {
                setErrorMessage("No Server Response")
            } else if (err.response?.status === 400) {
                setErrorMessage("Incomplete credentials: Username or Password is missing")
            } else if (err.response?.status === 401) {
                setErrorMessage("Unauthorised")
            } else {
                setErrorMessage("Login failed")
            }
            errRef.current.focus()
        }
    }

  return (
    <section>
        <h1 className="title">Login Form</h1>
        <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">
            {errorMessage}
        </p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)} 
                value={username}
                required
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
                required
            />
            {/* Submit button */}
            <button className="submitBtn" disabled={!username || !password}>
                Sign In
            </button>
            {/* Sign In Info section */}
            <p className="info">
                I do not have an account.&nbsp;
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </form>
    </section>
  )       
}

export default Login
