"use client"

interface DeleteButtonProps {
    text: string,
    onClick: () => void,
}

export function DeleteMnemonicButton({ text, onClick }: DeleteButtonProps){
    return <button
    onClick={onClick}
    className="cursor-pointer px-5 py-2.5 bg-red-900 hover:bg-red-800 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-red-900/50"
    >
        {text}
    </button>
}