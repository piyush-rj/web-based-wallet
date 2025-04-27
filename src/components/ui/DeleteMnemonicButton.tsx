"use client"

interface DeleteButtonProps {
    text: string,
    onClick: () => void,
}

export function DeleteMnemonicButton({ text, onClick }: DeleteButtonProps){
    return <button
    onClick={onClick}
    className="cursor-pointer px-5 py-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 font-medium rounded-xs transition-all duration-250 "
    >
        {text}
    </button>
}