import { Button } from "@/components/ui/button";
import "./assets/scss/style.scss";
import { useState, useEffect, lazy, Suspense } from "react";
import ReactConfetti from "react-confetti";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ModeToggle } from "./components/ui/mode-toggle";

const Quizz = lazy(() => import("./pages/quizz"));

function App() {
  const [timeLeft, setTimeLeft] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showQuizz, setShowQuizz] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date(now.getFullYear(), 9, 24); // 9 représente octobre (0-indexé)
      if (now > target) target.setFullYear(target.getFullYear() + 1);

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setIsTimeUp(true);
        clearInterval(timer);
        setTimeLeft("C'est l'heure !");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${days}j ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 25000);
  };

  const handleOpenQuizz = () => {
    setShowQuizz(true);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <Suspense fallback={<div>Chargement...</div>}>
        {showQuizz ? (
          <div className="fade-in">
            <Quizz />
          </div>
        ) : (
          <div className="hero_section mt-52 xl:mt-80">
            {showConfetti && <ReactConfetti />}
            <div className="flex text-center flex-col items-center justify-center">
              <h1 className="text-4xl font-bold mb-4">Tic Tac ⏰ !</h1>
              <h5 className="px-3 xl:px-96 underline">
                {isTimeUp
                  ? "QUOI ELLE A 22 ANS ? C'EST BON ? ON DIRAIT BIEN QUE LE SITE PEUT S'OUVRIR ALORS  🎉"
                  : "Elle a 22 ans ? Apparement non pas encore il lui reste encore un peu de temps, le site ne s'ouvrira pas tant qu'elle n'aura pas soufflé ses bougies. "}
              </h5>
              <h1 className="text-4xl md:text-7xl mt-6 font-bold mb-8">
                {timeLeft}
              </h1>
              <Button
                variant="outline"
                onClick={isTimeUp ? handleOpenQuizz : handleConfetti}
              >
                {isTimeUp ? "OUVRIR LE SITE " : "En attendant 🎉"}
              </Button>
            </div>
          </div>
        )}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
