type AnswerOptionsProps = {
    options: string[];
    correctCapital: string;
    onAnswerSelected: (isCorrect: boolean) => void;
};

export const AnswerOptions = ({ options, correctCapital, onAnswerSelected }: AnswerOptionsProps) => {
    const handleClick = (option: string) => {
        onAnswerSelected(option === correctCapital);
    };

    return (
        <div>
            <ul>
                {options.map((option, index) => (
                    <li key={index} onClick={() => handleClick(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};
