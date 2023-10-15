interface CardProps {
  image: string;
  name: string;
  artistName: string;
}

function Card({ image, name, artistName }: CardProps) {
  return (
    <div
      className="relative flex h-full w-full select-none items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat p-3"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <p className="line-clamp-3 animate-text overflow-hidden text-ellipsis break-all bg-gradient-to-r from-midnightblue via-aqua to-midnightblue bg-clip-text text-center text-2xl font-black text-transparent">
        {name}
      </p>
      <p className="absolute inset-x-3 bottom-3 overflow-hidden text-ellipsis whitespace-nowrap rounded-sm bg-midnightblue px-2 text-base font-medium text-aqua">
        {artistName}
      </p>
    </div>
  );
}

export default Card;
