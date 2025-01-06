import { baseUrl } from "@/redux/api/appSlice";
import { IShape, TFontWeight } from "@/types/shape";
import html2canvas from "html2canvas";
interface IShapeStyleProps {
  selectedShape: IShape | null;
  shapes: IShape[];
}

export const updateCanvasImage = async (projectId: string, token: string) => {
  const canvas = document.getElementById("canvas");
  if (!canvas) return "";
  const data = await html2canvas(canvas);
  const dataUrl = data.toDataURL("image/png");
  const blob = await (await fetch(dataUrl)).blob();

  // Create a FormData object
  const formData = new FormData();
  formData.append("file", blob, "screenshot.png");

  await fetch(`${baseUrl}/project/update-thumbnail/${projectId}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const shapeStyleFunction = (args: IShapeStyleProps) => {
  const { selectedShape, shapes } = args;
  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (!selectedShape) return null;

    return { ...selectedShape, color };
  };
  const handleChangeOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const opacityValue = Number(e.target.value); //0 - 100
    const opacity = opacityValue / 100;

    if (!selectedShape) return null;

    return { ...selectedShape, opacity };
  };

  const handleChangeRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedShape) return null;

    const rotation = Number(e.target.value);
    return { ...selectedShape, rotation } as IShape;
  };

  const updateFontSize = (delta: number) => {
    if (!selectedShape) return null;
    if (selectedShape.textStyle?.fontSize === 0 && delta < 0)
      return selectedShape;

    const shape = { ...selectedShape };
    const { textStyle = {}, ...rest } = shape;
    const { fontSize = 15 } = textStyle;
    const newFontSize = Math.max(fontSize + delta, 0);
    const newTextStyle = { ...textStyle, fontSize: newFontSize };

    return { ...rest, textStyle: newTextStyle } as IShape;
  };
  const updateFontWeight = (weight: TFontWeight) => {
    if (!selectedShape) return null;

    const shape = { ...selectedShape };
    const { textStyle = {}, ...rest } = shape;

    const newTextStyle = { ...textStyle, fontWeight: weight };

    return { ...rest, textStyle: newTextStyle } as IShape;
  };

  return {
    handleChangeColor,
    handleChangeRotation,
    updateFontSize,
    updateFontWeight,
    handleChangeOpacity,
  };
};
