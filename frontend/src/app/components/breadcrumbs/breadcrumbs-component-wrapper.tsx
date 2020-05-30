import React from 'react';
import { AppBreadcrumbs } from './breadcrumbs-component';

// Wrapper for Affix: it requires ref

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function appBreadcrumb(props, ref): any {
    return <AppBreadcrumbs {...props} forwardedRef={ref} />;
}

export const AppBreadcrumbsWrapper = React.forwardRef(appBreadcrumb);
