import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormField({ id, label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-[15px] font-semibold">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        aria-invalid={!!error}
        className="h-auto min-h-[52px] rounded-full border-border bg-bg px-5 text-base focus-visible:border-brand focus-visible:ring-0 md:text-base"
        {...props}
      />
      {error && <p className="px-2 text-[13px] text-a-700">{error}</p>}
    </div>
  );
}
