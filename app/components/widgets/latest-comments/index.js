import DashboardWidget from "../DashboardWidget";

import { List } from "cx/widgets";
import { KeySelection } from "cx/ui";

export default (
  <cx>
    <DashboardWidget title="Latest Comments" bodyStyle="display: flex">
      <List
        style="flex: 1"
        records={[
          {
            id: 1,
            displayName: "Jack",
            comment: `I have a grid with about 2500 records. I'm using infinite scrolling
            and fetching 100 records at a time.`,
            when: "4 hrs ago"
          },
          {
            id: 2,
            displayName: "John",
            comment: `A potential solution would be to reuse the list obtained in 
            the first phase and process it in inverse order.`,
            when: "12 hours ago"
          },
          {
            id: 3,
            displayName: "Hans",
            comment: `The Restate widget would allow that parts of the widget tree have their own state.`,
            when: "2 days ago"
          }
        ]}
      >
        <div class="comment">
          <i class="comment-icon fas fa-user" />
          <strong class="comment-user" text-bind="$record.displayName" />
          <span class="comment-time" text-bind="$record.when" />
          <p class="comment-text" text-bind="$record.comment" />
        </div>
      </List>
    </DashboardWidget>
  </cx>
);
