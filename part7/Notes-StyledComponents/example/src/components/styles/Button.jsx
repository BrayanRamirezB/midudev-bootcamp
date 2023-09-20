import styled from 'styled-components'

export const Button = styled.button`
  color: blueviolet;
  border: none;
  background: #1cefff;
  box-shadow: 0 0 6px #9521f3, 0 0 10px #00c3ff;
  padding: 5px 10px;
  margin-left: 5px;
  outline: none;
  border-radius: 20%;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 2px #9521f3, 1px 1px 2px #00c3ff;
  }
`
