import * as React from 'react';

import HooksOrHocsToggle from './components/common/HooksOrHocsToggle';
import HocsArticle from './components/hocs/Article';
import HooksArticle from './components/hooks/Article';
import { useToggle } from './hooks';

const App: React.FunctionComponent = () => {
    const [showHooks, toggleShowHooks] = useToggle(true);

    const [id, setId] = React.useState('1');

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            const randomId = Math.floor(Math.random() * 100);
            setId(`${randomId}`);
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <HooksOrHocsToggle
                showHooks={showHooks}
                toggleShowHooks={toggleShowHooks}
            />

            {showHooks ? <HooksArticle id={id} /> : <HocsArticle id={id} />}
        </>
    );
};

export default App;
