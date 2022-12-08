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

const Users = () => {
  const users = useSelector((state) => state.users)
  const navigate = useNavigate()

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
        <Typography mb={2} variant={"h5"}>
          Users
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant='button'>Name</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='button'>Blogs</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  onClick={() => navigate(`/users/${user.id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Typography>{user.name}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography>{user.blogs.length}</Typography>
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

export default Users
