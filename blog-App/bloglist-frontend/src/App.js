import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Users from "./components/Users"
import User from "./components/User"
import Blogs from "./components/Blogs"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/userReducer"
import { recallUser } from "./reducers/loginReducer"
import NavBar from "./components/NavBar"
import CssBaseline from "@mui/material/CssBaseline"

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(recallUser())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <CssBaseline />

      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <div>
            <NavBar />
          </div>
          <div>
            <Routes>
              <Route path='/users' element={<Users />} />
              <Route path='/users/:id' element={<User />} />
              <Route path='/blogs/:id' element={<Blog />} />
              <Route path='/' element={<Blogs />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
