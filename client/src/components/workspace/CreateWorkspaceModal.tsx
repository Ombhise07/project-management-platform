"use client";

import { useState } from "react";

import { Building2 } from "lucide-react";

import { Button, Input, Modal } from "@/components/ui";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateWorkspaceModal({ open, onClose }: Props) {
  const [workspaceName, setWorkspaceName] = useState("");

  const handleCreate = () => {
    // API will come later

    console.log(workspaceName);

    onClose();
  };

  return (
    <Modal open={open} title="Create Workspace" onClose={onClose}>
      <div className="space-y-6">
        <Input
          label="Workspace Name"
          placeholder="Enter workspace name"
          icon={Building2}
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>

          <Button type="button" onClick={handleCreate}>
            Create Workspace
          </Button>
        </div>
      </div>
    </Modal>
  );
}
