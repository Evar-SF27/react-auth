import { useRef, useEffect, useState } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,23}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState('')
  const [validMatch, setValidmatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)

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
    console.log(username, password)
    setSuccess(true)
  }

  return (
    <>
    {success ? (
      <section>
        <h1>Success!</h1>
        <p>
          {/* To be replaced with React Router Link */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Sign In</a>
        </p>
      </section>
    ) : (
      <section>
        <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMessage}
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
          <button className="submit" disabled={!validName || !validPassword || !validMatch}>
            Sign Up
          </button>
          {/* Sign In Info section */}
          <p className="info">
            I already have an account.&nbsp;
            <span className="line">
              {/* Put a router link */}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Sign In</a>
            </span>
          </p>
        </form>
      </section>
    )}
    </>
    
  )
}

export default Register


// Dependencies for font awesome in react
// npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome