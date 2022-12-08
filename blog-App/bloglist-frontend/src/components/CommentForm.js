import { initializeComments, createComment } from "../reducers/commentReducer"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

const CommentForm = ({ id, toggleVisibility }) => {
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    dispatch(initializeComments(id))
  }, [dispatch, id])
  const comments = useSelector((state) => state.comments)

  const addComment = async (event) => {
    event.preventDefault()
    dispatch(createComment(id, newComment))
    setNewComment("")
  }

  const handleInput = (event) => {
    setNewComment(event.target.value)
  }

  return (
    <div>
      <Button endIcon={<ExpandLessIcon />} onClick={toggleVisibility}>
        <Typography variant={"h7"}>Comments</Typography>
      </Button>
      <form onSubmit={addComment}>
        <TextField
          size='small'
          label='anonymous Comment'
          multiline
          maxRows={4}
          name='comment'
          value={newComment}
          onChange={handleInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  size='small'
                  variant='standard'
                  id='create-button'
                  type='submit'
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
      {comments.map((comment) => (
        <Typography key={comment.id}>{comment.content}</Typography>
      ))}
    </div>
  )
}

export default CommentForm
