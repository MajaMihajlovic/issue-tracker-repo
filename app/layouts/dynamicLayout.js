import { Widget } from 'cx/ui';


import { AppLayout } from './AppLayout';
import { store } from 'app/store';

var cache = {};
store.init('layout.id', "layout1");

export function applyOuterLayout(context, instance) {
    var { widget, store } = instance;
    var layoutName = store.get('layout.id');

    if (!cache.layout || cache.layoutName != layoutName) {
        cache.layoutName = layoutName;
        cache.layout = Widget.create(AppLayout);
    }

    widget.outerLayout = cache.layout;
}

export function selectLayout(x) {
    store.set('layout.id', x);
}
