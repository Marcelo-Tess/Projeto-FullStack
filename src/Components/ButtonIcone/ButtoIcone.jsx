import React from 'react'
import { StyledButton } from './ButtonStyled'

const Button = ({ bgcolor, textcolor, children, icon, ...rest }) => {
  return (
    <StyledButton bgcolor={bgcolor} textcolor={textcolor} icon={icon} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button