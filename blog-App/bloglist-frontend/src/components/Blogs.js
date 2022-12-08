import BlogCreationForm from "./BlogCreationForm"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Typography,
  TableHead,
} from "@mui/material"

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const navigate = useNavigate()
  console.log(blogs)

  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='space-between'
        alignItems='center'
        spacing={4}
        wrap='nowrap'
      >
        <Grid item mt={4}>
          <BlogCreationForm />
        </Grid>
        <Grid
          item
          sx={{
            minWidth: { xs: "90%", sm: "540px" },
            maxWidth: { xs: "95%", sm: "95%" },
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant='button'>Title</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='button'>Author</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow
                    hover
                    key={blog.id}
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                    sx={{cursor:'pointer'}}
                  >
                    <TableCell>
                      <Typography>{blog.title}</Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography>{blog.author}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default Blogs
