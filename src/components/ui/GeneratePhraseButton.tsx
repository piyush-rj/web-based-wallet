"use client"

interface PhraseButtonProps {
    text: string,
    onClick: () => void
}

export function GeneratePhraseButton({ text, onClick }: PhraseButtonProps) {
    return <button
    onClick={onClick}
    className="cursor-pointer px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-indigo-900/50"
  >
    {text}
  </button>
}