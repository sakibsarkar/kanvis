import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateCanvasColorMutation } from "@/redux/features/project/project.api";
import { setCanvasColor } from "@/redux/features/project/project.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useParams } from "next/navigation";
const EditCanvas = () => {
  const { bgColor, height, width } = useAppSelector(
    (state) => state.project.canvas
  );

  const dispatch = useAppDispatch();
  const [update] = useUpdateCanvasColorMutation();
  const { id } = useParams();

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;

    const cavas = document.getElementById("canvas");
    cavas ? (cavas.style.backgroundColor = colorValue) : "";
    dispatch(setCanvasColor(colorValue));
    const payload = { id: id as string, bgColor: colorValue };
    update(payload);
  };
  return (
    <div className="flex flex-col gap-6 w-full px-[15px] mx-auto">
      <div className="space-y-2 text-[#bebebe]">
        <h2 className="text-2xl font-bold">Canvas Creator</h2>
        <p className="text-muted-foreground">
          Customize the size and background color of your canvas.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="width" className="text-white">
            Width
          </Label>
          <Input
            id="width"
            type="number"
            value={width}
            min={100}
            max={2000}
            className="w-full"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="height" className="text-white">
            Height
          </Label>
          <Input
            id="height"
            type="number"
            value={height}
            min={100}
            max={2000}
            className="w-full"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="color" className="text-white">
          Background Color
        </Label>
        <Input
          id="color"
          type="color"
          onChange={changeColor}
          className="w-full h-[50px] p-0"
          defaultValue={bgColor}
        />
      </div>
    </div>
  );
};

export default EditCanvas;
