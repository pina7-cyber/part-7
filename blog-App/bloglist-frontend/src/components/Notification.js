import * as React from "react"
import { useSelector } from "react-redux"
import Dialog from "@mui/material/Dialog"
import Slide from "@mui/material/Slide"
import { Alert } from "@mui/material"
import { removeNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function Notification() {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }
  let open = Boolean(notification)

  const handleClose = () => {
    dispatch(removeNotification())
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <Alert severity={notification.design}>{notification.content}</Alert>
      </Dialog>
    </div>
  )
}
