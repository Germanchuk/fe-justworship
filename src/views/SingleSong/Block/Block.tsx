import classNames from "classnames";
import React from "react";
import MagicInput from "../../../components/MagicInput/MagicInput";

export default function Block({ data, editMode }) {
  const [title, setTitle] = React.useState(data.title);
  return (
    <div
      className={classNames(
        "ring-1 ring-neutral shadow bg-base-200 rounded divide-y divide-neutral",
        {
          "Block--editabled": editMode,
        }
      )}
    >
      <BlockTitle editMode={editMode}>{title}</BlockTitle>
      <BlockContent editMode={editMode} data={data.content} />
    </div>
  );
}

function BlockTitle({ children, editMode }) {
  if (editMode) {
    return (
      <MagicInput className="px-4 py-2 focus:outline-neutral rounded-t">
        {children}
      </MagicInput>
    );
  } else {
    return <div className="px-4 py-2">{children}</div>;
  }
}

function BlockContent({ data, editMode }) {
  if (editMode) {
    return (
      <MagicInput className="px-4 py-2 focus:outline-neutral rounded-b">
        {data
          .map((item) => item.content)
          .filter((item) => item.length)
          .join("\n")}
      </MagicInput>
    );
  } else {
    return <div className="py-2 px-4">{data.map(renderLine)}</div>;
  }
}

function renderLine(data) {
  switch (data.type) {
    case "chord":
      return <div className="text-primary" style={{whiteSpace: 'pre'}}>{data.content}</div>;

    case "text":
      return <div>{data.content}</div>;
  }
}
