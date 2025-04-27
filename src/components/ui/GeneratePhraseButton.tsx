"use client"

interface PhraseButtonProps {
    text: string,
    onClick: () => void
}

export function GeneratePhraseButton({ text, onClick }: PhraseButtonProps) {
    return <button
    onClick={onClick}
      className="cursor-pointer px-5 py-1.5 rounded-sm bg-white hover:bg-[#e4e4e4] text-black hover:text-[#000] font-medium transition-all duration-200"
  >
    {text}
  </button>
}