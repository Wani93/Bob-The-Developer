import Status from "@/components/Status";
import Description from "@/components/Description";
import NFTCard from "@/components/UI/organisms/NFTCard";

export default function Home() {
  const image = {
    url: "/hero.png",
    alt: "bob",
  };

  const ability = {
    backend: 3,
    frontend: 5,
    ios: 4,
    android: 2,
    max: 5,
  };

  return (
    <div className="flex flex-col items-center md:flex-row">
      <section className="flex-1 mr-24 my-auto">
        <Description />
        <Status />
      </section>
      <section>
        <NFTCard image={image} ability={ability} />
      </section>
    </div>
  );
}
