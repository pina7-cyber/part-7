import { logout } from "../reducers/loginReducer"
import { useDispatch } from "react-redux"
import { IconButton } from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

const Logout = () => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    dispatch(logout())
  }

  return (
    <IconButton color='inherit' onClick={handleLogout}>
      <LogoutOutlinedIcon />
    </IconButton>
  )
}

export default Logout
