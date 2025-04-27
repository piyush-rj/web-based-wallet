"use client"

interface RevealWalletProps {
    text: string,
    onClick: () => void,
}

export function RevealWalletsButton({ text, onClick }: RevealWalletProps) {
    return <button
    onClick={onClick}
    className="cursor-pointer text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200"
    >
        {text}
    </button>
}