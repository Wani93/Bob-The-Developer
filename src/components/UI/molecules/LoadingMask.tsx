"use client";

import BeatLoader from "react-spinners/BeatLoader";

export default function LoadingMask() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <BeatLoader
        color="#ffffff"
        loading={true}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
