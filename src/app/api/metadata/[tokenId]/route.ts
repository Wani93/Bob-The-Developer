import { NextResponse } from "next/server";

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

export async function GET(
  request: Request,
  { params }: { params: { tokenId: string } }
) {
  const tokenId = params.tokenId;
  const res = await fetch(
    `https://gateway.pinata.cloud/ipfs/${process.env.NEXT_PUBLIC_PINATA_METADATA_CID}/${tokenId}.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const metadata: Metadata = await res.json();

  return NextResponse.json({ metadata });
}

// export default async function handler(req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "GET") {
//     res.status(200).json({ text: "Hello from Next.js!" });
//   }
// }

// export const getMetadata = (
//   tokenId: number | string
// ): Promise<AxiosResponse<Metadata>> => axios.get({});

// export const getImageURL = (tokenId: number | string) =>
//   `https://gateway.pinata.cloud/ipfs/${process.env.NEXT_PUBLIC_PINATA_IMAGE_CID}/${tokenId}.png`;
