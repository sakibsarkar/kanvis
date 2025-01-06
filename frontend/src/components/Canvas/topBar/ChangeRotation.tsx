import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  setSelectedShape,
  updateShape,
} from "@/redux/features/project/shapes.slice";
import { useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import React from "react";
import { RxRotateCounterClockwise } from "react-icons/rx";
import { useDispatch } from "react-redux";
interface IProps {
  handleChangeRotation: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => IShape | null;
}
const ChangeRotation: React.FC<IProps> = ({ handleChangeRotation }) => {
  const { selectedShape } = useAppSelector((state) => state.shapes);
  const dispatch = useDispatch();
  const changeOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shape = handleChangeRotation(e);
    if (!shape) return;
    dispatch(updateShape(shape));
    dispatch(setSelectedShape(shape));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-[25px] center">
          <RxRotateCounterClockwise />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Change Rotation</DropdownMenuLabel>
        <div className="flex items-center gap-[5px]">
          <input
            type="range"
            className="w-full"
            value={selectedShape ? selectedShape.rotation : 1}
            onChange={changeOpacity}
            max={360}
            min={0}
          />
          <p className="shrink-0">
            {selectedShape ? selectedShape.rotation : 1}° deg
          </p>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeRotation;
