import DashboardWidget from "../DashboardWidget";

import { Grid } from "cx/widgets";

export default (
  <cx>
    <DashboardWidget title="Open Issues (by Type)" bodyStyle="padding: 5px">
      <Grid
        mod="widget"
        columns={[
          {
            field: "type",
            header: "Type"
          },
          {
            field: "count",
            header: "Count",
            align: "right"
          }
        ]}
        records={[
          { type: "Bug", count: 2 },
          { type: "Feature", count: 33 },
          { type: "Documentation Issue", count: 18 },
          { type: "Usability Issue", count: 11 }
        ]}
      />
    </DashboardWidget>
  </cx>
);
