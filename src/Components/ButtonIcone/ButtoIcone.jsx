import React from 'react'
import { StyledButtonIcon } from './ButtonIconStyled'

const Button = ({ bgcolor, textcolor, children, icon, ...rest }) => {
  return (
    <StyledButtonIcon bgcolor={bgcolor} textcolor={textcolor} icon={icon} {...rest}>
      {children}
    </StyledButtonIcon>
  )
}

export default Button