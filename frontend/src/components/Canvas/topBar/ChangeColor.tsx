import { Input } from "@/components/ui/input";
import { useUpdateCanvasColorMutation } from "@/redux/features/project/project.api";
import { setCanvasColor } from "@/redux/features/project/project.slice";
import {
  setSelectedShape,
  updateShape,
} from "@/redux/features/project/shapes.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import { useParams } from "next/navigation";
import React from "react";
interface IProps {
  handleChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => IShape | null;
}
const ChangeColor: React.FC<IProps> = ({ handleChangeColor }) => {
  const { selectedShape } = useAppSelector((state) => state.shapes);
  const { canvas } = useAppSelector((state) => state.project);
  const [update] = useUpdateCanvasColorMutation();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;

    if (selectedShape) {
      const shape = handleChangeColor(e);
      if (!shape) return;
      dispatch(updateShape(shape));
      dispatch(setSelectedShape(shape));
    } else {
      const cavas = document.getElementById("canvas");
      dispatch(setCanvasColor(colorValue));
      const payload = { id: id as string, bgColor: colorValue };
      update(payload);
      cavas ? (cavas.style.backgroundColor = colorValue) : "";
    }
  };

  return (
    <div className=" center gap-[5px]">
      <p>Color:</p>
      <Input
        className="p-[0] w-[50px]"
        type="color"
        value={selectedShape ? selectedShape.color : canvas.bgColor}
        onChange={changeColor}
      />
    </div>
  );
};

export default ChangeColor;
