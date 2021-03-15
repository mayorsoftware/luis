import styled from 'styled-components'
import { fontPrimary, fontSecondary, media } from './index'

export const Image = styled.img`
  height: ${({ h }) => h || 'auto'};
  width: ${({ w }) => w || 'auto'};
  border-radius: ${({ round, roundness }) =>
    round ? '50%' : roundness || '0'};
  box-shadow: ${({ bs }) => bs || '0px 3px 6px rgba(0, 0, 0, 0.21)'};
  padding: ${({ p }) => p || 'auto'};
  ${({ extra = '' }) => extra} ${media.phone`
    width: ${({ resW }) => resW || 'auto'};
    height:  ${({ resH }) => resH || 'inherit'};
    ${({ res = '' }) => res}
  `};
`

export const H1 = styled.h1`
  font-family: ${({ secondary }) => (secondary ? fontSecondary : fontPrimary)};
  font-size: var(--fontSizeH1);
  margin: ${({ m = 0 }) => m};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ colorPrimary }) => colorPrimary ? 'var(--colorPrimary)' : 'rgb(0, 0, 0)'};
  ${media.phone`
    // font-size: ${({ resFs }) => resFs};
    ${({ res = '' }) => res};
  `};
`

export const Heading = styled.h2`
  font-family: ${({ secondary }) => (secondary ? fontSecondary : fontPrimary)};
  font-size: ${({ fs }) => fs || '35px'};
  margin: ${({ m = 0 }) => m};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ col }) => col || 'rgb(0, 0, 0)'};
  ${media.phone`
    font-size: ${({ resFs }) => resFs || 'inherit'};
    ${({ res = '' }) => res};
  `};
`

export const Text = styled.p`
  font-family: ${({ secondary }) => (secondary ? fontSecondary : fontPrimary)};
  font-weight: ${({ fw = 'normal' }) => fw};
  letter-spacing: ${({ ls = 'normal' }) => ls};
  font-size: ${({ fs }) => fs || '16px'};
  margin: ${({ m }) => m || 0};
  padding: ${({ p }) => p || 0};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ col }) => col || 'rgb(0, 0, 0)'};
  line-height: ${({ lheight }) => lheight || 1};
  width: ${({ w }) => w || 'auto'};
  ${media.phone`
    ${({ res = '' }) => res}
  `};
`
