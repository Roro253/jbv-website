import { Frame, Noise } from "./common";

export default function AnthropicCover() {
  return (
    <Frame>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/anthropic-card-cover.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <Noise />
    </Frame>
  );
}

