import { HtmlElement, Route } from 'cx/widgets';


import MyProjects from './MyProjects';
import CreateProject from './CreateProject';

export default <cx>
    <Route route="~/projects/" url-bind="url">
        <MyProjects />
    </Route>

    <Route route="~/projects/create" url-bind="url">
        <CreateProject />
    </Route>
</cx>;