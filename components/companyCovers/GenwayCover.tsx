import { Frame, Noise } from "./common";

export default function GenwayCover() {
  return (
    <Frame>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/genway-card-cover.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <Noise />
    </Frame>
  );
}
