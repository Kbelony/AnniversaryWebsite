import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

// Nous allons créer des versions simplifiées des composants UI
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Video from "../assets/0a55aa14b75140138f71e60d842fda3f.mp4";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Données du quiz
const quizData = [
  {
    question: "Which is our first date? ",
    options: ["1", "2", "3", "4"],
    images: [
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4349.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4140.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4230.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4282.jpg?raw=true",
    ],
  },
  {
    question: "Which date is your favorite ?",
    options: ["1", "2", "3", "4"],
    images: [
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4210.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4230.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4270.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4292.jpg?raw=true",
    ],
  },
  {
    question: "Whose music did we first listen together? ",
    options: ["SZA", "Franck Ocean", "Daniel Ceasar", "Future"],
    images: [
      "https://th.bing.com/th/id/OIP.bl3Pp1IL3bxoR52SbLA4LAAAAA?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.DW_jxuY6hLmKgRFDGZQa_wHaJP?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.ORijL15eAbbnDnELdB9W2gHaHa?rs=1&pid=ImgDetMain",
      "https://i.pinimg.com/originals/ef/3a/d3/ef3ad37a7be2d43a113cacd15bb06a5f.jpg",
    ],
  },
  {
    question: "When did we become official? ",
    options: ["Oct 12", "Oct 20", "Oct 25", "Oct 18"],
    images: [
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4256.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4321.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4346.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4282.jpg?raw=true",
    ],
  },
  {
    question: "Which meal is your favorite?",
    options: ["1", "2", "3", "4"],
    images: [
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4210.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4349.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4282.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4321.jpg?raw=true",
    ],
  },
  {
    question: "Which fob would you rather have on your birthday?",
    options: ["1", "2"],
    images: [
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_0201.jpg?raw=true",
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4467.JPG?raw=true",
    ],
  },

  // Ajoutez 8 autres objets similaires pour avoir 10 étapes au total
];

export default function QuizProgressionReact() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quizData.length).fill(null)
  );
  const [showVideo, setShowVideo] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const totalSteps = quizData.length;

  const handleButtonClick = (optionIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentStep] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setImagesLoaded([false, false, false, false]);
    }
  };

  const handlePreviousClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setImagesLoaded([false, false, false, false]);
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = quizData[currentStep].images.map(
        (src, index) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              setImagesLoaded((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
              resolve();
            };
            img.src = src;
          })
      );
      await Promise.all(loadPromises);
    };
    loadImages();
  }, [currentStep]);

  const renderButtons = () => {
    return quizData[currentStep].options.map((option, index) => (
      <Card
        key={index}
        className={`w-full md:max-w-xs max-w-72 mx-auto mb-4 object-cover ${
          selectedAnswers[currentStep] === index
            ? "border-4 border-green-500 rounded-xl"
            : ""
        }`}
      >
        <CardContent className="p-0" onClick={() => handleButtonClick(index)}>
          <button className="w-full p-4 text-lg rounded-tr-xl rounded-tl-xl font-semibold bg-blue-600 text-white hover:bg-blue-700">
            {option}
          </button>
          {imagesLoaded[index] ? (
            <img
              src={quizData[currentStep].images[index]}
              alt={option}
              className="w-full h-48 rounded-bl-xl rounded-br-xl"
            />
          ) : (
            <Skeleton className="w-full h-[200px] rounded-bl-xl rounded-br-xl" />
          )}
        </CardContent>
      </Card>
    ));
  };

  const isLastStepAndAnswered =
    currentStep === totalSteps - 1 && selectedAnswers[currentStep] !== null;

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche la fermeture par défaut
    setShowVideo(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 25000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {showConfetti && <ReactConfetti />}
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz Progression</h1>
      <Progress value={(currentStep / (totalSteps - 1)) * 100} />
      <p className="text-center mb-4 mt-4">
        Step {currentStep + 1} of {totalSteps}
      </p>
      {currentStep > 0 && (
        <div className="flex justify-center mb-4">
          <Button onClick={handlePreviousClick} variant="outline">
            Previous
          </Button>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {quizData[currentStep].question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderButtons()}
      </div>
      <div className="mt-6 flex justify-center">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              disabled={!isLastStepAndAnswered}
              onClick={() => setIsDialogOpen(true)}
            >
              {isLastStepAndAnswered
                ? "End quiz"
                : "Complete the quiz to continue"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            {!showVideo ? (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle>Congratulations!</AlertDialogTitle>
                  <AlertDialogDescription>
                    You've completed the quiz. Would you like to see the reward?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button onClick={handleContinue}>Continue</Button>
                </AlertDialogFooter>
              </>
            ) : (
              <div className="w-full aspect-video">
                <video controls className="w-full h-full">
                  <source src={Video} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
