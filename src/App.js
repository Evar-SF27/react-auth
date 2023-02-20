import Admin from './admin'
import Editor from './editor'
import Home from './home'
import Layout from './layout'
import LinkPage from './linkPage'
import Login from './login'
import Lounge from './lounge'
import Missing from './missing'
import Register from './register'
import Unauthorised from './unauthorised'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorised" element={<Unauthorised />} />
        {/* Protected Routes */}
        <Route path="/" element={<Home />} />
        <Route path="editor" element={<Editor />} />
        <Route path="admin" element={<Admin />} />
        <Route path="lounge" element={<Lounge />} />
        {/* Catch all */}
        <Route path="missing" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App;
