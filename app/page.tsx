import Hero from "@/components/Hero";
export default function Home() {
  return (
    <main>
      <Hero />
      <section className="container-6xl pb-16">
        <h2 className="text-xl font-semibold mb-4">What we do</h2>
      <p className="prose-muted max-w-2xl">
        We partner with founders from seed through early stages across AI, enterprise, fintech, consumer, and more.
        This starter focuses on layout, navigation, and animation patterns—not content.
      </p>
      </section>
    </main>
  );
}
