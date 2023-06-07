type Props = {
  percent: number;
};

export default function GaugeBar({ percent }: Props) {
  return (
    <div className="w-full bg-gauge-green h-4 rounded-lg bg-opacity-50 mt-4 overflow-hidden">
      <div
        style={{ transform: `translateX(-${100 - percent}%)` }}
        className={`transition delay-300 ease-in-out duration-1000 bg-gauge-green w-100 h-4 rounded-lg opacity-100`}
      />
    </div>
  );
}
