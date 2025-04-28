"use client"

interface PhraseButtonProps {
    text: string,
    onClick: () => void
}

export function GeneratePhraseButton({ text, onClick }: PhraseButtonProps) {
    return <button
    onClick={onClick}
      className="cursor-pointer px-5 py-1.5 rounded-sm bg-[#e4e4e4] text-black hover:bg-[#1c1c1c] hover:text-[#e4e4e4] font-medium transform transition-all duration-200"
  >
    {text}
  </button>
}