import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${props => props.bgcolor || '#6200ea'};
  color: ${props => props.textcolor || '#fff'};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;