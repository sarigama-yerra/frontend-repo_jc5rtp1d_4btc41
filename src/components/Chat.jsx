import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

const AURA_SYSTEM = `You are AURA, an empathetic and emotionally intelligent mental health support chatbot.
- Empathy first.
- Safety and sensitivity: if user mentions self-harm or crisis, encourage immediate help (988 in U.S.) with warm concern.
- No diagnosis or medication advice.
- Offer brief, evidence-based coping tools (breathing, grounding, CBT reframing, journaling, mindfulness).
- Warm, calm, non-judgmental tone.
- Mirror user's tone while guiding toward safety and constructive coping.`;

function Message({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`${isUser ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} max-w-[80%] rounded-2xl px-4 py-2.5 border ${isUser ? 'border-neutral-900' : 'border-neutral-200'} shadow-sm`}> 
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I’m AURA. I’m here to listen with care. What’s on your mind today?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: 'user', content: input.trim() }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: AURA_SYSTEM },
            ...newMessages,
          ],
          max_tokens: 300,
          temperature: 0.6,
        }),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      const reply = data.reply || "I'm here with you. How can I support you right now?";

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      // fallback local response for resilience
      const userText = input.toLowerCase();
      const crisis = /(suicide|kill myself|self-harm|end it|hurt myself)/i.test(userText);
      let reply = '';
      if (crisis) {
        reply = "I’m really sorry you’re feeling this much pain. You deserve care and safety. If you’re in immediate danger, please reach out to someone you trust or contact your local emergency number or suicide hotline (for example, 988 in the U.S.). Would you like me to share more crisis resources with you?";
      } else if (/breath|breathe|anx/i.test(userText)) {
        reply = "Let’s try a gentle 4–6 breath for about a minute: inhale through the nose for a count of 4… pause… and exhale slowly for a count of 6. If it helps, place a hand on your chest and feel the rise and fall. How does that feel right now?";
      } else if (/ground|panic|overwhelm/i.test(userText)) {
        reply = "We can do a quick 5‑4‑3‑2‑1 grounding: name 5 things you see, 4 you can touch, 3 you hear, 2 you can smell, and 1 you can taste. Share a few with me and we’ll go through it together.";
      } else if (/negative|thought|worry|fear|ruminate/i.test(userText)) {
        reply = "Let’s softly reframe: What’s one thought that’s been heavy? What’s the evidence for and against it? If a close friend had this thought, what kind, balanced response would you offer them?";
      } else {
        reply = "Thank you for sharing that. I’m listening. What feels hardest about this right now? We can take it one small step at a time.";
      }
      reply = reply + "\n\n(Kind reminder: I’m a supportive companion, not a substitute for professional care.)";
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 text-center">A gentle space to talk</h2>
        <p className="mt-2 text-neutral-600 text-center">I’ll respond with empathy, practical tools, and encouragement. If you mention crisis or self‑harm, I’ll guide you to immediate help.</p>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div ref={listRef} className="h-[360px] overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => <Message key={i} role={m.role} content={m.content} />)}
          </div>

          <form onSubmit={sendMessage} className="border-t border-neutral-200 p-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-sm hover:bg-neutral-800 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {loading ? 'Sending…' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
