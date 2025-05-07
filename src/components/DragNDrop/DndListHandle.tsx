import { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { usePrivateStoryStore } from '@/stores/privateStoryStore';
import classes from './DndListHandle.module.css';
import { Button } from '@mantine/core';

export function DndListHandle() {
  const { contributors, setCollaboratorsList} = usePrivateStoryStore();

  function removeCollaborator(person: string) {
    setCollaboratorsList(contributors.filter((p) => p !== person));
  }

  const items = contributors.map((item, index) => (
    <Draggable key={item} index={index} draggableId={item}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.dragAndDropItem, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <img src="/Move-button.svg" alt="" />
          </div>
          <div className={classes.item}>
            
            <Text className={classes.symbol}>{item}</Text>
            <Button onClick={() => removeCollaborator(item)} className={classes.itemButton}><img src="/icons/X.svg" alt="" /></Button>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        if (!destination || source.index === destination.index) return;

        const updated = [...contributors];
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
