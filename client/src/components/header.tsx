import React from "react";
import styled from "styled-components";
import { size } from "polished";

import { unit, colors } from "../styles";
import dog1 from "../assets/images/dog-1.png";

interface HeaderProps {
  image?: string | any;
  children?: any;
}

const Header: React.FC<HeaderProps> = ({
  image,
  children = "Space Explorer",
}) => {
  const email = atob((localStorage.getItem("token") as string) || "");
  const avatar = image || dog1;

  return (
    <Container>
      <Image round={!image} src={avatar} alt="Space dog" />
      <div>
        <h2>{children}</h2>
        <Subheading>{email}</Subheading>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${unit * 4.5}px;
`;

interface ImageProps {
  round?: boolean;
}

const Image = styled.img`
  margin-right: ${unit * 2.5}px;
  border-radius: ${(props: ImageProps) => (props.round ? "50%" : "0%")};
  ${size("134px")}
`;

const Subheading = styled.h5`
  margin-top: ${unit / 2}px;
  color: ${colors.textSecondary};
`;

export default Header;
