import { updateBlog, removeBlog } from "../reducers/blogReducer"
import CommentForm from "./CommentForm"
import { useDispatch, useSelector } from "react-redux"
import { useMatch, useNavigate } from "react-router-dom"
import { DeleteOutline, ThumbUpAltOutlined } from "@mui/icons-material"
import {
  IconButton,
  Stack,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material"
import { useState } from "react"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch("/blogs/:id")

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  )
  const user = useSelector((state) => state.login)
  const comments = useSelector((state) => state.comments)
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const remove = () => {
    dispatch(removeBlog(blog))
    navigate("/")
  }

  if (!blog || !user || !comments) {
    return null
  }

  const showWhenOwner = {
    display:
      user.username === blog.user.username || user.id === blog.user
        ? ""
        : "none",
  }

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
        <Typography variant={"h5"}>
          {blog.title} by {blog.author}{" "}
        </Typography>

        <Stack
          mb={4}
          mt={1}
          direction='row'
          divider={<Divider orientation='vertical' flexItem />}
          spacing={1}
        >
          <Box component={Typography} sx={{ flexGrow: 2 }}>
            {blog.likes} likes
          </Box>
          <Box
            component={Typography}
            sx={{ cursor: "pointer", flexGrow: 1 }}
            onClick={toggleVisibility}
          >
            {blog.comments.length > comments.length
              ? blog.comments.length
              : comments.length}{" "}
            comments
          </Box>
          <Box
            component={Typography}
            sx={{ cursor: "pointer", flexGrow: 1 }}
            onClick={() => navigate(`/users/${blog.user.id || blog.user}`)}
          >
            added by {blog.creator}
          </Box>
        </Stack>
        <a
          style={{ textDecoration: "none" }}
          href={blog.url}
          target='_blank'
          rel='noreferrer'
        >
          <Button variant={"standard"}>Check out the homepage!</Button>
        </a>

        <Stack direction='row' mb={4} justifyContent='center'>
          <Box>
            <IconButton onClick={likeBlog}>
              <ThumbUpAltOutlined />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={toggleVisibility}>
              <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
          </Box>
          <Box style={showWhenOwner}>
            <IconButton onClick={remove}>
              <DeleteOutline />
            </IconButton>
          </Box>
        </Stack>
        <div
          style={{
            display: visible ? "" : "none",
          }}
        >
          <CommentForm
            id={match.params.id}
            toggleVisibility={toggleVisibility}
          />
        </div>
      </Box>
    </div>
  )
}

export default Blog
