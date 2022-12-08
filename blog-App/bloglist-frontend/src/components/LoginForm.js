import { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { login } from "../reducers/loginReducer"
import { useDispatch } from "react-redux"
import { Grid, Paper, Typography, Button } from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useIsFilled } from "../hooks"

export default function LoginForm() {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    password: "",
    username: "",
    name: "",
    showPassword: false,
  })
  const [shadow, setShadow] = useState(8)
  const [isLogin, setisLogin] = useState(true)
  const isFilled = useIsFilled({
    password: "",
    username: "",
  })

  const handleChange = (prop) => (event) => {
    isFilled.fill(prop, event.target.value)
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    if (isLogin === true) {
      const loginData = {
        username: values.username,
        password: values.password,
      }
      dispatch(login(loginData))
      setValues({
        username: "",
        password: "",
        showPassword: false,
      })
      isFilled.fill("username", "")
      isFilled.fill("password", "")
    } else if (isLogin === false) {
      console.log("signup")
    }
  }

  const formHeight = () => (isLogin ? "400px" : "500px")

  return (
    <Grid
      sx={{
        minHeight: "100vh",
        display: "flex",
      }}
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Grid
        item
        sx={{ flexGrow: 1 }}
        container
        justifyContent='center'
        alignItems='center'
      >
        <Paper
          elevation={shadow}
          onMouseOver={() => setShadow(20)}
          onMouseOut={() => setShadow(8)}
          sx={{
            height: formHeight,
          }}
        >
          <Grid
            container
            sx={{ height: formHeight }}
            direction='column'
            component={"form"}
            onSubmit={handleLogin}
            justifyContent='space-evenly'
            alignItems='center'
          >
            <Grid item>
              <Typography variant='h5'>
                {isLogin ? `Login` : "Signup"}
              </Typography>
            </Grid>
            {isLogin === false && (
              <Grid item>
                <FormControl sx={{ m: 2, width: "25ch" }} variant='standard'>
                  <InputLabel htmlFor='standard-adornment-password'>
                    Name
                  </InputLabel>
                  <Input
                    id='name'
                    type='text'
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <FormControl sx={{ m: 2, width: "25ch" }} variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  Username
                </InputLabel>
                <Input
                  id='username'
                  type='text'
                  value={values.username}
                  onChange={handleChange("username")}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 2, width: "25ch" }} variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  Password
                </InputLabel>
                <Input
                  id='standard-adornment-password'
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                endIcon={isLogin ? <LoginIcon /> : <ArrowForwardIosIcon />}
                disabled={!isFilled.full()}
                type='submit'
              >
                {isLogin ? "login" : "Let's go!"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                endIcon={isLogin ? null : <LoginIcon />}
                onClick={() => setisLogin(!isLogin)}
              >
                <Typography variant='caption'>
                  {isLogin ? `New to Bloggs? ` : "Back to Login"}
                  {isLogin && <b>Signup!</b>}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
