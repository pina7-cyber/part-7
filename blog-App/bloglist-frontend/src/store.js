import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer"
import loginReducer from "./reducers/loginReducer"
import userReducer from "./reducers/userReducer"
import commentReducer from "./reducers/commentReducer"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    login: loginReducer,
    users: userReducer,
    comments: commentReducer
  },
})

export default store
