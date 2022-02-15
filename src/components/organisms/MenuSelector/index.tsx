import { useState, useRef } from 'react';

import * as S from './style';

interface IMenuSelectorProps {
  title?: string;
  menuList: {
    id: number;
    name: string;
  }[];
  selected: number;
  onClick: (key: number) => void;
}

export const MenuSelector = ({ title = '', menuList, selected, onClick }: IMenuSelectorProps) => {
  let isDragging = false;
  let swipeStartPos = 0;
  const slideRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging = true;
    swipeStartPos = e.pageX;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const swipeLength = e.pageX - swipeStartPos;
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(${Math.min(swipeLength, 0)}px)`;
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
    swipeStartPos = 0;
  };

  return (
    <S.Container>
      {title !== '' && <S.Title>{title}</S.Title>}
      <S.MenuButtons
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        ref={slideRef}
      >
        {menuList.map((menu) => (
          <S.Button key={menu.id} underLine={menu.id === selected} onClick={() => onClick(menu.id)}>
            {menu.name}
          </S.Button>
        ))}
      </S.MenuButtons>
    </S.Container>
  );
};
