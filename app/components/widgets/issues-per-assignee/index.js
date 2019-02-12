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
                title="Issues per Assignee"
                bodyStyle="padding: 5px; display: flex;"
            >
                <Svg style="width: 1570px; height:300px;">
                    <Chart offset="20 -20 -30 150" axes={{
                        x: {
                            type: NumericAxis,
                            snapToTicks: 2,
                            format: "n;0;2"
                        },
                        y: { type: CategoryAxis, vertical: true }
                    }}>
                        <Gridlines />
                        <BarGraph data-bind="issuePerAssignee"
                            colorIndex={5}
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
    </cx >
);
