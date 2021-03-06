import { Widget, LabelsLeftLayout, LabelsTopLayout } from 'cx/ui';
import { Window, LabeledContainer, Button, UploadButton, TextField, ValidationGroup } from 'cx/widgets';
import { toast, showErrorToast } from "../toasts";
import { PUT } from "../../api/methods";
import { emailValidationRegex } from "../../util/validation"
import Controller from "./Controller";
import { userInfo } from 'os';

const SettingsWindow = <cx>
  <Window title="" modal center>
    <div putInto="header">
      Edit Profile
        </div>
    <div style="width:430px;height:260px;padding: 10px" layout={LabelsLeftLayout} controller={Controller}>
      <ValidationGroup
        layout={LabelsLeftLayout}
        invalid-bind="user.invalid"
      >
        <div class="row">
          <section>
            <div layout={LabelsTopLayout} class="form-group">
              <TextField
                value-bind="user.username"
                label="Username"
                required
              />
            </div>     <div layout={LabelsTopLayout} class="form-group">
              <TextField
                value-bind="user.fullName"
                label="Full name"
                required={true}
              /></div>     <div layout={LabelsTopLayout} class="form-group">
              <TextField
                value-bind="user.email"
                label="Email"
                validationRegExp={emailValidationRegex}
                validationErrorText="Please insert a valid email address."
                required={true}
              /></div></section>
          <section>
            <LabeledContainer label="" trimWhitespace={false}>
              <div layout={LabelsTopLayout} class="form-group">

                <div style="padding:5px 5px 5px 5px;">
                  <img
                    style=" border-radius:50px; height:100px; width:100px; position:relative;"
                    src-tpl={"data:image/jpg;base64, {user.photo}"}
                    alt="Person"
                  />
                </div></div>
              <div layout={LabelsTopLayout} class="form-group" >
                <UploadButton
                  value-bind="user.photo"
                  url="#"
                  style="position: center; align: center"
                  onUploadStarting="onUploadStarting"
                  onUploadComplete="onUploadComplete"
                  onUploadError="onUploadError"
                  mode-bind="mode"
                  style="width:72px"
                >
                  Browse
              </UploadButton></div>
            </LabeledContainer>
          </section></div>
      </ValidationGroup>
    </div>
    <div putInto="footer" style="text-align: right">
      <Button style="margin:5px 15px 0px 15px" onClick={(e, instance) => { instance.parentOptions.dismiss() }}>Cancel</Button>
      <Button onClick={async (e, instance) => {
        try {
          var fileParsed = JSON.stringify(instance.store.get('user.photo')).replace(/^"(.+(?="$))"$/, '$1');
          var user = instance.store.get('user');
          user.photo = fileParsed;
          var result = await PUT("user/" + instance.store.get('user.id'), user, null);
          if (result != "Success") {
            showErrorToast(result);
          }
          else {
            instance.parentOptions.dismiss();
          }
        } catch (e) {
          showErrorToast(e);
        }
      }} style="magin-left:15px">Save</Button>

    </div>
  </Window>
</cx >;

export function openSettingsWindow(store) {
  var win = Widget.create(SettingsWindow);
  win.open(store);
}
