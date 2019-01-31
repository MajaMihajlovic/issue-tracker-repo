import DashboardWidget from "../DashboardWidget";

import { Svg } from "cx/svg";
import {
  Chart,
  LineGraph,
  Gridlines,
  TimeAxis,
  NumericAxis,
  Legend,
  MouseTracker,
  MarkerLine,
  Marker,
  SnapPointFinder,
  ValueAtFinder,
  LegendEntry
} from "cx/charts";
import {
  Repeater,
  Submenu,
  Menu,
  Icon,
  MenuItem,
  enableTooltips,
  Grid
} from "cx/widgets";

import Controller from "./Controller";

enableTooltips();

export default (
  <cx>
    <DashboardWidget
      title="Throughput"
      bodyStyle="padding: 5px; display: flex; flex-direction: column; height: auto"
    >
      <Menu horizontal putInto="toolbar">
        <Submenu>
          <a>
            <Icon name="cog" />
          </a>
          <Menu putInto="dropdown">
            <MenuItem checked-bind="normalized" autoClose>
              Normalize
            </MenuItem>
          </Menu>
        </Submenu>
      </Menu>
      <Legend.Scope controller={Controller}>
        <Svg style="flex: 1">
          <Chart
            margin="25 5 10 35"
            axes={{
              x: {
                type: TimeAxis,
                snapToTicks: false,
                secondary: true
              },
              y: {
                type: NumericAxis,
                vertical: true,
                snapToTicks: 1,
                normalized: { bind: "normalized" },
                format: { expr: "{normalized} ? 'p;0' : 'n;0'" }
              }
            }}
          >
            <Gridlines />

            <MouseTracker x-bind="cursor">
              <MarkerLine x-bind="probe" visible-expr="{probe} != null" />
              <SnapPointFinder
                cursorX-bind="cursor"
                snapX-bind="probe"
                maxDistance={Infinity}
              >
                <Repeater records-bind="series">
                  <ValueAtFinder
                    data-bind="probe"
                    value-bind="$record.trackedValue"
                  >
                    <LineGraph
                      data-bind="$record.data"
                      name-bind="$record.category"
                      colorIndex-bind="$record.color"
                      xField="date"
                      yField="count"
                      stacked
                      area
                      legendShape="circle"
                    />
                  </ValueAtFinder>
                </Repeater>
                <Marker
                  x-bind="probe"
                  visible-expr="{probe} != null"
                  style="visibility: hidden"
                  tooltip={{
                    alwaysVisible: true,
                    destroyDelay: 5,
                    createDelay: 5,
                    items: (
                      <cx>
                        <p>
                          <strong text-tpl="{probe:date}" />
                        </p>
                        <Grid
                          records-bind="series"
                          columns={[
                            {
                              field: "name",
                              items: (
                                <cx>
                                  <LegendEntry
                                    text-bind="$record.category"
                                    colorIndex-bind="$record.color"
                                    shape="circle"
                                    size={10}
                                  />
                                </cx>
                              )
                            },
                            { field: "trackedValue", format: "n;0" }
                          ]}
                        />
                      </cx>
                    ),
                    trackMouseY: true,
                    globalMouseTracking: true
                  }}
                />
              </SnapPointFinder>
            </MouseTracker>
          </Chart>
        </Svg>
        <Legend mod="compact" shapeSize={12} />
      </Legend.Scope>
    </DashboardWidget>
  </cx >
);
