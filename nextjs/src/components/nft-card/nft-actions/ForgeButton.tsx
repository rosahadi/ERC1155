import { Loader2 } from "lucide-react";

const ForgeButton: React.FC<{
  onForge: () => void;
  isPending: boolean;
  balance: number;
}> = ({ onForge, isPending, balance }) => (
  <button
    onClick={onForge}
    disabled={isPending || balance < 1}
    className="action-button bg-gradient-to-r from-yellow-500 to-orange-500"
  >
    {isPending ? (
      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
    ) : (
      "Forge"
    )}
  </button>
);

export default ForgeButton;
