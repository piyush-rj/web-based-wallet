"use client"

interface CreateWalletProps {
    text: string,
    onClick: () => void,
    disabled: boolean,
    logic: string,
}

export function CreateSolWalletButton({ text, onClick, disabled, logic }: CreateWalletProps) {
    return <button
    onClick={onClick}
    disabled={disabled}
    className={`cursor-pointer px-5 py-2.5 bg-[#e3e3e3] hover:bg-[#c8c8c8] text-black font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-900/50 ${logic}`}
>
    {text}
</button>
}