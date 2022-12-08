import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import FlutterDashIcon from "@mui/icons-material/FlutterDash"
import Logout from "./Logout"

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const pages = [
    { Name: "Blogs", Link: "/" },
    { Name: "Users", Link: "/users" },
  ]

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <FlutterDashIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOGGs
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.Name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.Link}
                >
                  <Typography textAlign='center'>{page.Name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <FlutterDashIcon
            sx={{ display: { sm: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant='h8'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { sm: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOGGs
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                color='inherit'
                key={page.Name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
                component={Link}
                to={page.Link}
              >
                {page.Name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Logout />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
