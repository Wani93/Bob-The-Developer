"use client";

import { MetaMaskContextProvider } from "@/hooks/useMetamask";
import { ContractContextProvider } from "@/hooks/useContract";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <MetaMaskContextProvider>
      <ContractContextProvider>{children}</ContractContextProvider>
    </MetaMaskContextProvider>
  );
}
