import Typography from 'antd/es/typography';
import React from 'react';
import { LipsumPara } from '../../../components/lipsum';
const { Title } = Typography;
export const AuthorSubPage = () => {
    return React.createElement(React.Fragment, null,
        React.createElement(Title, { level: 1 }, "Author sub-page"),
        React.createElement(LipsumPara, { paragraphs: 4 }));
};
//# sourceMappingURL=sub-page.js.map