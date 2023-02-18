import { useRef, useEffect, useState } from 'react'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMessage('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

  return (
    <section>
        <h1 className="title">Login Form</h1>
        <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMessage}
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
  )
}

export default Login