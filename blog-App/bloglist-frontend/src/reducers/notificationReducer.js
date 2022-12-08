import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    addNotification(state, action) {
      if (state) {
        clearTimeout(state.timeoutID)
      }
      return action.payload
    },
    removeNotification(state) {
      if (state) {
        clearTimeout(state.timeoutID)
      }
      return null
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, design, sec, ancher) => {
  return (dispatch) => {
    const millisec = sec * 1000
    const timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, millisec)
    const messageObject = {
      content: content,
      design: design,
      timeoutID: timeoutID,
    }
    dispatch(addNotification(messageObject))
  }
}

export default notificationSlice.reducer
