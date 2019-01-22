import {Button, Toast} from "cx/widgets";
import {Store} from "cx/data";

export function toast(options) {
    if (typeof options == "string")
        options = {
            message: options
        };

    Toast
        .create({
            timeout: 10000,
            ...options,
        })
        .open();
}

export function showErrorToast(err, title = 'Error') {
    let store = new Store();
    let dismiss = Toast.create({
        items: <cx>
            <div>
                <div class="flex-row align-center">
                    <h4 style="flex: 1">{title}</h4>
                    <Button
                        visible-expr="{timer} != 'off'"
                        mod="hollow" text-tpl="{count}" onClick={() => {
                        store.set("timer", "off");
                    }}/>
                    <Button mod={["hollow", "small"]} dismiss icon="close" />
                </div>
                <p>{String(err.message || err)}</p>
                <div visible={!!err.reason}>
                    <div class="label">Reason:</div>
                    <p text={err.reason}/>
                </div>

                <div visible-expr="!{showMore}">
                    <Button
                        visible={!!err.details || !!err.advice} text="Show Details"
                        onClick={(e, {store}) => {
                            store.toggle("showMore");
                            store.set("timer", "off");
                        }}
                        mod="hollow"
                    />
                </div>
                <div visible-expr="!!{showMore}">
                    <div visible={!!err.details}>
                        <div class="label">Details:</div>
                        <p text={err.details}/>
                    </div>

                    <div visible={!!err.advice}>
                        <div class="label">Advice:</div>
                        <p text={err.advice}/>
                    </div>
                </div>
            </div>
        </cx>,
        mod: 'error2'
    }).open(store);

    let count = 10;

    let timer = setInterval(() => {
        if (--count == 0) {
            clearInterval(timer);
            if (store.get('timer') != 'off')
                dismiss();
        }
        else
            store.set('count', count);
    }, 1000)
}