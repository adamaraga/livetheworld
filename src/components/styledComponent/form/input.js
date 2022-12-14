import styled from "styled-components";
import { colorTheme } from "../color";

export const Input = styled.input`
  height: 3.5rem;
  width: ${(props) => (props.width ? props.width : `100%`)};
  border-radius: 5px;
  outline: none;
  border: ${(props) =>
    props.error
      ? `1px solid ${colorTheme.error}`
      : `1px solid ${colorTheme.input}`};
  margin-bottom: 1rem;
  padding: 0 1rem;
  transition: 0.3s;

  &:hover {
    border: ${(props) =>
      props.error
        ? `1px solid ${colorTheme.error}`
        : `1px solid ${colorTheme.secondary}`};
  }

  &:focus {
    border: ${(props) =>
      props.error
        ? `1px solid ${colorTheme.error}`
        : `1px solid ${colorTheme.secondary}`};
  }
`;

export const ErrorMessage = styled.div`
  color: ${colorTheme.error};
  font-size: 1.2rem;
  font-weight: 400;
  display: ${(props) => (props.show ? "inline-block" : "none")};
  position: relative;
  top: ${(props) => (props.top ? props.top : "-1rem")};
`;
