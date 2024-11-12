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
      const target = new Date(now.getFullYear(), 10, 13, 0, 0, 0, 0); // 10 représente novembre (0-indexé)
      if (now > target) target.setFullYear(target.getFullYear() + 1);

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setIsTimeUp(true);
        clearInterval(timer);
        setTimeLeft("C'est l'heure !");
        console.log("Le temps est écoulé !"); // Ajout d'un log pour le débogage
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

  // Ajout d'un useEffect pour surveiller les changements de isTimeUp
  useEffect(() => {
    console.log("isTimeUp a changé :", isTimeUp);
  }, [isTimeUp]);

  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 25000);
  };

  const handleOpenQuizz = () => {
    setShowQuizz(true);
  };

  // Fonction pour forcer isTimeUp à true (pour le test)
  const forceTimeUp = () => {
    setIsTimeUp(true);
    setTimeLeft("It's time!");
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
              <h1 className="text-4xl font-bold mb-4">
                {isTimeUp ? "መልካም ልደት ! 🎂" : "Tic Tac ⏰ !"}
              </h1>
              <h5 className="px-3 xl:px-96 underline">
                {isTimeUp
                  ? "WHAT SHE'S 20? IS THAT OK? IT LOOKS LIKE THE SITE CAN OPEN THEN 🎉"
                  : "She's 22? Apparently not yet, she still has a little time left, the site won't open until she blows out her candles."}
              </h5>
              <h1 className="text-4xl md:text-7xl mt-6 font-bold mb-8">
                {timeLeft}
              </h1>
              <Button
                variant="outline"
                onClick={isTimeUp ? handleOpenQuizz : handleConfetti}
              >
                {isTimeUp ? "OPEN SITE 🎉" : "Waiting 🎉"}
              </Button>
              {/* Bouton pour forcer isTimeUp (à des fins de test) */}
              <Button onClick={forceTimeUp} className="mt-4">
                Force elapsed time
              </Button>
            </div>
          </div>
        )}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
