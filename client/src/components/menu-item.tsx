import styled from "styled-components/macro";
import { Link } from "@reach/router";

import { unit, colors } from "../styles";

const MenuItem = styled(Link)`
  flex-grow: 1;
  width: 0;
  font-family: inherit;
  font-size: 20px;
  color: inherit;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;

  svg {
    display: block;
    width: 60px;
    margin: 0 auto ${unit}px;
    fill: ${colors.secondary};
  }
`;

export default MenuItem;
