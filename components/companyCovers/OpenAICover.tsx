import { Frame, Noise } from "./common";

export default function OpenAICover() {
  return (
    <Frame>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/open-ai-cover-card.mp4" type="video/mp4" />
      </video>
      <Noise />
    </Frame>
  );
}
