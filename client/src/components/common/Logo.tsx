import { KanbanSquare } from "lucide-react";

type LogoProps = {
  size?: number;
  showText?: boolean;
};

export default function Logo({ size = 28, showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-blue-600 p-2 text-white shadow-md">
        <KanbanSquare size={size} strokeWidth={2.2} />
      </div>

      {showText && (
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">ProSync</h1>
        </div>
      )}
    </div>
  );
}
