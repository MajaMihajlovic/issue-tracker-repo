import DashboardWidget from "../DashboardWidget";
import { Svg } from "cx/svg";
import {
  Chart,
  Gridlines,
  CategoryAxis,
  NumericAxis,
  BarGraph
} from "cx/charts";
import Controller from "./Controller";
import { KeySelection } from "cx/ui";


export default (
  <cx>
    <div controller={Controller}>
      <DashboardWidget
        title="Open Issues by Status"
        bodyStyle="padding: 5px; display: flex;"
      >
        <Svg style="width:400px; height:300px;">
          <Chart offset="20 -20 -30 150" axes={{
            x: { type: NumericAxis, snapToTicks: 1 },
            y: { type: CategoryAxis, vertical: true }
          }}>
            <Gridlines />
            <BarGraph data-bind="barChartData"
              colorIndex={0}
              size={0.5}
              xField="count"
              yField="type"
              selection={{
                type: KeySelection,
                bind: '$page.selected.type',
                keyField: 'type'
              }}
            />
          </Chart>
        </Svg>
      </DashboardWidget>
    </div>
  </cx>
);
