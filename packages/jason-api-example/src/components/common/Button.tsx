import styled from 'styled-components';

export default styled.button`
    background-color: #1565c0;
    color: #fff;
    padding: 1em 2em;
    border: none;
    border-radius: 0.25em;
    cursor: pointer;

    &:hover {
        background-color: #0d47a1;
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        opacity: 0.5;
        cursor: wait;
    }
`;
