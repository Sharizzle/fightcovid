import { RouteMapping } from './route-mapping';
const MIN_ITEM_LENGTH = 2;
export function isSecondary(item) {
    return item.url.split('/').length > MIN_ITEM_LENGTH;
}
export function prepareItems(items) {
    return items.map(item => {
        if (typeof item.isSecondary === 'undefined') {
            return Object.assign(Object.assign({}, item), { isSecondary: isSecondary(item) });
        }
        return item;
    });
}
export function getRouteById(id) {
    return RouteMapping.find(item => item.id === id);
}
export function getRouteByUrl(url) {
    return RouteMapping.find(item => item.url === url);
}
//# sourceMappingURL=route-mapping-utils.js.map