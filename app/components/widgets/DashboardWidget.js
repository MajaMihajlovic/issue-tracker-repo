import {
  FlexRow,
  Section,
  DragHandle,
  Button,
  Icon,
  ContentPlaceholder,
  Heading
} from "cx/widgets";

export default ({ title, bodyStyle, children, pad }) => (
  <cx>
    <Section mod="widget" pad={pad} bodyStyle={bodyStyle}>
      <DragHandle putInto="header">
        <FlexRow align="center" spacing="xsmall">
          <Icon name="grip-vertical" style="padding: 3px" />
          <Heading text={title} level={3} />
          <div style="flex: 1" />
          <ContentPlaceholder name="toolbar" />
        </FlexRow>
      </DragHandle>
      {children}
    </Section>
  </cx>
);
