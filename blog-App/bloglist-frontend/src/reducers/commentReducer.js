import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

const commentSlice = createSlice({
  name: "commments",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
      const newBlogs = state
      return newBlogs
    },
  },
})

const { setComments, appendComment } = commentSlice.actions

export const initializeComments = (id) => {
    return async (dispatch) => {
      const comments = await blogService.getComments(id)
      dispatch(setComments(comments))
    }
  }

export const createComment = (id, newComment) => {
  return async (dispatch) => {
    const Commentobject = {content: newComment}
    const returnedComment = await blogService.comment(id, Commentobject)
    dispatch(appendComment(returnedComment))
    dispatch(setNotification(`new comment`, "info", 5))
  }
}

export default commentSlice.reducer
