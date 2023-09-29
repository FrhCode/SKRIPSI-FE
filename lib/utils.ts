import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export function containsSubstringIgnoreCase(
  mainString: string,
  subString: string
) {
  const regex = new RegExp(subString, "i");
  return regex.test(mainString);
}

export type ExtractContentType<
  T extends (...args: any) => Promise<{ content: any }>
> = T extends (...args: any) => Promise<{
  content: infer R;
}>
  ? R
  : any;
