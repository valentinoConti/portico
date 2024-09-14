declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.webp";

declare module "*.webm" {
  const src: string;
  export default src;
}
declare module "*.mp4" {
  const src: string;
  export default src;
}
