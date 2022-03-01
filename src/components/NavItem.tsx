import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function NavItem(props) {
  return <StyledLink {...props} />;
}
