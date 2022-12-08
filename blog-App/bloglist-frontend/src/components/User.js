import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  Box,
  Typography,
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

const User = () => {
  const match = useMatch("/users/:id")
  const navigate = useNavigate()
  const user = useSelector((state) =>
    state.users.find((person) => person.id === match.params.id)
  )

  if (!user) {
    return null
  }
console.log(user)
  return (
    <div align='center'>
      <Box
        mt={4}
        sx={{
          width: { xs: "90%", sm: "540px" },
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "grey.100",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        <Typography variant={"h5"}>{user.name}</Typography>
        <Typography mb={4} variant={"h6"}>
          {user.username}
        </Typography>

        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  <Typography variant='button'>Blogs</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.blogs.map((blog) => (
                <TableRow
                  hover
                  key={blog.id}
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Typography>{blog.title}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}

export default User
