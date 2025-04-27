"use client"

interface CopyButtonProps {
    textInitial: string,
    textFinal: string,
    onClick: () => void,
    isCopied: boolean
}

export function CopyButtonWallet({textInitial, textFinal, onClick, isCopied} : CopyButtonProps) {
    return <button
    onClick={onClick}
    className="cursor-pointer px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 relative group shadow-md"
  >
    <span className={`${isCopied ? "opacity-0" : ""} transition-opacity duration-200`}>{textInitial}</span>
    <span className={`absolute inset-0 flex items-center justify-center ${isCopied ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>{textFinal}</span>
  </button>
}