
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
import issuesByTypeChart from "./../../components/widgets/issues-by-type-chart";
import IssuesByPriorityPie from "./../../components/widgets/issues-by-priority-pie";
import issuesByStateBarChart from "./../../components/widgets/issues-by-state-bar";
import { BarChartComponent } from "../../components/widgets/issues-by-state-bar/BarChartComponent";
import { GET } from "../../api/methods";
import issuesPerAssignee from "../../components/widgets/issues-per-assignee";

enableTooltips();

export default (
    <cx>
        <main visible-expr="!{user}" class="sign-in">
            <div layout={LabelsLeftLayout}>
                <img class="logo" src="~/app/assets/img/logo.png" alt="Issue Tracker" />
                <form class="login-form" onSubmit="login" controller={Controller} >
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
                                submit>
                                Login
                            </Button>
                        </div>
                    </ValidationGroup>
                </form >
            </div>
        </main >


        <main visible-expr="!!{user}" >
            <div putInto="header">
                <ul class="csb-breadcrumb">
                    <li class="cse-breadcrumb-item">
                        <Link href="~/">Reports</Link>
                    </li>
                </ul>
            </div>
            <div class="reportCard">
                <Section>
                    <FlexRow spacing>
                        <h3 style="margin-left:15px;">Reports for specific project</h3>
                        <div style=" position: absolute; right: 10px; margin-top:0px;">
                            <LookupField
                                label="Select project:"
                                value-bind="$report.selectedProjectId"
                                text-bind="$report.selectedProjectName"
                                options-bind="$report.projects"
                                style="width:300px;"
                            />
                        </div>
                    </FlexRow>
                </Section>
                <FlexRow wrap spacing padding controller={Controller}>
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
                                        type: { bind: "$widget.type" },
                                        selectedProjectId: { bind: "$report.selectedProjectId" }
                                    }}
                                >
                                    <ContentResolver
                                        params-bind="type"
                                        onResolve={type => {
                                            switch (type) {
                                                case "issues-by-type-chart":
                                                    return issuesByTypeChart;
                                                case "issues-by-state-bar":
                                                    return issuesByStateBarChart;

                                                case "issues-per-assignee":
                                                    return issuesPerAssignee;
                                                /* return <cx>
                                                     <BarChartComponent
                                                         data-bind="chartData"
                                                         title="Title"
                                                     />
                                                 </cx>*/
                                                case "issues-by-priority-pie":
                                                    return IssuesByPriorityPie;
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
