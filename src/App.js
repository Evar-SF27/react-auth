import { Admin, Editor, Home, Layout, LinkPage, Login, Lounge, Missing, PersistLogin, Register, RequireAuth, Unauthorised } from './components'
import { Routes, Route } from 'react-router-dom'

const ROLES = {
  "User": 2001,
  "Editor": 1984,
  "Admin": 5150
}

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
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]}/>}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]}/>}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* Catch all */}
        <Route path="missing" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App;
