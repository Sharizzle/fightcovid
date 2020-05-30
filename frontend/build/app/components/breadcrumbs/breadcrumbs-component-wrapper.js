import React from 'react';
import { AppBreadcrumbs } from './breadcrumbs-component';
function appBreadcrumb(props, ref) {
    return React.createElement(AppBreadcrumbs, Object.assign({}, props, { forwardedRef: ref }));
}
export const AppBreadcrumbsWrapper = React.forwardRef(appBreadcrumb);
//# sourceMappingURL=breadcrumbs-component-wrapper.js.map