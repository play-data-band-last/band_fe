import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import classes from "../../styles/blocks/Carousel.module.css";

const items = [
  { id: '1', content: '슬라이드 1' },
  { id: '2', content: '슬라이드 2' },
  { id: '3', content: '슬라이드 3' },
  { id: '4', content: '슬라이드 4' },
  { id: '5', content: '슬라이드 5' },
];

const Carousel = () => {
  const onDragEnd = (result) => {
    // 드래그 앤 드롭이 끝날 때 호출되는 콜백 함수
    if (!result.destination) return; // 목적지가 없으면 종료

    // 아이템의 순서 변경
    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    // 순서 변경된 아이템으로 업데이트
    // 여기에서는 상태 업데이트 또는 API 호출을 수행할 수 있습니다.
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="carousel">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={classes.carouselContainer}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className={classes.carouselItem}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Carousel;