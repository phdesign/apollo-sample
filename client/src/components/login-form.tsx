import React, { Component } from "react";
import styled, { css } from "styled-components";
import { size } from "polished";
import Button from "./button";
import space from "../assets/images/space.jpg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Curve } from "../assets/curve.svg";
import { ReactComponent as Rocket } from "../assets/rocket.svg";
import { unit, colors } from "../styles";

interface LoginFormProps {
  login: (a: { variables: any }) => void;
}

interface LoginFormState {
  email: string;
}

class LoginForm extends Component<LoginFormProps, LoginFormState> {
  state = { email: "" };

  onSubmit(event: any) {
    event.preventDefault();
    this.props.login({ variables: { email: this.state.email } });
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const email = (event.target as HTMLInputElement).value;
    this.setState(() => ({ email }));
  }

  render() {
    return (
      <Container>
        <Header>
          <StyledCurve />
          <StyledLogo />
        </Header>
        <StyledRocket />
        <Heading>Space Explorer</Heading>
        <StyledForm onSubmit={(e) => this.onSubmit(e)}>
          <StyledInput
            required
            type="email"
            name="email"
            placeholder="Email"
            data-testid="login-input"
            onChange={(e) => this.onChange(e)}
          />
          <Button type="submit">Log in</Button>
        </StyledForm>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-bottom: ${unit * 6}px;
  color: white;
  background-color: ${colors.primary};
  background-image: url(${space});
  background-size: cover;
  background-position: center;
`;

const svgClassName = css`
  display: block;
  fill: currentColor;
`;

const Header = styled.header`
  ${svgClassName}
  width: 100%;
  margin-bottom: ${unit * 5}px;
  padding: ${unit * 2.5}px;
  position: relative;
`;

const StyledLogo = styled(Logo)`
  ${size(56)}
  display: block;
  margin: 0 auto;
  position: relative;
`;

const StyledCurve = styled(Curve)`
  ${size("100%")}
  fill: ${colors.primary};
  position: absolute;
  top: 0;
  left: 0;
`;

const Heading = styled.h1`
  margin: ${unit * 3}px 0 ${unit * 6}px;
`;

const StyledRocket = styled(Rocket)`
  ${svgClassName}
  width: 250px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 406px;
  padding: ${unit * 3.5}px;
  border-radius: 3px;
  box-shadow: 6px 6px 1px rgba(0, 0, 0, 0.25);
  color: ${colors.text};
  background-color: white;
`;

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: ${unit * 2}px;
  padding: ${unit * 1.25}px ${unit * 2.5}px;
  border: 1px solid ${colors.grey};
  font-size: 16px;
  outline: none;
  :focus {
    border-color: ${colors.primary};
  }
`;

export default LoginForm;
