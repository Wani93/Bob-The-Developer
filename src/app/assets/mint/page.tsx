"use client";

import Button from "@/components/UI/atoms/Button";
import NFTCard from "@/components/UI/organisms/NFTCard";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useContract } from "@/hooks/useContract";

export default function Page() {
  const { contract, updateState } = useContract();
  const router = useRouter();
  const image = {
    url: "/random.png",
    alt: "bob",
  };

  const [ability, setAbility] = useState({
    backend: Math.ceil(Math.random() * 5),
    frontend: Math.ceil(Math.random() * 5),
    ios: Math.ceil(Math.random() * 5),
    android: Math.ceil(Math.random() * 5),
  });

  const option = {
    max: 5,
    showValue: false,
  };

  const handleClick = async () => {
    const overrides = {
      value: ethers.parseEther("0.01"),
    };
    const transaction = await contract!.mintNFT(overrides);

    const response = await transaction.wait();
    const tokenId = parseInt(response.logs[0].topics[3]);

    router.push(`/assets/${tokenId}`);
  };

  useEffect(() => {
    updateState();

    const timer = setInterval(() => {
      setAbility({
        backend: Math.ceil(Math.random() * 5),
        frontend: Math.ceil(Math.random() * 5),
        ios: Math.ceil(Math.random() * 5),
        android: Math.ceil(Math.random() * 5),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <NFTCard
        name="Bob The Developer"
        image={image}
        ability={ability}
        option={option}
      />
      <h3 className="text-2xl lg:text-4xl mt-2">Mint your own Bob!</h3>
      <p className="text-lg mb-2">
        <span className="opacity-50">You can mint a Bob NFT by paying</span>
        <span className="text-gauge-green"> 0.01 ETH</span>
      </p>
      <Button
        clickHandler={handleClick}
        style="bg-gauge-green border-transparent text-black px-4 py-2 lg:text-4xl"
      >
        Mint!
      </Button>
    </div>
  );
}
