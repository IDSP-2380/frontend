import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import classes from './DndListHandle.module.css';
import { useEffect } from 'react';
import { usePrivateStoryStore } from '@/stores/privateStoryStore';


type DndListHandleProps = {
    collaboratorList: string[];
};

export function DndListHandle() {
  

  const { collaboratorList, setCollaboratorsList } = usePrivateStoryStore()

  const items = collaboratorList.map((item, index) => (
    
    <Draggable key={item} index={index} draggableId={item}>

      {(provided, snapshot) => (
        <div className={cx(classes.dragAndDropItem, { [classes.itemDragging]: snapshot.isDragging })}ref={provided.innerRef}
        {...provided.draggableProps}>
            <div {...provided.dragHandleProps} className={classes.dragHandle}>
                <img src="/Move-button.svg" alt="" />
            </div>
          <div className={classes.item}>
            <Text className={classes.symbol}>{item}</Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>{
        
        if (!destination || source.index === destination.index) return;

        const updated = [...collaboratorList];
        const [moved] = updated.splice(source.index, 1);
        updated.splice(destination.index, 0, moved);

        setCollaboratorsList(updated);
      }}
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