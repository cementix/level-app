import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateTaskForm from "./CreateTaskForm";

const CreateTaskButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-48 flex items-center gap-4 text-foreground mb-4"
          variant={"outline"}
        >
          Create Task <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CreateTaskForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskButton;
