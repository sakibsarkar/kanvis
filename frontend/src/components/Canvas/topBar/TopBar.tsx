import { useAppSelector } from "@/redux/hook";
import React from "react";
import { shapeStyleFunction } from "../canvasFunctions";
import ChangeColor from "./ChangeColor";
import ChangeOpacity from "./ChangeOpacity";
import ChangeRotation from "./ChangeRotation";
import DownloadButton from "./DownloadButton";
import SelecteFontWeight from "./SelecteFontWeight";
import UpdateFontSize from "./UpdateFontSize";

import ProjectOption from "./ProjectOption/ProjectOption";
const TopBar: React.FC = () => {
  const { shapes, selectedShape } = useAppSelector((state) => state.shapes);

  const {
    updateFontSize,
    handleChangeColor,
    updateFontWeight,
    handleChangeOpacity,
    handleChangeRotation,
  } = shapeStyleFunction({
    selectedShape,
    shapes,
  });

  return (
    <div className="w-full flex items-center justify-between px-[10px] h-[80px]">
      <div className="flex items-center gap-[20px]">
        {selectedShape?.type == "text" ? (
          <>
            <UpdateFontSize updateFontSize={updateFontSize} />
            <SelecteFontWeight updateFontWeight={updateFontWeight} />
          </>
        ) : (
          ""
        )}
        <ChangeColor handleChangeColor={handleChangeColor} />

        {selectedShape ? (
          <>
            <ChangeOpacity handleChangeOpacity={handleChangeOpacity} />
            <ChangeRotation handleChangeRotation={handleChangeRotation} />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="center gap-[5px]">
        <DownloadButton />
        <ProjectOption />
      </div>
    </div>
  );
};

export default TopBar;
