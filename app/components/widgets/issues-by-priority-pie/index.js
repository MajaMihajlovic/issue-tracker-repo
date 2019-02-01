import DashboardWidget from "../DashboardWidget";
import { Legend, ColorMap, PieChart, PieSlice, LegendEntry } from "cx/charts";
import { Svg, Line, Rectangle } from "cx/svg";
import { Repeater, Text, KeySelection } from "cx/ui";
import Controller from "./Controller";


export default (
    <cx>
        <div controller={Controller}>
            <DashboardWidget title="Issues by Priority" bodyStyle="padding: 5px; display: flex;">
                <Legend />
                <Svg style="width:600px; height:350px;">
                    <ColorMap />
                    <PieChart angle={360}>
                        <Repeater records-bind="points">
                            <PieSlice value-bind='$record.value'
                                active-bind='$record.active'
                                colorMap="pie"
                                r-expr='80'
                                r0-expr='20'
                                offset={5}
                                tooltip={{
                                    text: {
                                        tpl: "{$record.name} {$index}: {$record.value:n;2}"
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
                                }}>


                            </PieSlice>
                        </Repeater>
                    </PieChart>
                </Svg>

            </DashboardWidget>
        </div>
    </cx >);