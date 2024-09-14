/**
 * Transforms a string to title case (first letter of each word capitalized, rest lowercase).
 */
export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
