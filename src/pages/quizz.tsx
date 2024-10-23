import React, { useState, useEffect } from "react";

// Nous allons créer des versions simplifiées des composants UI
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

// Données du quiz
const quizData = [
  {
    question: "Quelle est la capitale de la France ?",
    options: ["Paris", "Londres", "Berlin", "Madrid"],
    images: [
      "https://via.placeholder.com/300x200?text=Paris",
      "https://via.placeholder.com/300x200?text=Londres",
      "https://via.placeholder.com/300x200?text=Berlin",
      "https://via.placeholder.com/300x200?text=Madrid",
    ],
  },
  {
    question: "Quel est le plus grand océan du monde ?",
    options: ["Pacifique", "Atlantique", "Indien", "Arctique"],
    images: [
      "https://via.placeholder.com/300x200?text=Pacifique",
      "https://via.placeholder.com/300x200?text=Atlantique",
      "https://via.placeholder.com/300x200?text=Indien",
      "https://via.placeholder.com/300x200?text=Arctique",
    ],
  },
  // Ajoutez 8 autres objets similaires pour avoir 10 étapes au total
];

export default function QuizProgressionReact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState([
    false,
    false,
    false,
    false,
  ]);
  const totalSteps = quizData.length;

  const handleButtonClick = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setImagesLoaded([false, false, false, false]);
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = quizData[currentStep].images.map(
        (src, index) =>
          new Promise((resolve) => {
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
      <Card key={index} className="w-full max-w-xs mx-auto mb-4">
        <CardContent className="p-0">
          <button
            onClick={handleButtonClick}
            className="w-full p-4 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700"
          >
            {option}
          </button>
          {imagesLoaded[index] ? (
            <img
              src={quizData[currentStep].images[index]}
              alt={option}
              className="w-full h-auto"
            />
          ) : (
            <Skeleton className="w-full h-[200px]" />
          )}
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz Progression</h1>
      <Progress value={(currentStep / (totalSteps - 1)) * 100} />
      <p className="text-center mb-4 ">
        Étape {currentStep + 1} sur {totalSteps}
      </p>
      <h2 className="text-2xl font-semibold mb-6 text-center ">
        {quizData[currentStep].question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderButtons()}
      </div>
    </div>
  );
}
