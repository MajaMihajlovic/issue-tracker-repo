import { LabelsLeftLayout, Repeater, Widget, FirstVisibleChildLayout } from 'cx/ui';
import { Button, DragHandle, DragSource, DropZone, FlexCol, FlexRow, Text, TextArea, TextField, ValidationGroup, Window } from 'cx/widgets';
import getController from "./Controller";

export async function openProjectWindow(store) {
    return new Promise(async (resolve) => {
        let window = <cx><Window
            title="Add Project"
            modal
            center
            style="width:950px;height:750px;"
            bodyStyle="display: flex; flex-direction: column; padding: 20px"
            controller={getController(resolve)}
        >
            <FirstVisibleChildLayout>
                <FlexRow>
                    <figure style="width:200px; heigth:200px;">
                        <img style="width:200px; heigth:200px; object-fit: cover" src-expr="{new_project.photoUrl} || 'http://placehold.it/200x200'" alt="Photo" />
                    </figure>
                    <FlexRow style="padding-top:10px; flex: 1">
                        <ValidationGroup layout={LabelsLeftLayout} invalid-bind="new_project.invalid">
                            <form>
                                <TextField
                                    value-bind="new_project.name"
                                    label="Name"
                                    style="width: 100%;"
                                    asterisk
                                    required
                                />
                                <TextArea
                                    value-bind="new_project.description"
                                    label="Description"
                                    style="width: 100%;"
                                    asterisk
                                    required
                                />
                                <TextField
                                    value-bind="new_project.photoUrl"
                                    label="Photo URL"
                                    style="width: 100%;"
                                />
                                <FlexRow style="margin-top: 20px;">
                                    <Repeater
                                        records-bind="cards"
                                        recordName="$card"
                                        indexName="$cardIndex"
                                    >
                                        <FlexCol class="card">
                                            <DragSource
                                                data={{ index: { bind: "$cardIndex" }, type: "card" }}
                                                hideOnDrag
                                                handled
                                            >
                                                <DragHandle style="cursor:move;padding:1px">
                                                    <h4 ws>
                                                        ☰
                    <Text bind="$card.name" />
                                                    </h4>
                                                </DragHandle>
                                                <FlexCol style="overflow: auto; height: 310px;">
                                                    <DropZone
                                                        mod="block"
                                                        style="display: block"
                                                        onDropTest={e => e.source.data.type == "item"}
                                                        onDrop={(e, { store }) => {
                                                            if (e.source.data.cardIndex == store.get("$cardIndex"))
                                                                store.update(
                                                                    "$card.items",
                                                                    moveElement,
                                                                    e.source.data.index,
                                                                    0
                                                                );
                                                            else {
                                                                let el = e.source.store.get("$record");
                                                                e.source.store.update("$card.items", items =>
                                                                    items.filter(item => item != el)
                                                                );
                                                                store.update("$card.items", insertElement, 0, el);
                                                            }
                                                        }}
                                                        matchHeight
                                                        matchMargin
                                                        inflate={30}
                                                    />
                                                    <Repeater records-bind="$card.items" keyField="id">
                                                        <DragSource
                                                            class="item"
                                                            data={{
                                                                index: { bind: "$index" },
                                                                cardIndex: { bind: "$cardIndex" },
                                                                type: "item"
                                                            }}
                                                            hideOnDrag
                                                        >
                                                            <div text-bind="$record.text" style="padding:5px" />
                                                        </DragSource>
                                                        <DropZone
                                                            mod="block"
                                                            style="display: block"
                                                            onDropTest={e => e.source.data.type == "item"}
                                                            onDrop={(e, { store }) => {
                                                                if (e.source.data.cardIndex == store.get("$cardIndex"))
                                                                    store.update(
                                                                        "$card.items",
                                                                        moveElement,
                                                                        e.source.data.index,
                                                                        store.get("$index") + 1
                                                                    );
                                                                else {
                                                                    let el = e.source.store.get("$record");
                                                                    e.source.store.update("$card.items", items =>
                                                                        items.filter(item => item != el)
                                                                    );
                                                                    store.update(
                                                                        "$card.items",
                                                                        insertElement,
                                                                        store.get("$index") + 1,
                                                                        el
                                                                    );
                                                                }
                                                            }}
                                                            nearDistance={false}
                                                            matchHeight
                                                            matchMargin
                                                            inflate={30}
                                                        />
                                                    </Repeater>
                                                </FlexCol>
                                            </DragSource>
                                            <DropZone
                                                mod="inline-block"
                                                onDropTest={e => e.source.data.type == "card"}
                                                onDrop={(e, { store }) => {
                                                    store.update(
                                                        "cards",
                                                        moveElement,
                                                        e.source.data.index,
                                                        store.get("$cardIndex") + 1
                                                    );
                                                }}
                                                matchWidth
                                                matchHeight
                                                matchMargin
                                                inflate={200}
                                            />
                                        </FlexCol>
                                    </Repeater>
                                </FlexRow>
                                <FlexRow spacing justify="end" putInto="footer">
                                    <Button
                                        mod="primary"
                                        onClick='save'
                                        text="Save"
                                        disabled-bind="new_project.invalid"
                                        mod="primary"
                                    />
                                    <Button
                                        text="Cancel"
                                        dismiss
                                    />
                                </FlexRow>
                            </form>
                        </ValidationGroup>
                    </FlexRow>
                </FlexRow>
            </FirstVisibleChildLayout>
        </Window></cx>;

        let win = Widget.create(window);
        win.open(store);
    });
}

function insertElement(array, index, ...args) {
    return [...array.slice(0, index), ...args, ...array.slice(index)];
}

function moveElement(array, sourceIndex, targetIndex) {
    if (targetIndex == sourceIndex) return array;

    let el = array[sourceIndex];
    let res = [...array];
    if (sourceIndex < targetIndex) {
        for (let i = sourceIndex; i + 1 < targetIndex; i++) res[i] = res[i + 1];
        targetIndex--;
    } else {
        for (let i = sourceIndex; i > targetIndex; i--) res[i] = res[i - 1];
    }
    res[targetIndex] = el;
    return res;
}