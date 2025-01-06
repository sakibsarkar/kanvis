import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateTemplateMutation } from "@/redux/features/template/template.api";
import { useAppSelector } from "@/redux/hook";
import { useParams } from "next/navigation";
import React, { FormEvent, SetStateAction } from "react";
import { toast } from "sonner";

interface IProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

const UploadTemplate: React.FC<IProps> = ({ setIsOpen, isOpen }) => {
  const { id } = useParams();
  const { projectName } = useAppSelector((state) => state.project);
  const [createTemplate] = useCreateTemplateMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const templateName = form.templateName.value;
    if (!templateName)
      return toast.error("Please enter a name for your template");

    const toastId = toast.loading("Please wait...");
    try {
      const res = await createTemplate({ id: id as string, templateName });
      toast.dismiss(toastId);
      if (!res.data.success) {
        return toast.error("Something went wrong while making this request", {
          description: "Please try agin..",
        });
      }

      toast.success("Successfully uploaded this project as a template");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong while making this request", {
        description: "Please try agin..",
      });
    }
  };

  return (
    <>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload as Template</DialogTitle>
            <DialogDescription>
              Make Your project as template for others to use it
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="templateName" className="text-right">
                Name
              </Label>
              <Input
                id="templateName"
                name="templateName"
                defaultValue={projectName}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant={"destructive"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadTemplate;
