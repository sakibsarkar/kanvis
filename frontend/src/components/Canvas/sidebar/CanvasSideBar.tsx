import { useState } from "react";

import { useUpdateCanvasColorMutation } from "@/redux/features/project/project.api";
import { setCanvasColor } from "@/redux/features/project/project.slice";
import { useAppDispatch } from "@/redux/hook";
import { useParams } from "next/navigation";
import SidebarLinks from "./SidebarLinks";
import AddTextContent from "./contents/AddTextContent";
import ChangePosition from "./contents/ChangePosition";
import EditCanvas from "./contents/EditCanvas";
import ShapeContent from "./contents/ShapeContent";
import UploadImageContent from "./contents/UploadImageContent";

const CanvasSideBar = () => {
  const [tab, setTab] = useState("shape");

  return (
    <div className="h-full w-full bg-[#252627] flex items-start justify-start">
      <SidebarLinks setTab={setTab} tab={tab} />

      <div className="w-[calc(100%-80px)] h-full py-[10px] smoothBar overflow-y-auto overflow-x-hidden">
        {tab === "shape" && <ShapeContent />}
        {tab === "text" && <AddTextContent />}
        {tab === "image" && <UploadImageContent />}
        {tab === "position" && <ChangePosition />}
        {tab === "canvas" && <EditCanvas />}
      </div>
    </div>
  );
};

export default CanvasSideBar;
