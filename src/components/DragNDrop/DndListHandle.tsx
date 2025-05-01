import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import classes from './DndListHandle.module.css';
import { useEffect } from 'react';


type DndListHandleProps = {
    collaboratorList: string[];
};

export function DndListHandle({collaboratorList}: DndListHandleProps) {
  const [state, handlers] = useListState(collaboratorList);

  useEffect(() => {
    const newItems = collaboratorList.filter(item => !state.includes(item));
    if (newItems.length > 0) {
      handlers.append(...newItems);
    }
  }, [collaboratorList]);
  

  const items = state.map((item, index) => (
    
    <Draggable key={item} index={index} draggableId={item}>

      {(provided, snapshot) => (
        <div className={cx(classes.dragAndDropItem, { [classes.itemDragging]: snapshot.isDragging })}ref={provided.innerRef}
        {...provided.draggableProps}>
            <div {...provided.dragHandleProps} className={classes.dragHandle}>
                <img src="/Move-button.svg" alt="" />
            </div>
        <div
          className={classes.item}
          
        >
          
          <Text className={classes.symbol}>{item}</Text>
          
        </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}