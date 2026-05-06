import GameBoard from '@/components/GameBoard';

export default function Page() {
  const cities = [
    { id: 201, img: "/items/cities/paris.png" },
    { id: 202, img: "/items/cities/new-york.png" },
    { id: 203, img: "/items/cities/tokyo.png" },
    { id: 204, img: "/items/cities/london.png" },
    { id: 205, img: "/items/cities/istanbul.png" },
    { id: 206, img: "/items/cities/los-angeles.png" },
    { id: 207, img: "/items/cities/rio.png" },
    { id: 208, img: "/items/cities/miami.png" },
    { id: 209, img: "/items/cities/bali.png" },
    { id: 210, img: "/items/cities/dubai.png" },
  ];

  return <GameBoard title="Şehir Sıralama" initialItems={cities} theme="cities" />;
}