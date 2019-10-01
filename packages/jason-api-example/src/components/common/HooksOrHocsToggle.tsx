import * as React from 'react';
import styled from 'styled-components';

interface HooksOrHocsToggleProps {
    showHooks: boolean;
    toggleShowHooks: () => void;
}

const HooksOrHocsToggle: React.SFC<HooksOrHocsToggleProps> = ({
    showHooks,
    toggleShowHooks,
}) => (
    <Root onClick={toggleShowHooks}>
        <Tab isActive={showHooks}>Hooks</Tab>
        <Tab isActive={!showHooks}>HOC's</Tab>
    </Root>
);

const Root = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 1em;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
`;

interface TabProps {
    isActive: boolean;
}
const Tab = styled.button<TabProps>`
    padding: 1em 2em;
    border: 1px solid #1565c0;
    background-color: ${({ isActive }) => (isActive ? '#1565c0' : '#fff')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#1565c0')};
    border-radius: 0;
    outline: none;
    cursor: pointer;

    &:first-child {
        border-top-left-radius: 1em;
        border-bottom-left-radius: 1em;
    }

    &:last-child {
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;
    }
`;

export default HooksOrHocsToggle;
