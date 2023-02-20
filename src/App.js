import { Admin, Editor, Home, Layout, LinkPage, Login, Lounge, Missing, Register, RequireAuth, Unauthorised } from './components'
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
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lounge" element={<Lounge />} />
        </Route>
        {/* Catch all */}
        <Route path="missing" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App;
