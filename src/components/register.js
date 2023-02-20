import axios from '../api/axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,23}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/
const REGISTER_URL = '/register'

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/linkpage"

  const [username, setUsername] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState('')
  const [validMatch, setValidmatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  // Sets the focus to the username field on first load
  useEffect(() => {
    userRef.current.focus()
  },[])

  // Enforces the USER_REGEX 
  useEffect(() => {
    const result = USER_REGEX.test(username)
    setValidName(result)
  },[username])

  // Enforces the PASSWORD_REGEX
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password)
    setValidPassword(result)
    const match = password === matchPassword
    setValidmatch(match)
  },[password, matchPassword])

  // Resets the error message on change
  useEffect(() => {
    setErrorMessage('')
  },[username, password, matchPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Enforcing the REGEX on submitting
    const c1 = USER_REGEX.test(username)
    const c2 = PASSWORD_REGEX.test(password)
    if (!c1 || !c2) {
      setErrorMessage("Invalid Entry")
      return
    }
    // Handle submit
    try {
      const response = await axios.post(REGISTER_URL, 
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      console.log(response.data)
      console.log(JSON.stringify(response.data))
      setUsername('')
      setPassword('')
      setMatchPassword('')
      navigate(from, { replace: true })

    } catch (err) {
      if (!err?.response) {
        setErrorMessage("No Server Response")
      } else if (err.response?.status === 409) {
        setErrorMessage("Username already taken")
      } else {
        setErrorMessage("Registration failed")
      }
      errRef.current.focus()
    }
  }

  return (
    <section>
      <h1 className="title">Register Form</h1>
      <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">
        {errorMessage}
      </p>
      <form onSubmit={handleSubmit}>
        {/* Username field */}
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !username ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.<br />
          Must begin with a letter.<br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        {/* Password Field */}
        <label htmlFor="password">
          Password:
          <span className={validPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p id="pwdnote" className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number and a special character.<br />
          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="arrow up">^</span> 
          <span aria-label="ampersand symbol">&</span> <span aria-label="multiplication symbol">*</span> <span aria-label="percentage symbol">%</span>
        </p>
        {/* Confirm Password field */}
        <label htmlFor="confirm_password">
          Confirm Password:
          <span className={validMatch && matchPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirm_password"
          onChange={(e) => setMatchPassword(e.target.value)}
          value={matchPassword}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p id="uidnote" className={matchFocus && matchPassword && !validMatch ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Passwords must match.<br />
        </p>
        {/* Submit button */}
        <button className="submitBtn" disabled={!validName || !validPassword || !validMatch}>
          Sign Up
        </button>
        {/* Sign In Info section */}
        <p className="info">
          I already have an account.&nbsp;
          <span className="line">
            <Link to="/login">Sign In</Link>
          </span>
        </p>
      </form>
    </section>
  )
}

export default Register


// Dependencies for font awesome in react
// npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome