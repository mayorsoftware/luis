import React from "react"
import styled from "styled-components"
import { lighten } from "polished"
import { Link } from "gatsby"
import {
  fontPrimary,
  colorPrimary,
  colorBlack,
  colorPrimaryShade,
} from "./index"

export const A = styled.a`
  text-decoration: none;
  font-size: ${({ fs }) => fs || "18px"};
  font-family: ${fontPrimary};
  padding: ${({ p }) => p || 0};
  transition: padding 0.2s ease-out;
  transition: color 0.15s ease-in;
  cursor: pointer;
  color: black;
  &:after {
    content: " ";
    display: block;
    width: 0;
    height: 2px;
    background: ${colorBlack};
    transition: width 0.15s ease-in;
  }
  &:hover {
    &:after {
      background: #052391;
      width: 100%;
    }
    color: #052391;
  }
  ${({ extra = "" }) => extra};
`

export const ButtonLink = styled(Link)`
  text-decoration: none;
  font-size: ${({ fs }) => fs || "18px"};
  font-family: ${fontPrimary};
  padding: ${({ p }) => p || 0};
  transition: padding 0.2s ease-out;
  transition: color 0.15s ease-in;
  cursor: pointer;
  color: black;
  &:after {
    content: " ";
    display: block;
    width: 0;
    height: 2px;
    background: ${colorBlack};
    transition: width 0.15s ease-in;
  }
  &:hover {
    &:after {
      background: #052391;
      width: 100%;
    }
    color: #052391;
  }
  ${({ extra = "" }) => extra};
`

export const StyledLink = ({ children, href = "#", p }) => (
  <Link href={href}>
    <A p={p}>{children}</A>
  </Link>
)

export const Button = styled.button`
  border: solid ${({ bold }) => (bold ? "2px" : "1px")}
    ${({ bc }) => bc || colorPrimary};
  padding: ${({ p }) => p || "10px 30px"};
  border-radius: 30px;
  background: none;
  transition: all 0.3s ease-out;
  font-family: ${fontPrimary};
  font-size: ${({ fs = "15px" }) => fs};
  font-weight: ${({ bold }) => bold || "normal"};
  color: ${({ col }) => col || colorPrimary};
  cursor: pointer;
  margin: ${({ m = 0 }) => m};
  transition: 0.2s all ease-in-out;
  > a {
    color: ${({ col }) => col || colorPrimary};
    transition: all 0.3s ease-out;
    font-family: ${fontPrimary};
    font-size: 20px;
    text-decoration: none;
  }
  &:hover {
    background: ${({ colBg }) => colBg || colorPrimary};
    border-color: ${({ colBg }) => colBg || colorPrimary};
    color: #fff;
    box-shadow: 0 5px 7px ${({ sCol = lighten(0.4, colorPrimary) }) => sCol};
    > a {
      color: #fff;
    }
  }
  &:disabled {
    opacity: 0.5;
  }
`

export const Btn = styled.button`
  border: solid ${({ bold }) => (bold ? "2px" : "1px")}
    ${({ bc }) => bc || colorPrimary};
  padding: ${({ p }) => p || "10px 30px"};
  border-radius: 30px;
  background: none;
  transition: all 0.3s ease-out;
  font-family: ${fontPrimary};
  font-size: ${({ fs = "15px" }) => fs};
  font-weight: ${({ bold }) => bold || "normal"};
  color: ${({ col }) => col || colorPrimary};
  cursor: pointer;
  margin: ${({ m = 0 }) => m};
  transition: 0.2s all ease-in-out;
  &:hover {
    background: ${({ colBg }) => colBg || colorPrimary};
    border-color: ${({ colBg }) => colBg || colorPrimary};
    color: #fff;
    box-shadow: 0 5px 7px ${({ sCol = lighten(0.4, colorPrimary) }) => sCol};
  }
  &:disabled {
    opacity: 0.5;
  }
`

export const SecondaryButton = styled.button`
  border: none;
  font-family: ${fontPrimary};
  font-size: var(--textSize);
  color: ${({ col = "#fff" }) => col};
  background: ${({ bg = colorPrimary }) => bg};
  cursor: pointer;
  padding: ${({ p }) => p || "13px 40px"};
  display: inline-block;
  letter-spacing: 1px;
  text-align: center;
  font-weight: ${({ bold }) => bold || "normal"};
  outline: none;
  position: relative;
  box-shadow: 0 2px 3px ${({ sCol = colorPrimaryShade(0.2) }) => sCol};
  border-radius: 50px;
  margin: ${({ m = 0 } = {}) => m};
  transition: 0.2s all ease-in-out;
  &:hover {
    box-shadow: 0 5px 7px ${({ sCol = lighten(0.4, colorPrimary) }) => sCol};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
