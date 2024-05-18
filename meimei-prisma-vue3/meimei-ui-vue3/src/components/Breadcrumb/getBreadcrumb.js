import { findPathNum, route, isDashboard, levelList } from './index.vue';

export function getBreadcrumb() {
const pathNum = findPathNum(route.path);
if (pathNum > 2) {
const reg = /\/\w+/gi;
const pathList = route.path.match(reg).map((item, index) => {
if (index !== 0) item = item.slice(1);
return item;
});
} else {
}
// only show routes with meta.title
let matched = route.matched.filter(item => item.meta && item.meta.title);
const first = matched[0];
// 判断是否为首页
if (!isDashboard(first)) {
matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched);
}

levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
}
