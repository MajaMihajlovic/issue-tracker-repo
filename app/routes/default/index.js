
import { LabelsLeftLayout } from "cx/ui";
import {
  Button, Checkbox, Link, TextField, ValidationGroup, enableTooltips, FlexRow,
  Repeater,
  DropZone,
  DragSource,
  ContentResolver,
  Restate,
  Section,
  LookupField
} from "cx/widgets";
import Controller from "./Controller";
import "./index.scss";
import { swapElements } from "./swapElements";
import IssuesByTypeGrid from "../../widgets/issues-by-type-grid";
import IssuesByTypeChart from "../../widgets/issues-by-type-chart";
import BurndownChart from "../../widgets/burndown-chart";
import TroughputChart from "../../widgets/throughput-chart";

enableTooltips();

export default (
  <cx>
    <div class="page sign-i">
      <main visible-expr="!{user}" layout={LabelsLeftLayout}>
        <img class="logo" src="~/app/assets/img/logo.png" alt="Issue Tracker" />
        <form class="login-form" onSubmit="login" controller={Controller}>
          <ValidationGroup
            layout={LabelsLeftLayout}
            invalid-bind="login.invalid"
          >
            <TextField
              value-bind="login.username"
              label="Username"
              required={true}
            />
            <TextField
              value-bind="login.password"
              label="Password"
              inputType="password"
              required={true}
            />
            <Checkbox value-bind="login.rememberMe">Remember me</Checkbox>
            <div>
              <Button class="login-btn" mod="primary" onClick="signIn">
                Register
              </Button>
              <Button
                class="login-btn"
                mod="primary"
                disabled-bind="login.invalid"
                submit
              >
                Login
              </Button>
            </div>
          </ValidationGroup>
        </form >
      </main >
    </div>
    <main visible-expr="!!{user}"  >
      <div putInto="header">
        <ul class="csb-breadcrumb">
          <li class="cse-breadcrumb-item">
            <Link href="~/">Reports</Link>
          </li>
        </ul>
      </div>
      <div class="reportCard">
        <Section style="background: ghostwhite;">
          <FlexRow spacing>
            <h3 style="margin-left:15px">Reports for specific project</h3>
            <div style=" position: absolute; right: 10px; margin-top:10px;">
              <LookupField
                label="Select project:"
                value-bind="$report.selectedProjectId"
                text-bind="$report.selectedProjectName"
                options-bind="$report.projects"
                style="width:300px"
              /></div>
          </FlexRow>
        </Section>
        <FlexRow wrap spacing padding controller={Controller} style="background: ghostwhite;">
          <Repeater records-bind="widgets" recordAlias="$widget" >
            <DropZone
              mod="widget"
              onDrop={(e, { store }) => {
                let targetIndex = store.get("$index");
                let sourceIndex = e.source.store.get("$index");
                store.update("widgets", widgets =>
                  swapElements(widgets, sourceIndex, targetIndex)
                );
              }}
            >
              <DragSource mod="widget">
                <Restate
                  data={{
                    type: { bind: "$widget.type" }
                  }}
                >
                  <ContentResolver
                    params-bind="type"
                    onResolve={type => {
                      switch (type) {
                        case "issues-by-type-chart":
                          return IssuesByTypeChart;

                        case "issues-by-type-grid":
                          return IssuesByTypeGrid;

                        case "burndown-chart":
                          return BurndownChart;

                        default:
                          return null;
                      }
                    }}
                  />
                </Restate>
              </DragSource>
            </DropZone>
          </Repeater>
        </FlexRow>
      </div>
    </main>

  </cx >
);
