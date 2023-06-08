"use client";

import NFTCard from "@/components/UI/organisms/NFTCard";
import { getImageURL } from "@/services/pinata";
import { useContract } from "@/hooks/useContract";
import { useEffect, useState } from "react";

export default function Page() {
  const { currentTokens, updateState } = useContract();
  const [name, setName] = useState("");
  const [tokenId, setTokenId] = useState(1);
  const [ability, setAbility] = useState({} as any);
  const [image, setImage] = useState({ url: "", alt: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = async (tokenId: number) => {
    if (!currentTokens) {
      return;
    }

    setLoading(true);
    fetch(`/api/metadata/${tokenId}`)
      .then((response) => response.json())
      .then(({ metadata }) => {
        const { attributes, name } = metadata;

        setAbility(
          attributes.reduce((prev: any, cur: any) => {
            return {
              ...prev,
              [cur["trait_type"].toLowerCase()]: cur.value,
            };
          }, {} as any)
        );

        setImage({
          url: getImageURL(tokenId),
          alt: name,
        });

        setName(name);

        setLoading(false);
      });
  };

  const nextNFT = () => {
    setTokenId((prev) => {
      return (prev % currentTokens) + 1;
    });
  };

  const prevNFT = () => {
    setTokenId((prev) => {
      --prev;
      if (!prev) {
        return currentTokens;
      }

      return prev;
    });
  };

  useEffect(() => {
    updateState();
  }, []);

  useEffect(() => {
    fetchData(tokenId);
  }, [tokenId]);

  return (
    <div className="flex gap-8">
      <div
        onClick={prevNFT}
        className="flex justify-center items-center flex-1 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:bg-opacity-30 cursor-pointer"
      >
        <h2 className="text-6xl lg:text-8xl">
          <span className="inline-block transition-transform group-hover:-translate-x-2 motion-reduce:transform-none">
            &lt;-
          </span>
        </h2>
      </div>

      {loading && (
        <NFTCard
          name="Loading..."
          image={{ url: "/random.png", alt: "bob" }}
          ability={{ backend: 0, frontend: 0, ios: 0, android: 0 }}
          option={{ showValue: false, max: 5 }}
        />
      )}
      {!loading && (
        <NFTCard
          name={name}
          image={image}
          ability={ability}
          option={{ showValue: false, max: 5 }}
        />
      )}

      <div
        onClick={nextNFT}
        className="flex justify-center items-center flex-1 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:bg-opacity-30 cursor-pointer"
      >
        <h2 className="text-6xl lg:text-8xl">
          <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </div>
    </div>
  );
}
