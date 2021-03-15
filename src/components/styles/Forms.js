import React from "react"
import styled, { keyframes } from "styled-components"
import { lighten } from "polished"
import { fontSecondary, colorPrimary, colorSecondary } from "./variables"
import media from "./media"

const loadingAnimation = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
`

const normalColors = `
  linear-gradient(
    45deg,
    ${colorPrimary} 0%,
    ${colorPrimary} 50%,
    ${colorPrimary} 100%
  )
`
const loadingColors = `
  linear-gradient(
    45deg,
    ${colorPrimary} 0%,
    ${colorSecondary} 50%,
    ${colorPrimary} 100%
  )
`

export const Form = styled.form`
  text-align: center;
  > div {
    box-shadow: 0px 3px 5px hsla(0, 0%, 0%, 0.19);
    background: white;
    padding: 50px 50px 30px 50px;
    ${media.phone`
        padding: 20px 20px 60px 20px;      
      `}
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 5px;
    grid-template-rows: repeat(${({ repeatVal }) => repeatVal}, auto auto 20px);
  }
  > fieldset {
    border: 0;
    padding: 0;
    margin: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 7px;
      content: "";
      display: block;
      background-image: ${normalColors};
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      background-image: ${loadingColors};
      animation: ${loadingAnimation} 0.5s linear infinite;
    }
  }
`

const commonMedia = media.phone`
  grid-column: 1/-1;
  grid-row: auto;
`

export const Error = styled.div`
  grid-column: ${({ gridcolumn = "1/-1" }) => gridcolumn};
  grid-row: ${({ gridrow = "auto" }) => gridrow};
  > p {
    color: var(--errorRed);
    font-family: ${fontSecondary};
    font-size: var(--textSize);
    text-align: left;
    margin: 0 0 0 5px;
  }
  ${commonMedia}
`

export const ErrorComponent = ({ gridcolumn, children }) => (
  <Error gridcolumn={gridcolumn}>
    <p>{children}</p>
  </Error>
)

export const Label = styled.label`
  font-family: ${fontSecondary};
  font-size: var(--textSize);
  color: hsla(0, 0%, 0%, 0.5);
  text-align: left;
  > span {
    color: red;
  }
  grid-column: ${({ gridcolumn = "1/-1" }) => gridcolumn};
  grid-row: ${({ gridrow = "auto" }) => gridrow};
  ${commonMedia}
`

export const Input = styled.input`
  padding: 10px 20px;
  line-height: 1;
  height: 40px;
  font-family: ${fontSecondary};
  font-size: var(--textSize);
  border-radius: 50px;
  border: solid 1px hsla(0, 0%, 0%, 0.15);
  box-sizing: border-box;
  grid-column: ${({ gridcolumn = "1/-1" }) => gridcolumn};
  grid-row: ${({ gridrow = "auto" }) => gridrow};
  ${commonMedia}
  &:focus {
    border: solid 2px var(--colorPrimary);
  }
`
