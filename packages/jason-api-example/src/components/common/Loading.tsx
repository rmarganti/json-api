import styled, { keyframes } from 'styled-components';

const animation = keyframes`
    to {transform: rotate(360deg);}
`;

const Loading = styled.span`
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;

    &:before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        margin-left: -10px;
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.3);
        border-top-color: inherit;
        animation: ${animation} 1s linear infinite;
    }
`;

export default Loading;
