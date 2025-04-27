"use client"

interface CopyProps {
    onClick: () => void,
    copyLogicBefore: string,
    copyLogicAfter: string,
    textBefore: string,
    textAfter: string
}

export function CopyMnemonicButton({ textBefore, textAfter, copyLogicBefore, copyLogicAfter, onClick }: CopyProps){
    return <button
    onClick={onClick}
    className="cursor-pointer px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 group relative"
    >
        <span className={`${copyLogicBefore}`}>{textBefore}</span>
        <span className={`absolute inset-0 flex items-center justify-center ${copyLogicAfter} transition-opacity`}>{textAfter}</span>
    </button>
}