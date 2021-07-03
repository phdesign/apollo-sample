import React from "react";
import styled from "styled-components/macro";

import LogoutButton from "../containers/logout-button";
import MenuItem from "./menu-item";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as CartIcon } from "../assets/icons/cart.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";
import { unit, colors } from "../styles";

const Footer = () => {
  return (
    <Container>
      <InnerContainer>
        <MenuItem to="/">
          <HomeIcon />
          Home
        </MenuItem>
        <MenuItem to="/cart">
          <CartIcon />
          Cart
        </MenuItem>
        <MenuItem to="/profile">
          <ProfileIcon />
          Profile
        </MenuItem>
        <LogoutButton />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.footer`
  flex-shrink: 0;
  margin-top: auto;
  background-color: white;
  color: ${colors.textSecondary};
  position: sticky;
  bottom: 0;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 460px;
  padding: ${unit * 2.5}px;
  margin: 0 auto;
`;

export default Footer;
