import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../src/app/store"; // Upewnij się, że importujesz poprawny typ RootState

export const Answers = () => {
    const countries = useSelector((state: RootState) => state.countries.countries);
    const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * countries.length));
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);

    const handleAnswer = () => {
        const currentCountry = countries[currentIndex];

        if (userInput.toLowerCase() === currentCountry.capital.toLowerCase()) {
            alert("Correct!");
            setScore(score + 1);
        } else {
            alert(`Wrong! The capital of ${currentCountry.country} is ${currentCountry.capital}.`);
        }

        // Losuj nowy kraj
        setCurrentIndex(Math.floor(Math.random() * countries.length));
        setUserInput("");
    };

    return (
        <div>
            <h2>What is the capital of {countries[currentIndex].country}?</h2>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={handleAnswer}>Submit</button>
            <p>Score: {score}</p>
        </div>
    );
};