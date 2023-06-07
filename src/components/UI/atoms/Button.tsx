import { MouseEventHandler, PropsWithChildren } from "react";

type Props = {
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  style?: string;
};

export default function Button({
  clickHandler,
  style,
  children,
}: PropsWithChildren<Props>) {
  return (
    <button
      onClick={clickHandler}
      className={`transition-opacity duration-300 ease-in-out px-3 py-1 border rounded hover:opacity-50 ${
        style ? style : ""
      }`}
    >
      {children}
    </button>
  );
}
