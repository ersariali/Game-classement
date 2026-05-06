import GameBoard from '@/components/GameBoard';

export default function Page() {
  const fruits = [
    { id: 1, img: "/items/fruits/apple.png" },
    { id: 2, img: "/items/fruits/banana.png" },
    { id: 3, img: "/items/fruits/strawberry.png" },
    { id: 4, img: "/items/fruits/pineapple.png" },
    { id: 5, img: "/items/fruits/watermelon.png" },
    { id: 6, img: "/items/fruits/grapes.png" },
    { id: 7, img: "/items/fruits/cherry.png" },
    { id: 8, img: "/items/fruits/framboise.png" },
    { id: 9, img: "/items/fruits/orange.png" },
    { id: 10, img: "/items/fruits/peach.png" },
  ];

  return <GameBoard title="Meyve Sıralama" initialItems={fruits} theme="fruits" />;
}