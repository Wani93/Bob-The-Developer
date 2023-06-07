"use client";

import GaugeBar from "./UI/atoms/GaugeBar";
import StatusItem from "./UI/atoms/StatusItem";
import { useEffect, useState } from "react";
import { useMetamask } from "@/hooks/useMetamask";
import { useContract } from "@/hooks/useContract";

export default function Status() {
  const { wallet } = useMetamask();
  const [status, setStatus] = useState({ value: 0, max: 40, percent: 0 });
  const { currentTokens, totalTokens, updateState } = useContract();

  useEffect(() => {
    const fetchStatus = async () => {
      await updateState();

      setStatus({
        value: currentTokens,
        max: totalTokens,
        percent: +((currentTokens / totalTokens) * 100).toFixed(1),
      });
    };

    debugger;
    if (wallet.accounts.length) {
      fetchStatus();
    }
  }, [wallet, currentTokens, totalTokens]);

  return (
    <div className="my-10">
      <div className="flex gap-4 mt-10">
        <h2 className="text-5xl text-gauge-green">
          Minted <br /> Bobs
        </h2>
        {!!wallet.accounts.length && <StatusItem {...status} />}
        {!wallet.accounts.length && (
          <StatusItem>
            <span className="text-8xl">?</span>{" "}
          </StatusItem>
        )}
      </div>
      {!!wallet.accounts.length && <GaugeBar percent={status.percent} />}
    </div>
  );
}
