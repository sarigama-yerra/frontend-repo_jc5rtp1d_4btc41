import { Brain, Heart, NotebookPen, Wind } from "lucide-react";

const tools = [
  {
    icon: Wind,
    title: "Calming Breath",
    desc: "A 4-6 breathing pattern to downshift stress: inhale 4, exhale 6 — repeat for 1–3 minutes.",
    action: "Try now",
  },
  {
    icon: Brain,
    title: "Grounding 5-4-3-2-1",
    desc: "Notice 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste to anchor in the present.",
    action: "Guide me",
  },
  {
    icon: NotebookPen,
    title: "Thought Reframe",
    desc: "A gentle CBT check: evidence for/against, a kinder alternative thought, and next step.",
    action: "Practice",
  },
  {
    icon: Heart,
    title: "Self‑Compassion",
    desc: "Place a hand on your heart, name the feeling, offer kindness as you would to a friend.",
    action: "Begin",
  },
];

export default function Tools() {
  return (
    <section id="tools" className="relative py-16 sm:py-20 bg-gradient-to-b from-white to-violet-50/60">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 text-center">Evidence‑based coping tools</h2>
        <p className="mt-2 text-neutral-600 text-center max-w-2xl mx-auto">
          Brief, research‑supported practices you can use anytime to steady your mind and body.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(({ icon: Icon, title, desc, action }) => (
            <div key={title} className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-orange-400 text-white grid place-items-center shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-medium text-neutral-900">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{desc}</p>
              <button className="mt-4 text-sm font-medium text-purple-700 hover:text-purple-800">{action} →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
