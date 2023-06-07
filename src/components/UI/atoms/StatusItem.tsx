import { PropsWithChildren } from "react";

type Props = {
  max?: number;
  value?: number;
  percent?: number;
};

export default function StatusItem({
  max,
  value,
  percent,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="bg-gauge-green p-4 text-black w-[102px] h-[108px] flex items-center justify-center flex-col">
      {children && children}
      {!children && (
        <>
          <h3 className="text-4xl">{percent}%</h3>
          <p className="text-3xl whitespace-nowrap">
            {value} / {max}
          </p>
        </>
      )}
    </div>
  );
}
