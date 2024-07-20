import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateDayForm from "./CreateDayForm";

const CreateDayButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-48 flex items-center gap-4 text-foreground mb-4"
          variant={"outline"}
        >
          Create Day <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CreateDayForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDayButton;
