import { CSSProperties } from "react";

export default function Description() {
  const style = { "--n": 124 } as CSSProperties;

  return (
    <div>
      <h1 className="text-6xl">Bob The Developer</h1>
      <span className=" text-4xl opacity-50 mt-2 type" style={style}>
        40 unique Bob The Developers are NFTs created for GitHub PFP(Profile
        Picture).
        <br />
        Bob has developmental power, collect your own!
      </span>
    </div>
  );
}
