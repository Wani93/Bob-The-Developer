type Props = {
  active: boolean;
};

export default function AbilityItem({ active }: Props) {
  return (
    <div
      className={`border border-gauge-indigo w-3 h-10 rounded-md rotate-12 bg-gauge-green
      ${active ? "" : "bg-opacity-40"}
      transition duration-1000 ease-in
      `}
    />
  );
}
