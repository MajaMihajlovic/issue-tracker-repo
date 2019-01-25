import { HtmlElement, Route } from 'cx/widgets';


import Sales from './sales';

export default <cx>
    <Route route="~/dashboards/sales" url-bind="url">
        <Sales />
    </Route>

</cx>;
