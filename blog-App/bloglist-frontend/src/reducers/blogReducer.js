import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"
import { initializeUsers } from "./userReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    deleteBlog(state, action) {
      let arr = state.map((blog) =>
        blog.id === action.payload ? undefined : blog
      )
      console.log(arr)

      const newBlogs = arr.filter((blog) => {
        return blog !== undefined
      })
      console.log(newBlogs)
      return newBlogs
    },
    appendBlog(state, action) {
      state.push(action.payload)
      const newBlogs = state.sort((a, b) => b.likes - a.likes)
      return newBlogs
    },
    update(state, action) {
      const id = action.payload.id
      return state
        .map((blog) => (blog.id !== id ? blog : action.payload))
        .sort((a, b) => b.likes - a.likes)
    },
  },
})

const { setBlogs, appendBlog, update, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (object) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(object)
      dispatch(appendBlog(newBlog))
      dispatch(initializeUsers())
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author}`,
          "info",
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification("bad request", "error", 5))
    }
  }
}

export const updateBlog = (object) => {
  return async (dispatch) => {
    const id = object.id
    const returnedBlog = await blogService.update(id, object)
    dispatch(update(returnedBlog))
    dispatch(
      setNotification(`likes of ${returnedBlog.title} increased`, "info", 5)
    )
  }
}

export const removeBlog = (object) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${object.title} by ${object.author}`)) {
      try {
        const id = object.id
        await blogService.remove(id)
        dispatch(deleteBlog(id))
        dispatch(initializeUsers())
        dispatch(setNotification("blog removed", "info", 5))
      } catch (error) {
        const message = error.response.data.error
        dispatch(setNotification(message, "error", 5))
      }
    }
  }
}

export default blogSlice.reducer
