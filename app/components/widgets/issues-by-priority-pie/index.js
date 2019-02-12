import DashboardWidget from "../DashboardWidget";
import { Legend, ColorMap, PieChart, PieSlice, LegendEntry } from "cx/charts";
import { Svg, Line, Rectangle, Text } from "cx/svg";
import { Repeater, KeySelection } from "cx/ui";
import Controller from "./Controller";
import { enableTooltips } from "cx/widgets";

enableTooltips();

export default (
    <cx>
        <div controller={Controller} style='align-self: center'>
            <DashboardWidget title="Issues by Priority" style='align-self: center' bodyStyle="padding: 5px; display: flex; align-self:center">
                <Legend />
                <Svg style="width:400px; height:300px;">
                    <ColorMap />
                    <PieChart angle={360}>
                        <Repeater records-bind="points">
                            <PieSlice
                                value-bind='$record.value'
                                active-bind='$record.active'
                                colorMap="pie"
                                r-expr='80'
                                r0-expr='20'
                                offset={5}
                                tooltip={{
                                    text: {
                                        tpl: "{$record.name} : {$record.value:n;2}"
                                    },
                                    trackMouse: true
                                }}
                                innerPointRadius={80}
                                outerPointRadius={90}
                                name-tpl="{$record.name}"
                                selection={{
                                    type: KeySelection,
                                    bind: '$page.selection',
                                    records: { bind: 'points' },
                                    record: { bind: '$record' },
                                    index: { bind: '$index' },
                                    keyField: 'id'
                                }}
                            >
                            </PieSlice>
                        </Repeater>
                    </PieChart>
                </Svg>

            </DashboardWidget>
        </div>
    </cx >);