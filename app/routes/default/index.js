
import { LabelsLeftLayout } from "cx/ui";
import { Button, Checkbox, Link, TextField, ValidationGroup, enableMsgBoxAlerts, enableTooltips } from "cx/widgets";
import Controller from "./Controller";
import "./index.scss";

enableTooltips();

export default (
  <cx>
    <div class="page sign-in">
      <main visible:expr="!{user}" layout={LabelsLeftLayout}>
        <img class="logo" src="~/app/assets/img/logo.png" alt="Issue Tracker" />
        <form class="login-form" onSubmit="login" controller={Controller}>
          <ValidationGroup
            layout={LabelsLeftLayout}
            invalid:bind="login.invalid"
          >
            <TextField
              value:bind="login.username"
              label="Username"
              required={true}
            />
            <TextField
              value:bind="login.password"
              label="Password"
              inputType="password"
              required={true}
            />
            <Checkbox value:bind="login.rememberMe">Remember me</Checkbox>
            <div>
              <Button class="login-btn" mod="primary" onClick="signIn">
                Register
              </Button>
              <Button
                class="login-btn"
                mod="primary"
                disabled:bind="login.invalid"
                onClick="login"
                default
              >
                Login
              </Button>
            </div>
          </ValidationGroup>
        </form >
      </main >

      <main visible:expr="!!{user}" style="padding: 30px">
        <div putInto="header">
          <ul class="csb-breadcrumb">
            <li class="cse-breadcrumb-item">
              <Link href="~/">Home</Link>
            </li>
          </ul>
        </div>
      </main>
    </div >
  </cx >
);
