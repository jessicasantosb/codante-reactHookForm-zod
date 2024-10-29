import { ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button">;

export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
