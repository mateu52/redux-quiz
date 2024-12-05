import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../app/store";

type WrongAnswersProps = {
    correctCapital: string;
    onOptionsGenerated: (options: string[]) => void;
};

export const WrongAnswers = ({ correctCapital, onOptionsGenerated }: WrongAnswersProps) => {
    const countries = useSelector((state: RootState) => state.countries.countries);
    const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

    useEffect(() => {
        const capitals = countries.map((country) => country.capital).filter((capital) => capital !== correctCapital);
        const shuffled = capitals.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3);
        setWrongAnswers(selected);
    }, [countries, correctCapital]);

    useEffect(() => {
        if (wrongAnswers.length === 3) {
            onOptionsGenerated([...wrongAnswers, correctCapital].sort(() => Math.random() - 0.5));
        }
    }, [wrongAnswers, correctCapital, onOptionsGenerated]);

    return null; // Komponent nie wyświetla niczego
};
