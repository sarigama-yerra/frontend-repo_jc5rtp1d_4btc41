import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full grid place-items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
          AURA — your calm space to feel, breathe, and be heard
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600">
          I’m here to listen with empathy and share gentle, evidence-based tools like grounding, breathwork, and mindful reframing.
        </p>
        <div className="mt-6 inline-flex items-center gap-3">
          <a href="#chat" className="rounded-full px-5 py-2.5 bg-neutral-900 text-white text-sm shadow-sm hover:bg-neutral-800 transition-colors">
            Start a supportive chat
          </a>
          <a href="#tools" className="rounded-full px-5 py-2.5 bg-white text-neutral-900 border border-neutral-200 text-sm shadow-sm hover:bg-neutral-50 transition-colors">
            Explore coping tools
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/90" />
    </section>
  );
}
