import React from 'react'
import { StyledButton } from './ButtonStyled'

const Button = ({ bgcolor, textcolor, children, ...rest }) => {
  return (
    <StyledButton bgcolor={bgcolor} textcolor={textcolor} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button