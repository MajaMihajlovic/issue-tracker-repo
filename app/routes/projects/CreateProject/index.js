import {
    HtmlElement,
    Section,
    NumberField,
    Button,
    DateField,
    LookupField,
    TextField,
    PureContainer,
    ValidationGroup,
    Icon,
    FlexRow,
    Repeater,
    FlexCol, Link
} from 'cx/widgets';
import {bind, expr, computable, tpl, LabelsTopLayout, FirstVisibleChildLayout} from 'cx/ui';

import Controller from './Controller';
import "./index.scss"
export default <cx>
    <main controller={Controller} >

<div putInto="header">
          <ul class="csb-breadcrumb">
            <li class="cse-breadcrumb-item">
              <Link href="~/project">Projects</Link>
            </li>
          </ul>
        </div>
<FlexRow> 
<figure>
                            <img src:expr="{new_project.photoUrl} || 'http://placehold.it/200x200'" alt="Photo"/>
                        </figure>
            <FlexCol style="width:600px">
            <TextField
                    value={bind('$new_project.name')}
                    label="Name"
                    style="width: 100%; max-width: 950px"
                    asterix
                />
                <TextField
                    value={bind('$new_project.description')}
                    label="Description"
                    style="width: 100%; max-width: 750px"
                />
                  <TextField
                    value={bind('$new_project.photoUrl')}
                    label="Photo URL"
                    style="width: 100%; max-width: 750px"
                />

                <br/>
                <FlexRow spacing>
                    <Button
                        onClick="back"
                        text="Back"
                    />

                    <Button
                        mod="primary"
                        onClick="save"
                        text="Save"
                    />
                </FlexRow>

            </FlexCol>
            </FlexRow>
</main>
</cx>