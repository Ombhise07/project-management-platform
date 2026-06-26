"use client";

import { useState } from "react";

import { Building2 } from "lucide-react";

import { Button, Input, Modal } from "@/components/ui";

import { createWorkspace } from "@/services/workspace.service";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: (workspace: any) => void;
};

export default function CreateWorkspaceModal({ open, onClose, onCreated }: Props) {
  const [workspaceName, setWorkspaceName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!workspaceName.trim()) return;

    try {
      const response = await createWorkspace({
        name: workspaceName,
      });

      onCreated(response.data);

      setWorkspaceName("");

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

          <Button type="button" disabled={loading} onClick={handleCreate}>
            {loading ? "Creating..." : "Create Workspace"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
