import styled from "styled-components";

export const StyledButtonIcon = styled.button`
  background-color: ${props => props.bgcolor || '#6200ea'};
  color: ${props => props.textcolor || '#fff'};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`