"use client";

type WhiteButtonProps = {
    text: string;
    onClick?: () => void;
};

export function WhiteButton({ text, onClick }: WhiteButtonProps) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-1.5 bg-white text-black rounded-sm cursor-pointer"
        >
            {text}
        </button>
    );
}
