import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app';
import './styles/app.less';
const runApp = () => {
    ReactDOM.render(React.createElement(App, null), document.getElementById('app-mount-point'));
};
runApp();
if (module.hot) {
    module.hot['accept']('./App', () => {
        runApp();
    });
}
//# sourceMappingURL=index.js.map