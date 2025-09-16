import { Frame, Noise } from "./common";

export default function LeelaCover() {
  return (
    <Frame>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/leela-card-cover.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <Noise />
    </Frame>
  );
}
