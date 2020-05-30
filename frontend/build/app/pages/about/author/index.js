import React from 'react';
import { LipsumPara } from '../../../components/lipsum';
import Typography from 'antd/es/typography';
const { Title } = Typography;
export const AuthorPage = () => {
    return React.createElement(React.Fragment, null,
        React.createElement(Title, { level: 1 }, "Author page"),
        React.createElement(LipsumPara, { paragraphs: 4 }));
};
//# sourceMappingURL=index.js.map