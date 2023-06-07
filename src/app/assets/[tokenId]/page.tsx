import FireCracker from "@/components/FireCracker";
import NFTCard from "@/components/UI/organisms/NFTCard";
import { getImageURL, getMetadata } from "@/services/pinata";

export default async function Page({ params }: any) {
  const { tokenId } = params;
  const { attributes, name } = (await getMetadata(tokenId)).data;
  const image = {
    url: getImageURL(tokenId),
    alt: name,
  };

  const ability = attributes.reduce((prev, cur) => {
    return {
      ...prev,
      [cur["trait_type"].toLowerCase()]: cur.value,
    };
  }, {} as any);

  return (
    <div className="flex flex-col items-center">
      <FireCracker fireCrackerCount={10} />
      <NFTCard
        name={name}
        image={image}
        ability={ability}
        option={{ showValue: false, max: 5 }}
      />
      <p className="mt-5 text-lg lg:text-3xl">
        Congratulations! You are now officially an NFT owner.
      </p>
    </div>
  );
}
