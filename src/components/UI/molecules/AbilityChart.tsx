import AbilityItem from "../atoms/AbilityItem";

type Props = {
  label: string;
  value: number;
  max: number;
  showValue: boolean;
};

export default function AbilityChart({
  label,
  value,
  max,
  showValue = true,
}: Props) {
  return (
    <div className="flex w-full gap-3 items-center text-2xl justify-between">
      <span>{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: max }, (v, i) => (
            <AbilityItem key={i} active={i < value} />
          ))}
        </div>
        {showValue && <span className="block w-4">{value}</span>}
      </div>
    </div>
  );
}
