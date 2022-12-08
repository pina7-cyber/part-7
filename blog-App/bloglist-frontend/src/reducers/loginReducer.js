import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

const loginSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

const { setUser } = loginSlice.actions

export const login = (object) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(object)
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification(`welcome ${user.username}`, "success", 2))
      setTimeout(() => {
        window.localStorage.removeItem("loggedBlogappUser")
        dispatch(setUser(null))
        blogService.setToken(null)
      }, 3600000)
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "error", 5))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser")
    dispatch(setUser(null))
    blogService.setToken(null)
    dispatch(setNotification("successfully logged out", "success", 5))
  }
}

export const recallUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export default loginSlice.reducer
