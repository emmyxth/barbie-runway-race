import roadTexture from "@/assets/road-texture.png";

interface RoadProps {
  isSlowingDown: boolean;
}

export const Road = ({ isSlowingDown }: RoadProps) => {
  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 h-64 ${isSlowingDown ? 'animate-road-scroll-slow' : 'animate-road-scroll'}`}
      style={{
        backgroundImage: `url(${roadTexture})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
      }}
    />
  );
};

