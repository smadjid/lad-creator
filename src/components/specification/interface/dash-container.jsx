import React, { useState, useCallback, useContext } from "react";

import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import Row from "./Row";
import initialData from "./initial-data";
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarFrameBoxIntoParent,
  handleRemoveItemFromLayout,
} from "./helpers";

import { InterfaceContext } from "./page-container";
import { GlobalInterfaceContext } from "../specification-wizard";

import { SIDEBAR_ITEM, FRAMEBOX, COLUMN } from "./constants";
import shortid from "shortid";


const DashContainer = ({index, initialLayout}) => {
  //const initialLayout = initialData.layout;
  const [layout, setLayout] = useContext(InterfaceContext);
  
  const [globalLayout, setGlobalLayout] = useContext(GlobalInterfaceContext);

  //setLayout(globalLayout[index].layout);
  
  
  const [frameboxs, setFrameBoxs] = useState([]);

  const updateLayout= (layoutData) =>{
    setLayout(layoutData);
    const newGLayout = [...globalLayout];
    newGLayout[index] = {id: index, layout:layoutData};
    
    setGlobalLayout(newGLayout);
    console.log(newGLayout);
    
  }

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      updateLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {

      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type, content: item.content };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newFrameBox = {
          id: shortid.generate(),
          content: item.framebox.content,
          ...item.framebox,
        };
        const newItem = {
          id: newFrameBox.id,
          content: item.framebox.content,
          type: FRAMEBOX,
        };
        
        setFrameBoxs({
          ...frameboxs,
          [newFrameBox.id]: newFrameBox,
        });
        updateLayout(
          handleMoveSidebarFrameBoxIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          updateLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        updateLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      updateLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, frameboxs]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        frameboxs={frameboxs}
        path={currentPath}
      />
    );
  };

  
  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  
  return (<>     
          <div className="page">
            {layout.map((row, index) => {              
              const currentPath = `${index}`;
              return (
                <React.Fragment key={row.id}>
                  <DropZone
                    data={{
                      path: currentPath,
                      childrenCount: layout.length,
                      page : "1"
                    }}
                    
                    onDrop={handleDrop}
                    path={currentPath}
                  />
                  {renderRow(row, currentPath)}
                </React.Fragment>
              );
            })}
            <DropZone
              data={{
                path: `${layout.length}`,
                childrenCount: layout.length,
              }}
              onDrop={handleDrop}
              isLast
            />
          </div>

          <TrashDropZone
            data={{
              layout,
            }}
            onDrop={handleDropToTrashBin}
          />
        
      )
      </>
  );
};
export default DashContainer;
