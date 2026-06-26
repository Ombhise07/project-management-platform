import { Button } from "@/components/ui";

interface Props {
  onEdit: () => void;

  onDelete: () => void;
}

export default function TaskDrawerActions({ onEdit, onDelete }: Props) {
  return (
    <div className="flex gap-3 border-t p-6">
      <Button className="flex-1" onClick={onEdit}>
        Edit Task
      </Button>

      <Button variant="destructive" className="flex-1" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
}
