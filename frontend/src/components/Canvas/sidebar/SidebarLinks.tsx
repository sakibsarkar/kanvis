import { canvasLink } from "@/utils/canvasSideBarLinks";
import React, { SetStateAction } from "react";
interface IProps {
  setTab: React.Dispatch<SetStateAction<string>>;
  tab: string;
}
const SidebarLinks: React.FC<IProps> = ({ setTab, tab }) => {
  return (
    <div className="w-[80px] h-full flex flex-col justify-start items-center bg-[#18191b] gap-[8px] py-[10px]">
      {canvasLink.map(({ Icon, id, title }) => (
        <button
          key={id}
          onClick={() => setTab(id)}
          className={`text-white center gap-[5px] p-[8px] flex-col rounded-[5px] hover:bg-[#52565c] ${
            tab === id ? "bg-[#52565c]" : ""
          }`}
        >
          <Icon /> {title}
        </button>
      ))}
    </div>
  );
};

export default SidebarLinks;