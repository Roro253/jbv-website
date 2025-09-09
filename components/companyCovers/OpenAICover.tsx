import { Frame, Noise } from "./common";

export default function OpenAICover() {
  return (
    <Frame>
      <video
        className="absolute inset-0 h-full w-full rounded-2xl object-cover"
        src="/open-ai-cover-card.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <Noise />
    </Frame>
  );
}
