import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'


const Users = () => {
    const [users, setUsers] = useState()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/employees', {
                    signal: controller.signal
                })
                isMounted && setUsers(response.data)
            } catch (err) {
                console.error('error', err)
                navigate("/login", { state:{ from: location }, replace: true })
            }
        }

        getUsers()

        return () => {
            isMounted = false
            isMounted && controller.abort()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length 
      ? (
        <ul>
            {users.map((user, i) => <li key={i}>{user?.firstname}</li>)}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <br />
    </article>
  )
}

export default Users
