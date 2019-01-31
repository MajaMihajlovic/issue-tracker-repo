import DashboardWidget from "../DashboardWidget";
import { Svg, Text } from "cx/svg";
import { PieChart, PieSlice, Legend } from "cx/charts";
import { Repeater } from "cx/widgets";

const data = [
  {
    text: "Open",
    count: 10,
    color: 12
  },
  {
    text: "Fixed",
    count: 25,
    color: 7
  },
  {
    text: "Verified",
    count: 30,
    color: 10
  }
];

export default (
  <cx>
    <DashboardWidget
      title="Sprint Completion"
      bodyStyle="padding: 5px; display: flex; align-items: center"
    >
      <Legend.Scope>
        <Svg style="flex: 1; height: auto; align-self: stretch;">
          <PieChart>
            <Repeater records={data}>
              <PieSlice
                value-bind="$record.count"
                colorIndex-bind="$record.color"
                name-bind="$record.text"
                r={80}
                r0={60}
                legendShape="circle"
                tooltip={{
                  text: {
                    tpl: "{$record.count} {$record.text:lowercase} issues"
                  },
                  trackMouse: true
                }}
              />
            </Repeater>
          </PieChart>
          <Text style="font-size: 25px" dy="0.4em" ta="middle">
            84.6%
          </Text>
        </Svg>
        <Legend vertical style="margin-right: 20px" shapeSize={12} />
      </Legend.Scope>
    </DashboardWidget>
  </cx>
);
