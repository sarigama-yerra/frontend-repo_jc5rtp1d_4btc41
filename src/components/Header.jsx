import { Heart, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-orange-400 grid place-items-center text-white shadow-sm">
            <Heart className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-neutral-900">AURA</p>
            <p className="text-xs text-neutral-500">Your gentle mental health companion</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-neutral-600">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <span>Empathy • Safety • Support</span>
        </div>
      </div>
    </header>
  );
}
