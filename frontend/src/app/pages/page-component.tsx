import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppPage: React.FC<{ children?: any }> = (props) => {
    return <div className="app-page">{props?.children}</div>;
};
