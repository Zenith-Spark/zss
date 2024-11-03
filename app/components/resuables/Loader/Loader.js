import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const scale = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(3);
  }
`;

const translate = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
`;

const fadeOpacity = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
`;

const heightAnimation = keyframes`
  0%, 100% {
    height: 5px;
    y: 13;
  }
  50% {
    height: 21px;
    y: 5;
  }
`;

// Styled Loader Components
const LoaderStyle1 = styled.div`
  height: 100px;
  width: 20%;
  display: inline-block;
  text-align: center;
  margin: 0 auto 2em;

  svg path {
    fill: #000;
  }

  svg path:nth-child(2) {
    animation: ${rotate} 0.5s infinite;
  }
`;

const LoaderStyle2 = styled.div`
  height: 100px;
  width: 20%;
  display: inline-block;
  text-align: center;
  margin: 0 auto 2em;

  svg path {
    fill: #000;
    animation: ${rotate} 0.6s infinite;
  }
`;

const LoaderStyle3 = styled.div`
  height: 100px;
  width: 20%;
  display: inline-block;
  text-align: center;
  margin: 0 auto 2em;

  svg path {
    fill: #000;
    animation: ${rotate} 0.6s infinite;
  }
`;

// Styled Loader Components
const LoaderStyle4 = styled.div`
  height: 30px;
  width: 24px;
  display: inline-block;
  text-align: center;

  svg rect {
    fill: #333;
  }
`;

const LoaderStyle5 = styled.div`
  height: 30px;
  width: 24px;
  display: inline-block;
  text-align: center;

  svg rect {
    fill: #333;
  }
`;

const LoaderStyle6 = styled.div`
  height: 30px;
  width: 24px;
  display: inline-block;
  text-align: center;

  svg rect {
    fill: #333;
    animation: ${heightAnimation} 0.6s infinite;
  }
`;

const LoaderStyle7 = styled.div`
  height: 30px;
  width: 24px;
  display: inline-block;
  text-align: center;

  svg rect {
    fill: #333;
    animation: ${fadeOpacity} 0.6s infinite;
  }
`;

const LoaderStyle8 = styled.div`
  height: 30px;
  width: 24px;
  display: inline-block;
  text-align: center;

  svg rect {
    fill: #333;
    opacity: 0.2;
  }
`;



// More loader styles would follow similarly...

// Loader Components
export const Loader = () => (
  <LoaderStyle1>
    <svg width="40px" height="40px" viewBox="0 0 40 40">
      <path opacity="0.2" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
      <path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z" />
    </svg>
  </LoaderStyle1>
);

export const LoaderTwo = () => (
  <LoaderStyle2>
    <svg width="40px" height="40px" viewBox="0 0 50 50">
      <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" />
    </svg>
  </LoaderStyle2>
);

export const LoaderThree = () => (
  <LoaderStyle3>
    <svg width="40px" height="40px" viewBox="0 0 50 50">
      <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068 c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" />
    </svg>
  </LoaderStyle3>
);

// Loader Style 4
export const LoaderStyle4Component = () => (
  <LoaderStyle4>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="24px" height="24px" viewBox="0 0 24 24" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
      <rect x="0" y="0" width="4" height="7">
        <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="10" y="0" width="4" height="7">
        <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="20" y="0" width="4" height="7">
        <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  </LoaderStyle4>
);

// Loader Style 5
export const LoaderStyle5Component = () => (
  <LoaderStyle5>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="24px" height="30px" viewBox="0 0 24 30" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
      <rect x="0" y="0" width="4" height="10">
        <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="10" y="0" width="4" height="10">
        <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="20" y="0" width="4" height="10">
        <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  </LoaderStyle5>
);

// Loader Style 6
export const LoaderStyle6Component = () => (
  <LoaderStyle6>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="24px" height="30px" viewBox="0 0 24 30" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
      <rect x="0" y="13" width="4" height="5">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="10" y="13" width="4" height="5">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="20" y="13" width="4" height="5">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  </LoaderStyle6>
);

// Loader Style 7
export const LoaderStyle7Component = () => (
  <LoaderStyle7>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="24px" height="30px" viewBox="0 0 24 30" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
      <rect x="0" y="0" width="4" height="20">
        <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="7" y="0" width="4" height="20">
        <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="14" y="0" width="4" height="20">
        <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  </LoaderStyle7>
);

// Loader Style 8
export const LoaderStyle8Component = () => (
  <LoaderStyle8>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="24px" height="30px" viewBox="0 0 24 30" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
      <rect x="0" y="10" width="4" height="10" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="8" y="10" width="4" height="10" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="16" y="10" width="4" height="10" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  </LoaderStyle8>
);





































































// // @assets/app/components/Loader.js
// 'use client';
// import React from 'react';
// import styled, { keyframes } from 'styled-components';
// import { FaSpinner } from 'react-icons/fa';

// // Animation for the spinner
// const spin = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

// // Styled Loader Container
// const LoaderContainer = styled.div`
//   margin: 0 auto 2em;
//   height: 100px;
//   width: 20%;
//   display: inline-block;
//   vertical-align: top;
//   text-align: center;
// `;

// // Styled Spinner Icon
// const Spinner = styled(FaSpinner)`
//   animation: ${spin} 0.6s linear infinite;
//   color: #ff6700; /* Change this to your desired color */
//   font-size: 40px; /* Size of the spinner */
// `;

// const Loader = () => {
//   return (
//     <LoaderContainer>
//       <Spinner />
//     </LoaderContainer>
//   );
// };

// export default Loader;


