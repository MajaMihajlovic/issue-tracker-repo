import { Route } from 'cx/widgets';

import AssignedToMe from './assignedToMe';
import AddIssue from './addIssue';

export default <cx>
    <Route route="~/issues/" url-bind="url">
        <AssignedToMe />
    </Route>

    <Route route="~/issues/create" url-bind="url">
        <AddIssue />
    </Route>
</cx>;