import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
  font-size: 1.5em;
  text-decoration: none;
  letter-spacing: 2px;
  line-height: 1em;
  overflow: hidden;
  position: relative;
  color: #00ade1;
  border-left: 8px solid #00ade1;
  border-right: 8px solid #00ade1;
  -webkit-text-stroke: 1px #00ade1;
  transition: 0.05s;

  &:hover {
    border-left: 8px solid #00dc82;
    border-right: 8px solid #00dc82;
    color: #00dc82;
    -webkit-text-stroke: 1px #00dc82;
    filter: drop-shadow(0 0 25px #00dc82);
  }
`
