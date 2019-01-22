import { MessageLayout } from "app/layouts/MessageLayout";
import { LabelsLeftLayout } from "cx/ui";
import {
  Button,
  LabeledContainer,
  TextField,
  UploadButton,
  ValidationGroup
} from "cx/widgets";
import Controller from "./Controller";

export default (
  <cx>
    <div class="page sign-in">
      <main visible-expr="!{user}" outerLayout={MessageLayout}>
        <img class="logo" src="~/app/assets/img/logo.png" alt="Issue Tracker" />
        <form class="sign-in-form" onSubmit="signIn" controller={Controller}>
          <ValidationGroup
            layout={LabelsLeftLayout}
            invalid-bind="sign_in2.invalid"
          >
            <TextField
              value-bind="sign_in2.username"
              label="Username"
              // requiredText="Please enter username."
              required
            />
            <TextField label="Password" inputType="password" required={true} />
            <TextField
              value-bind="sign_in.password"
              label="Repeated Password"
              inputType="password"
              required={true}
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
            />
            <LabeledContainer label="Photo" trimWhitespace={false}>
              <div style="padding:5px 5px 5px 5px;">
                <img
                  style=" border-radius:50px;
    height:100px;
    width:100px;
    position:relative;"
                  src:expr="{sign_in.pictureUrl} || '~/app/assets/img/user_placeholder.png'"
                  // src="~/app/assets/img/user_placeholder.png"
                  // src="blob:http://localhost:8088/75f33dcd-a804-4afb-991c-57aae4da8b9a"
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
                icon="upload"
              >
                Upload
              </UploadButton>
            </LabeledContainer>
            <div>
              <Button
                mod="primary"
                disabled-bind="sign_in2.invalid"
                submit
                placeholder-bind="sign_in2.invalid"
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
