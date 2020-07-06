import * as React from 'react';

import HooksOrHocsToggle from './components/common/HooksOrHocsToggle';
import HocsArticle from './components/hocs/Article';
import HooksArticle from './components/hooks/Article';
import { useToggle } from './hooks';

const App: React.FunctionComponent = () => {
    const [showHooks, toggleShowHooks] = useToggle(true);

    return (
        <>
            <HooksOrHocsToggle
                showHooks={showHooks}
                toggleShowHooks={toggleShowHooks}
            />

            {showHooks ? <HooksArticle id="123" /> : <HocsArticle id="123" />}
        </>
    );
};

export default App;
