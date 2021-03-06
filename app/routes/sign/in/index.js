import { MessageLayout } from "app/layouts/MessageLayout";
import { LabelsLeftLayout } from "cx/ui";

import {
  Button,
  LabeledContainer,
  TextField,
  UploadButton,
  ValidationGroup, enableMsgBoxAlerts, enableTooltips
} from "cx/widgets";
import Controller from "./Controller";
import { emailValidationRegex, passwordValidationRegex } from "../../../util/validation";

enableTooltips();

export default (
  <cx>
    <div class="page sign-in">
      <main visible-expr="!{user}" outerLayout={MessageLayout}>
        <img class="sign-in-logo" src="~/app/assets/img/logo.png" alt="Issue Tracker" />
        <form class="sign-in-form" onSubmit="signIn" controller={Controller}>
          <ValidationGroup
            layout={LabelsLeftLayout}
            invalid-bind="sign_in.invalid"
          >
            <TextField
              value-bind="sign_in.username"
              label="Username"
              required
            />

            <TextField
              value-bind="sign_in.password"
              label="Password"
              inputType="password"
              required
              //</form>/validationRegExp={passwordValidationRegex}
              validationErrorText="Password must include at least 1 lowercase, 1 uppercase, 1 numeric, and one special character."
              minLength={8}
              minLengthValidationErrorText="Manimum allowed length is 8."
              maxLength={16}
              maxLengthValidationErrorText="Maximum allowed length is 16."
            />
            <TextField
              value-bind="sign_in.confirmPassword"
              label="Confirm password"
              inputType="password"
              required
              //</main>validationRegExp={passwordValidationRegex}
              validationErrorText="Password must include at least 1 lowercase, 1 uppercase, 1 numeric, and one special character."
              onValidate={(v, instance) => {
                if (v != instance.store.get('sign_in.password'))
                  return "Passwords must be the same.";
              }}
            />
            <TextField
              value-bind="sign_in.fullname"
              label="Full name"
              required={true}
            />
            <TextField
              value-bind="sign_in.email"
              label="Email"
              required={true}
              validationRegExp={emailValidationRegex}
              validationErrorText="Please insert a valid email address."

            />
            <LabeledContainer label="Photo" trimWhitespace={false}>
              <div style="padding:5px 5px 5px 5px;">
                <img
                  style=" border-radius:50px; height:100px; width:100px; position:relative;"
                  src-expr="{sign_in.pictureUrl} || '~/app/assets/img/user_placeholder.png'"
                  alt="Person"
                />
              </div>
              <UploadButton
                value-bind="sign_in.pictureUrl"
                url="#"
                onUploadStarting="onUploadStarting"
                onUploadComplete="onUploadComplete"
                onUploadError="onUploadError"
                mode-bind="mode"
                style="width:72px; margin-left:10px"
              >
                Browse
              </UploadButton>
            </LabeledContainer>
            <div style="margin-left:10px">
              <Button
                mod="primary"
                style="padding: 5px 10px; margin-right: 10px; width:72px"
                onClick="cancel"
              >
                Back
              </Button>
              <Button
                mod="primary"
                style="padding: 5px 10px; margin: 10px;"
                disabled-expr="{sign_in.invalid} || {fileLoading}"
                onClick="signIn"
                onEnter="signIn"
              >
                Register
              </Button>
            </div>
          </ValidationGroup>
        </form>
      </main>
    </div>
  </cx>
);
