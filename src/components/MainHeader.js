import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Container, Flex, media } from "./styles"
import { Typography, Icon as IconUnstyled } from "antd"
import SEOBuilt from "./SEOBuilt"

const { Text, Title: TitleUnstyled } = Typography
const Header = styled.header`
  padding: 20px 0px;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16);
  z-index: 10000;
`

const FlexS = styled(Flex)`
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: all 0.3s ease-in-out;
`

const Title = styled(TitleUnstyled)`
  ${media.phone`
    font-size: 16px;  
    &.ant-typography {
      font-size: 16px;
    }
  `}
`

const Icon = styled(IconUnstyled)`
  font-size: 20px;
  color: black;
`

const StyledLink = styled(Link)`
  right: ${({ home }) => (home ? "18%" : "10%")};
  z-index: 100000;
  color: black;
  ${media.phone`
  right: ${({ home }) => (home ? "19%" : "5%")};;
  top: 32px;
`}
`

const Desktop = styled.div`
  display: none;
  ${media.phone`
    display: none;
  `}
`

const Mobile = styled.div`
  display: block;
  ${media.phone`
    display: block;
  `}
`

const HomeLink = ({ spanish, link, active }) => {
  return (
    <FlexS
      active={active}
      resRow
      res="flex: 2;"
      flex="1"
      justify="space-between"
    >
      {spanish ? (
        <>
          <StyledLink home to="/">
            <Icon style={{ color: "#A0A0A0A0" }} type="home" />
          </StyledLink>
          <StyledLink shrink to={link}>
            <Desktop>English</Desktop>
            <Mobile>EN</Mobile>
          </StyledLink>
        </>
      ) : (
        <>
          <StyledLink home to="/en">
            <Icon style={{ color: "#A0A0A0A0" }} type="home" />
          </StyledLink>
          <StyledLink shrink to={link}>
            <Desktop>Spanish</Desktop>
            <Mobile>ES</Mobile>
          </StyledLink>
        </>
      )}
    </FlexS>
  )
}

const MainHeader = ({ spanish, link }) => (
  <Header>
    <SEOBuilt spanish={spanish} />
    <Container>
      <Flex
        align="center"
        justify="space-between"
        res="align-items: flex-start; padding: 0px 0px;"
        resRow
      >
        <Title style={{ fontWeight: "normal", margin: 0, flex: 12 }} level={4}>
          <Link style={{ color: "black" }} to={spanish ? "/" : "/en"}>
            Luis Muñoz <strong style={{ fontWeight: '700'}}>Photography</strong>
          </Link>
        </Title>
        <HomeLink active={true} spanish={spanish} link={link} />
      </Flex>
    </Container>
  </Header>
)
export { HomeLink }

export default MainHeader
