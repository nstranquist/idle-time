// styles/link.styled.js

import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const UnstyledLink = styled(Link)`
  text-decoration: inherit;
  color: inherit;
  font-size: inherit;

  &:active, &:focus, &:focused {
    outline: 0;
    border: none;
    -mox-outline-style: none;
  }
`