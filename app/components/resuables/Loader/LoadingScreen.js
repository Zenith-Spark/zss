import styled, { keyframes } from 'styled-components';

const rotateLoader = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.div`
  color: #999;
  font-family: 'PT Sans Narrow', sans-serif;
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

const LoadingContent = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  border: 3px solid transparent;
  border-top-color: #4d658d;
  border-bottom-color: #4d658d;
  border-radius: 50%;
  animation: ${rotateLoader} 2s linear infinite;

  &:before, &:after {
    content: '';
    position: absolute;
    border: 3px solid transparent;
    border-radius: 50%;
  }

  &:before {
    border-top-color: #d4cc6a;
    border-bottom-color: #d4cc6a;
    left: 5px;
    right: 5px;
    top: 5px;
    bottom: 5px;
    animation: ${rotateLoader} 3s linear infinite;
  }

  &:after {
    border-top-color: #84417c;
    border-bottom-color: #84417c;
    left: 15px;
    right: 15px;
    top: 15px;
    bottom: 15px;
    animation: ${rotateLoader} 1.5s linear infinite;
  }
`;

const LoadingScreen = () => (
  <LoadingWrapper>
    <div>
      <LoadingText>LOADING</LoadingText>
      <LoadingContent />
    </div>
  </LoadingWrapper>
);

export default LoadingScreen;
