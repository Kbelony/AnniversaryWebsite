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
    question: "Quelle est l'artiste preferé de Naëlla ?",
    options: ["Travis Scott", "The Weeknd", "Lana del Rey", "Jul"],
    images: [
      "https://github.com/Kbelony/AnniversaryWebsite/blob/main/src/assets/img/IMG_4349.jpeg",
      "https://static.billboard.com/files/2021/05/the-weeknd-uncut-gems-billboard-1548-1620053830-compressed.jpg",
      "https://th.bing.com/th/id/OIP.foQJGz5vW7lUZpIT3htuDgHaE8?rs=1&pid=ImgDetMain",
      "https://www.booska-p.com/wp-content/uploads/2022/06/Jul-Bonus-Visu-News.jpg",
    ],
  },
  {
    question: "Quel est la ville preferé des Etat-Unis de Naëlla ?",
    options: ["Portland", "Seattle", "New-York", "Los Angeles"],
    images: [
      "https://th.bing.com/th/id/R.fcb34a831a7775998c1e6a55b26744b0?rik=SUML3QHSKKi%2bzw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-bsGyiC2om7Q%2fU673fdqPBsI%2fAAAAAAAATaA%2fdDnZQDEo1uk%2fs1600%2fHawthorneBridgeYAA.jpg&ehk=068k20XuR4umQAIOaSBcJLtLjfr4B0%2f%2fj49Yu9y2768%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.4075e8ba2317ecb7290fcd32bd7e0fa0?rik=W0bnVBDE1UhRLw&riu=http%3a%2f%2fhdqwalls.com%2fdownload%2f1%2fseattle-skyline-at-night-view-4k-se.jpg&ehk=yEteKrpsz7E39jgJpWMbPhK5ysH4qynu5wu0zsF4vBE%3d&risl=1&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.0d5586871e43c7471f04813ffd37e15c?rik=cDt19I7YlxL%2f7A&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.95cb5ad5811d9f4c6ff75193c7b98816?rik=YZstRQNp86SPIw&riu=http%3a%2f%2fstatic5.businessinsider.com%2fimage%2f595aac11d62e70110206f3c8-1200%2fhollywood-los-angeles-california.jpg&ehk=1aABzP73Bkv%2fGiaI96YZzauMfYArCY4EoZdvq%2bcptbg%3d&risl=&pid=ImgRaw&r=0",
    ],
  },
  {
    question: "Quel est la serie preferé de Naëlla ?",
    options: [
      "How I Met Your Mother",
      "Gossip Girl",
      "Breaking Bad",
      "Prison Break",
    ],
    images: [
      "https://th.bing.com/th/id/R.7632040fe5ff70c3153ed8102bb07f5f?rik=8TDurhmlU79PKg&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f9%2f4%2f6%2f947601-how-i-met-your-mother-wallpapers-2048x1363-for-computer.jpg&ehk=YKh%2fd5gBghtakAKXDqSWmAW39WYX632qYUUqszkKWac%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.eddb20003fcc8c045985b95a2f04c5da?rik=T9Cq3j%2fZoYOl8w&riu=http%3a%2f%2fimages.fanpop.com%2fimages%2fimage_uploads%2fGossip-Girl-Cast-gossip-girl-373272_1024_791.jpg&ehk=wxnS%2fmKX%2fPZCARokW7rrDEgTemHpGjgyQRzaocyEtFw%3d&risl=&pid=ImgRaw&r=0",
      "https://i.gadgets360cdn.com/large/breaking-bad_1527083428047.jpg",
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/01/05/15/prison-break.jpg",
    ],
  },
  {
    question: "Quel est le film Disney Channel preferé de Naëlla ?",
    options: [
      "Camp Rock",
      "Les sorciers de Waverly Place, le film ",
      "Radio Rebel",
      "Lemonade Mouth",
    ],
    images: [
      "https://img10.hotstar.com/image/upload/f_auto/sources/r1/cms/prod/3363/1563363-i-e6264c8cc2b8",
      "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/FD393862020F783F13A789089220DA0EAA4C6335D83AEED609F46E2C14E1E73F/scale?width=1200&aspectRatio=1.78&format=jpeg",
      "https://www.mikethefanboy.com/wp-content/uploads/2012/06/radio-rebel2.jpg",
      "https://th.bing.com/th/id/R.8eb93c74c21113ecf8ff73f3e75e1230?rik=XzDxnpzwTRKtow&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f24200000%2fLemonade-Mouth-lemonade-mouth-24261258-1200-797.jpg&ehk=Xt1xhJNBJDawhuyTfDpbxTo6PxfhzVwJ6wBQMkYuNn0%3d&risl=&pid=ImgRaw&r=0",
    ],
  },
  {
    question: "Qu'est ce qu'elle prefere ?",
    options: ["Chipotle", "Cava"],
    images: [
      "https://thespoon.tech/wp-content/uploads/2019/04/Chipotle0-3946c9f45056a36_3946cb74-5056-a36a-07f2a379113ce8ec.jpg",
      "https://hedonistshedonist.com/wp-content/uploads/2016/07/27905133471_af4e7d2e05_z.jpg",
    ],
  },
  {
    question: "Lequel est Malcom X ?",
    options: ["1", "2", "3", "4"],
    images: [
      "https://static01.nyt.com/images/2020/02/09/nyregion/09Malcolm1/07malcolmx20-superJumbo.jpg?quality=90&auto=webp",
      "https://i0.wp.com/rayhaber.com/wp-content/uploads/2020/07/Nelson-Mandela-Kimdir.jpg?fit=1424%2C800&ssl=1",
      "https://cdn.cnn.com/cnn/interactive/2018/04/us/martin-luther-king-jr-cnnphotos/media/01.jpg",
      "https://areajugones.sport.es/wp-content/uploads/2021/02/muhammad-ali-facebook.jpg",
    ],
  },
  {
    question: "Quel est le meilleur concert de sa vie ?",
    options: [
      "CELUI DE DON TOLIVER ?",
      "DON TOLIVER ?",
      "EUHHH TOLIVER DON ?",
      "REVILOT NOD ?",
    ],
    images: [
      "https://www.rollingstone.com/wp-content/uploads/2023/03/HenryHwu_@HenryHwu_Dontoliver-06.jpg?w=1600&h=900&crop=1",
      "https://www.rollingstone.com/wp-content/uploads/2023/03/HenryHwu_@HenryHwu_Dontoliver-06.jpg?w=1600&h=900&crop=1",
      "https://www.rollingstone.com/wp-content/uploads/2023/03/HenryHwu_@HenryHwu_Dontoliver-06.jpg?w=1600&h=900&crop=1",
      "https://www.rollingstone.com/wp-content/uploads/2023/03/HenryHwu_@HenryHwu_Dontoliver-06.jpg?w=1600&h=900&crop=1",
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
        className={`w-full md:max-w-xs max-w-72 mx-auto mb-4 ${
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
        Étape {currentStep + 1} sur {totalSteps}
      </p>
      {currentStep > 0 && (
        <div className="flex justify-center mb-4">
          <Button onClick={handlePreviousClick} variant="outline">
            Précédent
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
                ? "Terminer le quiz"
                : "Finalisez le quiz pour continuer"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            {!showVideo ? (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle>Félicitations !</AlertDialogTitle>
                  <AlertDialogDescription>
                    Vous avez terminé le quiz. Voulez-vous voir la récompense ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button onClick={handleContinue}>Continuer</Button>
                </AlertDialogFooter>
              </>
            ) : (
              <div className="w-full aspect-video">
                {/* <video controls className="w-full h-full">
                  <source src={Video} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video> */}
              </div>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
