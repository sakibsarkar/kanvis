import { IShape } from "@/types/shape";

const CircleCanvas = ({ shape }: { shape: IShape }) => {
  return (
    <div
      id={shape.id}
      style={{
        width: `${shape.width}px`,
        height: `${shape.height}px`,
        backgroundColor: shape.color,
        borderRadius: `${shape.radius}%`,
        opacity: shape.opacity,
      }}
    ></div>
  );
};

export default CircleCanvas;
