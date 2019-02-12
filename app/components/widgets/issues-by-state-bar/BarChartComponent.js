import DashboardWidget from "../DashboardWidget";
import { Svg } from "cx/svg";
import {
    Chart,
    Gridlines,
    CategoryAxis,
    NumericAxis,
    BarGraph
} from "cx/charts";
import { KeySelection, createFunctionalComponent } from "cx/ui";


export const BarChartComponent = createFunctionalComponent((data, title) => {
    return <cx>
        <DashboardWidget
            title={title}
            bodyStyle="padding: 5px; display: flex;"
        >
            <Svg style="width:400px; height:300px;">
                <Chart offset="20 -20 -30 150" axes={{
                    x: { type: NumericAxis, snapToTicks: 1 },
                    y: { type: CategoryAxis, vertical: true }
                }}>
                    <Gridlines />
                    <BarGraph data={data}
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
    </cx>
});
