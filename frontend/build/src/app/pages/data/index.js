import Typography from 'antd/es/typography';
import React from 'react';
import { LipsumPara } from '../../components/lipsum';
const { Title } = Typography;
export const DataPage = () => {
    return React.createElement(React.Fragment, null,
        React.createElement(Title, { level: 1 }, "Data page"),
        React.createElement(LipsumPara, { paragraphs: 28 }));
};
//# sourceMappingURL=index.js.map