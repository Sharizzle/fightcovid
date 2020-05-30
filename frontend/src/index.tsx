import React from 'react';
import { hydrate, render } from 'react-dom';

import App from './app/app';
import './styles/app.less';

const runApp = (): void => {
    const rootElement = document.getElementById('app-mount-point');
    if (rootElement?.hasChildNodes()) {
        hydrate(<App />, rootElement);
    } else {
        render(<App />, rootElement);
    }
};

runApp();

// Hot reloading
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (module as any).hot['accept']('./App', () => {
        runApp();
    });
}
