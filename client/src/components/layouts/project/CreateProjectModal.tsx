"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Input, Modal } from "@/components/ui";
import { createProject } from "@/services/project.service";

interface Props {
  open: boolean;
  workspaceId: string;
  onClose: () => void;
  onCreated: () => void;
}

type FormData = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

export default function CreateProjectModal({ open, workspaceId, onClose, onCreated }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await createProject({
        workspaceId,
        ...data,
      });

      toast.success("Project created");

      reset();

      onClose();

      onCreated();
    } catch {
      toast.error("Failed to create project");
    }
  };

  return (
    <Modal open={open} title="Create Project" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Project Name" registration={register("name")} />

        <Input label="Description" registration={register("description")} />

        <Input type="date" label="Start Date" registration={register("startDate")} />

        <Input type="date" label="End Date" registration={register("endDate")} />

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>

          <Button loading={isSubmitting} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
