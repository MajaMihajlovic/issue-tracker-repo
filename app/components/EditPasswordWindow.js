import { Widget, LabelsLeftLayout, LabelsTopLayout } from 'cx/ui';
import { Window, LabeledContainer, Button, UploadButton, TextField, ValidationGroup } from 'cx/widgets';
import { toast, showErrorToast } from "../components/toasts";
import { PUT, POST } from "../api/methods";
import { emailValidationRegex } from "../util/validation"

const ChangePasswordWindow = <cx>
  <Window title="" modal center>
    <div putInto="header">
      Change Password
        </div>
    <div style="width:350px;height:195px;padding: 20px" layout={LabelsLeftLayout}>
      <ValidationGroup
        layout={LabelsLeftLayout}
        invalid-bind="changePasword.invalid"
      >
        <TextField
          value-bind="changePassword.old_password"
          label="Old Password"
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
          value-bind="changePassword.new_password"
          label="New Password"
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
          value-bind="changePassword.confirm_password"
          label="Confirm password"
          inputType="password"
          style="width: 100%"
          required
          //</main>validationRegExp={passwordValidationRegex}
          validationErrorText="Password must include at least 1 lowercase, 1 uppercase, 1 numeric, and one special character."
          onValidate={v => {
            // if (v != store.get('sign_in.password'))//kako dobiti store
            // return "Passwords must be the same.";
          }}
        />
      </ValidationGroup>
    </div>
    <div putInto="footer" style="text-align: right">
      <Button style="margin:5px 15px 0px 15px" onClick={(e, instance) => { instance.parentOptions.dismiss() }}>Cancel</Button>
      <Button onClick={async (e, instance) => {
        console.log(store.get('user.id'));

        try {
          var passwordInformation = {
            id: instance.store.get('user.id'),
            oldPassword: instance.store.get('changePassword.old_password'),
            newPassword: instance.store.get('changePassword.new_password'),
            repeatedNewPassword: instance.store.get('changePassword.confirm_password'),
          }
          var result = await POST("user/updatePassword", passwordInformation, null);
          if (result != "Success") {
            showErrorToast(result);
          }
          else {
            instance.dismiss();
            toast("Password has been successfully updated.")
            instance.store.remove('changePassword');
          }
        } catch (e) {
          showErrorToast(e);
        }
      }} style="magin-left:15px">Save</Button>

    </div>
  </Window>
</cx>;

export function openChangePasswordWindow(store) {
  //dobaviti korisnika
  console.log(store.get('user'));
  var win = Widget.create(ChangePasswordWindow);
  win.open(store);
}
