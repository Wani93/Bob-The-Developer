import Image from "next/image";
import AbilityChart from "../molecules/AbilityChart";

type Props = {
  name?: string;
  image: {
    url: string;
    alt: string;
  };
  ability: {
    backend: number;
    frontend: number;
    ios: number;
    android: number;
  };
  option?: {
    showValue: boolean;
    max: number;
  };
};

export default function NFTCard(props: Props) {
  const {
    name,
    image: { url, alt },
    ability: { backend, frontend, ios, android },
    option: { showValue, max } = { showValue: true, max: 5 },
  } = props;

  return (
    <div className="flex-col inline-flex items-center rounded-lg border border-neutral-700 px-5 py-4 transition-colors hover:bg-neutral-800/30">
      {name && <h3 className="text-3xl mb-2">{name}</h3>}
      <Image
        className="rounded-sm w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] mb-2"
        src={url}
        width={300}
        height={300}
        alt={alt}
        priority={true}
      />
      <div className="border border-transparent flex flex-col gap-2">
        <AbilityChart
          label="Backend"
          max={max}
          value={backend}
          showValue={showValue}
        />
        <AbilityChart
          label="Frontend"
          max={max}
          value={frontend}
          showValue={showValue}
        />
        <AbilityChart label="iOS" max={max} value={ios} showValue={showValue} />
        <AbilityChart
          label="Android"
          max={max}
          value={android}
          showValue={showValue}
        />
      </div>
    </div>
  );
}
