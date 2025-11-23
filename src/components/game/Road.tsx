import roadTexture from "@/assets/road-texture.png";

interface RoadProps {
  isSlowingDown: boolean;
}

export const Road = ({ isSlowingDown }: RoadProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
      <div 
        className={`h-full ${isSlowingDown ? 'animate-slide-right-slow' : 'animate-slide-right'}`}
        style={{
          backgroundImage: `url(${roadTexture})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          width: "200%",
        }}
      />
    </div>
  );
};

