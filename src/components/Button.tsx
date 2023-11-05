"use client"

import { ComponentProps } from "react";

type ButtonRootProps = ComponentProps<'button'>;

export function ButtonRoot(props: ButtonRootProps) {
  return (
    <button
      className="cursor-pointer my-6 text-white bg-zinc-600 hover:bg-zinc-900 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center border-2 border-zinc-700"
      {...props}
    />
  );
}

type ButtonTextProps = ComponentProps<'span'>;

export function ButtonText(props: ButtonTextProps) {
  return <span {...props} />;
}

type ButtonIconProps = ComponentProps<'div'>;

export function ButtonIcon(props: ButtonIconProps) {
  return <div className="h-5 w-5 text-zinc-50 mx-1" {...props} />;
}
