import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  className?: string;
}

function Root({ children, className }: Props) {
  return <div className={cn("", className)}>{children}</div>;
}

function Content({ children, className }: Props) {
  return (
    <div className={cn("mx-auto max-w-7xl px-[10vw]", className)}>
      {children}
    </div>
  );
}

const Container = { Root, Content };

export default Container;
