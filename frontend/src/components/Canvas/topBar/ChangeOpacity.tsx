import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TransparencyICon from "@/icons/TransparencyICon";
import {
  setSelectedShape,
  updateShape,
} from "@/redux/features/project/shapes.slice";
import { useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import { useDispatch } from "react-redux";
interface IProps {
  handleChangeOpacity: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => IShape | null;
}
const ChangeOpacity: React.FC<IProps> = ({ handleChangeOpacity }) => {
  const { selectedShape } = useAppSelector((state) => state.shapes);
  const dispatch = useDispatch();
  const changeOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shape = handleChangeOpacity(e);
    if (!shape) return;
    dispatch(updateShape(shape));
    dispatch(setSelectedShape(shape));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <TransparencyICon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Change Opacity</DropdownMenuLabel>
        <div className="flex items-center gap-[5px]">
          <input
            type="range"
            className="w-full"
            value={(selectedShape ? selectedShape.opacity : 1) * 100}
            onChange={changeOpacity}
            max={100}
            min={0}
          />
          <p>{parseInt(((selectedShape?.opacity || 0) * 100).toString())}%</p>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeOpacity;
