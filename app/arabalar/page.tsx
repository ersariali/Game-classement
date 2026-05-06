import GameBoard from '@/components/GameBoard';

export default function Page() {
  const cars = [
    { id: 101, img: "/items/cars/ferrari.png" },
    { id: 102, img: "/items/cars/bmw.png" },
    { id: 103, img: "/items/cars/maserati.png" },
    { id: 104, img: "/items/cars/mercedes.png" },
    { id: 105, img: "/items/cars/audi.png" },
    { id: 106, img: "/items/cars/mustang.png" },
    { id: 107, img: "/items/cars/corvette.png" },
    { id: 108, img: "/items/cars/tofas.png" },
    { id: 109, img: "/items/cars/mclaren.png" },
    { id: 110, img: "/items/cars/lamborghini.png" },
  ];

  return <GameBoard title="Araba Sıralama" initialItems={cars} theme="cars" />;
}