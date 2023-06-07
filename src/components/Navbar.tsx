"use client";

import { useMetamask } from "@/hooks/useMetamask";
import Link from "next/link";
import Button from "./UI/atoms/Button";

export default function Navbar() {
  const { wallet, hasProvider, connectMetaMask } = useMetamask();
  const openMetaMaskDownload = () => {
    window.open("https://metamask.io/download/");
  };

  return (
    <nav className="flex justify-between py-4 text-3xl items-center mb-12">
      <Link href="/">Bob The Developer</Link>

      <div className="flex gap-2">
        {!hasProvider && (
          <Button clickHandler={openMetaMaskDownload}>Install MetaMask</Button>
        )}
        {hasProvider && !wallet.accounts.length && (
          <Button clickHandler={connectMetaMask}>Connect</Button>
        )}
        {hasProvider && !!wallet.accounts.length && (
          <Button>
            <Link href="/assets/list">View</Link>
          </Button>
        )}
        {hasProvider && !!wallet.accounts.length && (
          <Button style="bg-gauge-green border-transparent text-black">
            <Link href="/assets/mint">Mint</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
