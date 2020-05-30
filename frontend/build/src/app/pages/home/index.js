import Typography from 'antd/es/typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { LipsumPara } from '../../components/lipsum';
import { RouteMapping } from '../../routing/route-mapping';
const { Title } = Typography;
function showRoutes() {
    return RouteMapping.map((route, idx) => {
        let result = React.createElement("li", { key: route.url },
            React.createElement(Link, { to: route.url }, route.title));
        if (route.isSecondary) {
            result = React.createElement("ul", { key: idx }, result);
        }
        return result;
    });
}
export const HomePage = () => {
    return React.createElement(React.Fragment, null,
        React.createElement(Title, { level: 1 }, "Home page"),
        React.createElement(Title, { level: 2 }, "Links"),
        React.createElement("ul", null, showRoutes()),
        React.createElement(Title, { level: 2 }, "Filler"),
        React.createElement(LipsumPara, { paragraphs: 22 }));
};
//# sourceMappingURL=index.js.map