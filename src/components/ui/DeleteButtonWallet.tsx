"use client"

interface DeleteButtonProps {
    text: string,
    onClick: () => void,
}

export function DeleteButtonWallet({text, onClick}: DeleteButtonProps){
    return <button onClick={onClick} className="cursor-pointer px-4 py-2 text-sm bg-red-900/30 hover:bg-red-800/50 text-red-400 hover:text-red-300 rounded-lg transition-all duration-300 shadow-md">
        {text}
    </button>
}