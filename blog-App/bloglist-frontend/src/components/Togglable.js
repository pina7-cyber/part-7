import { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import React from "react"
import { Button, IconButton } from "@mui/material"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

const Togglable = React.forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = {
    display: visible ? "" : "none",
    textAlign: "center",
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant='outlined' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        <IconButton component={"div"} onClick={toggleVisibility}>
          <ExpandLessIcon />
        </IconButton>
        <br />
        {props.children}
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"

export default Togglable
