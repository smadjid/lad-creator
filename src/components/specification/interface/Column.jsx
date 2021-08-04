import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constants";
import DropZone from "./DropZone";
import FrameBox from "./frame-box";

const style = {};
const Column = ({ data, frameboxs, handleDrop, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({     
    type: COLUMN,
    item: {
      id: data.id,
      children: data.children,
      path
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderFrameBox = (framebox, currentPath) => {
    return (
      <FrameBox
        key={framebox.id}
        data={framebox}
        frameboxs={frameboxs}
        path={currentPath}
      />
    );
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="base draggable column"
    >
      {//console.log(data)
      }

      {data.children? data.children.map((framebox, index) => {
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={framebox.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length
              }}
              onDrop={handleDrop}
            />
            {renderFrameBox(framebox, currentPath)}
          </React.Fragment>
        );
      }): ' '}
      {data.children? <DropZone
        data={{
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length
        }}
        onDrop={handleDrop}
        isLast
      />:' '}
    </div>
  );
};
export default Column;
