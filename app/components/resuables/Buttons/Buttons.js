'use client';
import React from 'react';
import styled from 'styled-components';

const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:active {
    transform: translateY(1px);
  }
`;

const StyledButtonOne = styled(ButtonBase)`
  background-color: #fbbf24;
  color: white;
  border: 1px solid #fbbf24;
  ${({ IconButton }) =>
    IconButton ? 'width: 2.25rem; height: 2.25rem; border-radius: 50%;' : 'padding: 0.5rem 1rem; border-radius: 1.5rem; height: auto;'}
  &:hover {
    background-color: transparent;
    color: #fbbf24;
  }
`;

const StyledButtonTwo = styled(ButtonBase)`
  background-color: transparent;
  color: #fbbf24;
  border: 1px solid #fbbf24;
  ${({ IconButton }) =>
    IconButton ? 'width: 2.25rem; height: 2.25rem; border-radius: 50%;' : 'padding: 0.5rem 1rem; border-radius: 1.5rem; height: auto;'}
  &:hover {
    background-color: #fbbf24;
    color: white;
  }
`;

export const ButtonOne = ({ buttonValue, iconValue, IconButton, Clicked }) => (
  <StyledButtonOne onClick={Clicked} IconButton={IconButton}>
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span>{iconValue}</span>}
  </StyledButtonOne>
);

export const ButtonTwo = ({ buttonValue, iconValue, IconButton, Clicked }) => (
  <StyledButtonTwo onClick={Clicked} IconButton={IconButton}>
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span>{iconValue}</span>}
  </StyledButtonTwo>
);
