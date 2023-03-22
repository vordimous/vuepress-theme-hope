import { isString } from "@vuepress/shared";

export const getDate = (input?: string | number): Date | null => {
  if (input) {
    const date = Date.parse(
      typeof input === "number"
        ? input.toString()
        : isString(input)
        ? input
        : ""
    );

    if (!Number.isNaN(date)) return new Date(date);
  }

  return null;
};
