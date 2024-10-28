// @assets/app/components/Loader.js
'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

// Animation for the spinner
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled Loader Container
const LoaderContainer = styled.div`
  margin: 0 auto 2em;
  height: 100px;
  width: 20%;
  display: inline-block;
  vertical-align: top;
  text-align: center;
`;

// Styled Spinner Icon
const Spinner = styled(FaSpinner)`
  animation: ${spin} 0.6s linear infinite;
  color: #ff6700; /* Change this to your desired color */
  font-size: 40px; /* Size of the spinner */
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

export default Loader;


