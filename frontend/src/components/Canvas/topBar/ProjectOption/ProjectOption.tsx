import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiSaveDown1 } from "react-icons/ci";

import { useState } from "react";
import { PiSparkle } from "react-icons/pi";
import { TbTemplate } from "react-icons/tb";
import UploadTemplate from "./UploadTemplate";
const ProjectOption = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="text-[25px] border-slate-200 rounded-[8px] "
            variant={"outline"}
          >
            <PiSparkle />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Project options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            <button className="flex items-center gap-[3px]">
              <TbTemplate />
              Upload as Template
            </button>
          </DropdownMenuItem>

          <DropdownMenuCheckboxItem>
            <button className="flex items-center gap-[3px]">
              <CiSaveDown1 />
              Save progress
            </button>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UploadTemplate isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ProjectOption;
