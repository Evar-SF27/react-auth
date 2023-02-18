import { useRef, useEffect, useState, useContext } from 'react'
import AuthContext from './context/authProvider'
import axios from './api/axios'

const LOGIN_URL = '/auth'

const Login = () => {
    const { setAuth } = useContext(AuthContext)

    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState('')

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
            setSuccess(true)
            setUsername('')
            setPassword('')
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
    <>
        {success ? (
            <section>
                <h1>You are successfully logged in!</h1>
                <br />
                <p>
                    {/* To be replaced with React Router Link */}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : (
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
                        {/* Put a router link */}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#">Sign Up</a>
                        </span>
                    </p>
                </form>
            </section>
        )}
    </>
  )
}

export default Login
