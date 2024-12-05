import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../app/store";

type CurrentCountryProps = {
    onCountrySelected: (country: { country: string; capital: string }) => void;
};

export const CurrentCountry = ({ onCountrySelected }: CurrentCountryProps) => {
    const countries = useSelector((state: RootState) => state.countries.countries);
    const [currentCountry, setCurrentCountry] = useState<{ country: string; capital: string } | null>(null);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * countries.length);
        setCurrentCountry(countries[randomIndex]);
    }, [countries]);

    useEffect(() => {
        if (currentCountry) {
            onCountrySelected(currentCountry);
        }
    }, [currentCountry, onCountrySelected]);

    return (
        <div>
            <h2>{currentCountry ? `What is the capital of ${currentCountry.country}?` : "Loading..."}</h2>
        </div>
    );
};
