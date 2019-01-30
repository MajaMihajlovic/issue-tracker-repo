import {
  Button,
  TextField,
  ValidationGroup,
  FlexRow,
  FlexCol, Link, LookupField, List, Text, DragHandle, DragSource, DropZone, TextArea
} from 'cx/widgets';
import { LabelsLeftLayout, PropertySelection, LabelsTopLayout, Repeater } from 'cx/ui';
import Controller from './Controller';
import "./index.scss"

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
        <img style="width:200px; heigth:200px; object-fit: cover" src-expr="{new_project.pictureUrl} || 'http://placehold.it/200x200'" alt="Photo" />
      </figure>
      <ValidationGroup layout={LabelsLeftLayout} invalid-bind="new_project.invalid">
        <form>
          <FlexCol style="width:600px; padding-top:10px;">
            <TextField
              value-bind="new_project.name"
              label="Name"
              style="width: 100%; max-width: 950px"
              asterisk
              required
            />
            <TextArea
              value-bind="new_project.description"
              label="Description"
              style="width: 100%; max-width: 750px"
              asterisk
              required
            />
            <TextField
              value-bind="new_project.pictureUrl"
              label="Photo URL"
              style="width: 100%; max-width: 750px"
            />
            <hr />
            <div class="cards">
              <FlexRow>
                <Repeater
                  records-bind="cards"
                  recordName="$card"
                  indexName="$cardIndex"
                >
                  <DragSource
                    class="card"
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
                </Repeater>
              </FlexRow>
            </div>
            <hr />
            <FlexRow spacing >
              <Button
                onClick="back"
                text="Back"
              />

              <Button
                mod="primary"
                onClick="save"
                text="Add"
                disabled-bind="new_project.invalid"
                mod="primary"
              />
            </FlexRow>
          </FlexCol>
        </form>
      </ValidationGroup>

    </FlexRow>
  </main >
</cx >