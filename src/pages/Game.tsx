import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { RootState } from "../app/store";

export const Game = () => {
    const countries = useSelector((state: RootState) => state.countries.countries);
    const [currentQuestion, setCurrentQuestion] = useState<{
        country: string;
        correctCapital: string;
        options: string[];
    } | null>(null);
    const [score, setScore] = useState(0);

    // Funkcja generująca pytania
    const generateQuestion = useCallback(() => {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const capitals = countries.map((country) => country.capital);
        const wrongAnswers = capitals
            .filter((capital) => capital !== randomCountry.capital)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const options = [...wrongAnswers, randomCountry.capital].sort(() => Math.random() - 0.5);

        setCurrentQuestion({
            country: randomCountry.country,
            correctCapital: randomCountry.capital,
            options,
        });
    }, [countries]); // `countries` jako zależność, ponieważ jest używane wewnątrz funkcji

    // Inicjalizacja gry
    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]); // Brak ostrzeżenia, ponieważ `generateQuestion` jest stabilny dzięki `useCallback`

    const handleAnswer = (selectedOption: string) => {
        if (currentQuestion) {
            if (selectedOption === currentQuestion.correctCapital) {
                alert("Correct!");
                setScore(score + 1);
            } else {
                alert(`Wrong! The correct answer was ${currentQuestion.correctCapital}.`);
            }
            generateQuestion(); // Generuje nowe pytanie
        }
    };

    if (!currentQuestion) return <p>Loading...</p>;

    return (
        <div>
            <h1>Capital Quiz</h1>
            <p>Score: {score}</p>
            <h2>What is the capital of {currentQuestion.country}?</h2>
            <ul className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                    <li className="bg-gray-300" key={index} onClick={() => handleAnswer(option)}>
                        <p className="my-2">{option}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

