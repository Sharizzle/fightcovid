import React from 'react';
import { LipsumPara } from '../../components/lipsum';
import Typography from 'antd/es/typography';
const { Title } = Typography;
export const SettingsPage = () => {
    return React.createElement(React.Fragment, null,
        React.createElement(Title, { level: 1 }, "Settings page"),
        React.createElement(LipsumPara, { paragraphs: 2 }));
};
//# sourceMappingURL=index.js.map