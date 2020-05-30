import Typography from 'antd/es/typography';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LipsumPara } from '../../components/lipsum';
import { getRouteById } from '../../routing/route-mapping-utils';
const { Title } = Typography;
export const AboutPage = () => {
    const [authorRoute, setAuthorRoute] = useState();
    const [authorSubRoute, setAuthorSubRoute] = useState();
    useEffect(() => {
        const authorPage = getRouteById('author');
        const authorSubPage = getRouteById('author-sub');
        setAuthorRoute(authorPage);
        setAuthorSubRoute(authorSubPage);
    }, []);
    return React.createElement(React.Fragment, null,
        React.createElement(Title, { level: 1 }, "About page"),
        React.createElement(LipsumPara, { paragraphs: 3 }),
        React.createElement(Title, { level: 2 }, "Secondary pages"),
        React.createElement("ul", null,
            React.createElement("li", null, authorRoute && React.createElement(Link, { to: authorRoute.url }, "Click me (Author, level 2)")),
            React.createElement("li", null, authorSubRoute && React.createElement(Link, { to: authorSubRoute.url }, "Click me (Author sub-page, level 3)"))));
};
//# sourceMappingURL=index.js.map