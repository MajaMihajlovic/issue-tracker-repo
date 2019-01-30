import { HtmlElement, Route } from 'cx/widgets';


import MyProjects from './MyProjects';

export default <cx>
    <Route route="~/projects/" url-bind="url">
        <MyProjects />
    </Route>


</cx>;