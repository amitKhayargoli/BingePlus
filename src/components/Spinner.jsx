import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid var(--secondary);
    border-top-color: transparent;
    animation: rot1 1.2s linear infinite;
  }

  @keyframes rot1 {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
