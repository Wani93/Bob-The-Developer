import axios, { AxiosResponse } from "axios";

type TraitType = "Backend" | "Frontend" | "iOS" | "Android";

type Metadata = {
  name: string;
  description: string;
  image: string;
  dna: string;
  edition: number;
  date: number;
  attributes: { trait_type: TraitType; value: number }[];
  compiler: "HashLips Art Engine";
};

export const getMetadata = (
  tokenId: number | string
): Promise<AxiosResponse<Metadata>> =>
  axios.get(
    `https://gateway.pinata.cloud/ipfs/${process.env.NEXT_PUBLIC_PINATA_METADATA_CID}/${tokenId}.json`,
    {
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

export const getImageURL = (tokenId: number | string) =>
  `https://gateway.pinata.cloud/ipfs/${process.env.NEXT_PUBLIC_PINATA_IMAGE_CID}/${tokenId}.png`;
