import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import Togglable from "../components/Togglable"
import { Button, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

const Input = ({ name, value, handleBlogInput }) => {
  return (
    <div>
      <TextField
        multiline
        variant='standard'
        maxRows={4}
        label={name}
        value={value}
        id={name}
        onChange={handleBlogInput}
      />
    </div>
  )
}

const BlogCreationForm = () => {
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  })

  const blogCreationRef = useRef()

  const addBlog = async (event) => {
    event.preventDefault()

    dispatch(createBlog(newBlog))
    blogCreationRef.current.toggleVisibility()
    setNewBlog({
      title: "",
      author: "",
      url: "",
    })
  }

  const handleBlogInput = (event) => {
    if (event.target.id === "Title") {
      setNewBlog({ ...newBlog, title: event.target.value })
    }
    if (event.target.id === "Author") {
      setNewBlog({ ...newBlog, author: event.target.value })
    }
    if (event.target.id === "Url") {
      setNewBlog({ ...newBlog, url: event.target.value })
    }
  }

  return (
    <Togglable buttonLabel='create new Blog' ref={blogCreationRef}>
      <form onSubmit={addBlog}>
        <Input
          name='Title'
          value={newBlog.title}
          handleBlogInput={handleBlogInput}
        />
        <Input
          name='Author'
          value={newBlog.author}
          handleBlogInput={handleBlogInput}
        />
        <Input
          name='Url'
          value={newBlog.url}
          handleBlogInput={handleBlogInput}
        />
        <br />
        <Button
          endIcon={<SendIcon />}
          size='small'
          variant='outlined'
          id='create-button'
          type='submit'
        >
          send
        </Button>
      </form>
    </Togglable>
  )
}

export default BlogCreationForm
