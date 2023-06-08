import { BrowserProvider, Contract, JsonRpcSigner, ethers } from "ethers";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import BobTheDeveloper from "../../public/BobTheDeveloper.json";

interface ContractContext {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  contract: Contract | null;
  totalTokens: number;
  currentTokens: number;
  updateState: () => Promise<void>;
}

const ContractContext = createContext<ContractContext>({} as ContractContext);

export const ContractContextProvider = ({ children }: PropsWithChildren) => {
  const [provider, setProvider] = useState<ContractContext["provider"]>(null);
  const [signer, setSigner] = useState<ContractContext["signer"]>(null);
  const [contract, setContract] = useState<ContractContext["contract"]>(null);
  const [totalTokens, setTotalTokens] = useState(40);
  const [currentTokens, setCurrentTokens] = useState(0);

  const updateState = async () => {
    if (!window.ethereum || !process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const signer = await provider!.getSigner();
    setSigner(signer);

    const contract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      BobTheDeveloper.abi,
      signer
    );
    setContract(contract);

    const [maxTokenCount, currentTokenCount] = (
      (await contract.getStatus()) as BigInt[]
    ).map((value) => Number(value));

    setTotalTokens(maxTokenCount);
    setCurrentTokens(currentTokenCount);
  };

  return (
    <ContractContext.Provider
      value={{
        provider,
        signer,
        contract,
        totalTokens,
        currentTokens,
        updateState,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);

  return context;
};
