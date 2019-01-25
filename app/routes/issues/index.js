import { Route } from 'cx/widgets';


import AssignedToMe from './assignedToMe';
import AddIssue from './addIssue';

export default <cx>
    <Route route="~/issues/" url-bind="url">
        <MyProjects />
    </Route>

    <Route route="~/issues/create" url-bind="url">
        <CreateProject />
    </Route>
</cx>;