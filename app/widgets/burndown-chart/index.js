import DashboardWidget from "../DashboardWidget";

import { Svg } from "cx/svg";
import { Chart, LineGraph, Gridlines, TimeAxis, NumericAxis } from "cx/charts";

const ideal = [];
const actual = [];
const tasks = 30;

const day = 24 * 60 * 60 * 1000;

let startDate = Date.now() - 30 * day;
let remaining = tasks;

for (let i = 0; i < 30; i++) {
  ideal.push({
    date: startDate + i * day,
    tasks: (30 - i) / 30 * tasks
  });

  actual.push({
    date: startDate + i * day,
    tasks: remaining
  });

  remaining -= 6 * (Math.random() - 0.3) * tasks / 30;
  if (remaining < 0) remaining = 0;
}

export default (
  <cx>
    <DashboardWidget title="Burndown" bodyStyle="padding: 5px; display: flex;">
      <Svg style="flex: 1; height: auto">
        <Chart
          margin="10 10 25 30"
          axes={{
            x: {
              type: TimeAxis,
              snapToTicks: false
            },
            y: {
              type: NumericAxis,
              vertical: true,
              snapToTicks: 0
            }
          }}
        >
          <Gridlines />
          <LineGraph data={ideal} xField="date" yField="tasks" />

          <LineGraph
            data={actual}
            colorIndex={12}
            xField="date"
            yField="tasks"
          />
        </Chart>
      </Svg>
    </DashboardWidget>
  </cx>
);
