import DashboardWidget from "../DashboardWidget";
import { Svg } from "cx/svg";
import {
  Chart,
  ColumnGraph,
  Gridlines,
  CategoryAxis,
  NumericAxis
} from "cx/charts";
import Controller from "./Controller";


export default (
  <cx>
    <div controller={Controller}>
      <DashboardWidget
        title="Open Issues by Type"
        bodyStyle="padding: 5px; display: flex;"
      >
        <Svg style="flex: 1; width: 400px; height: 300px;">
          <Chart
            margin="10 10 40 30"
            axes={{
              x: {
                type: CategoryAxis,
                snapToTicks: 0,
                labelWrap: true,
                style: "font-size: 13px"
              },
              y: {
                type: NumericAxis,
                vertical: true,
                snapToTicks: 1
              }
            }}
          >
            <Gridlines />
            <ColumnGraph
              data-bind="chartData"
              colorIndex={10} //ovdje napraviti expr i razlicite boje
              xField="type"
              yField="count"
              size={0.7}
            />
          </Chart>
        </Svg>
      </DashboardWidget>
    </div>
  </cx>
);
