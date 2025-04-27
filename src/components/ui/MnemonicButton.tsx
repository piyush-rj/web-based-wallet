"use client"

interface MnemonicButtonProp {
  text: string;
  onClick: () => void;
  disabled: boolean | undefined;
}

export function MnemonicButton({ text, onClick, disabled }: MnemonicButtonProp) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2 rounded-xl font-semibold
        ${disabled ? 
          "bg-gray-600 text-gray-300 cursor-not-allowed" :
          "bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white hover:from-[#0072ff] hover:to-[#00c6ff] hover:scale-105"
        }
        transition-all transform duration-300 shadow-md hover:shadow-lg active:scale-95`}
    >
      {text}
    </button>
  );
}
