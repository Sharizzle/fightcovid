import React from 'react';
import { LipsumPara } from '../../components/lipsum';
import Typography from 'antd/es/typography';
const { Title } = Typography;
export const UserPage = () => {
    return React.createElement(React.Fragment, null,
        React.createElement(Title, { level: 1 }, "User page"),
        React.createElement(LipsumPara, { paragraphs: 2 }));
};
//# sourceMappingURL=index.js.map