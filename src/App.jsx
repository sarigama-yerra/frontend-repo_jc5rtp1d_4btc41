import Header from './components/Header';
import Hero from './components/Hero';
import Tools from './components/Tools';
import Chat from './components/Chat';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <main>
        <Hero />
        <Tools />
        <Chat />
      </main>
      <Footer />
    </div>
  );
}

export default App;
