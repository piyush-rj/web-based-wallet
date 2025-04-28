import { useState } from "react";
import { CopyButtonWallet } from "./CopyButtonWallet";
import { DeleteButtonWallet } from "./DeleteButtonWallet";
import { Eye, EyeOff } from "lucide-react";

interface Field {
  label: string;
  value: string;
}

interface WalletCardProps {
  title: string;
  createdAt: string;
  fields: Field[];
  onCopy: () => void;
  isCopied: boolean;
  onDelete: () => void;
}

export const WalletCardComponent = ({
  title,
  createdAt,
  fields,
  onCopy,
  isCopied,
  onDelete,
}: WalletCardProps) => {
  const [visibleFields, setVisibleFields] = useState<{ [key: number]: boolean }>(() => {
    const initialVisibility: { [key: number]: boolean } = {};
    fields.forEach((field, index) => {
      if (field.label.toLowerCase().includes("private key")) {
        initialVisibility[index] = false; 
      } else {
        initialVisibility[index] = true; 
      }
    });
    return initialVisibility;
  });

  const toggleVisibility = (index: number) => {
    setVisibleFields(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="border border-[#6e6e6e] rounded-xl overflow-hidden bg-black transition-all duration-300 hover:border-[#a7a7a7] hover:shadow-lg">
      <div className="bg-gray-850 p-5 border-b border-[#6e6e6e] flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-400 mt-1">Created: {createdAt}</p>
        </div>
        <div className="flex gap-3">
          <CopyButtonWallet textInitial="Copy" textFinal="Copied" onClick={onCopy} isCopied={isCopied} />
          <DeleteButtonWallet onClick={onDelete} text="Delete" />
        </div>
      </div>

      <div className="p-5 space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <div className="text-sm font-medium text-gray-400 mb-2">
              {field.label}
            </div>
            <div className="relative">
              <div className="bg-[#101010e4] p-3 rounded-lg border border-[#5b5b5b] text-[#d0d0d0] break-all text-sm transition-all duration-200 hover:border-[#6e6e6e] pr-10">
                {visibleFields[index] ? field.value : "•".repeat(field.value.length)}
              </div>
              {field.label.toLowerCase().includes("private key") && (
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => toggleVisibility(index)}
                >
                  {visibleFields[index] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
