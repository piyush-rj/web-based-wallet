import { CopyButtonWallet } from "./CopyButtonWallet";
import { DeleteButtonWallet } from "./DeleteButtonWallet";

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
  
  export const WalletCardComponent = ({ title, createdAt, fields, onCopy, isCopied, onDelete }: WalletCardProps) => {
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
              <div className="bg-[#101010e4] p-3 rounded-lg border border-[#5b5b5b] text-[#d0d0d0] break-all text-sm transition-all duration-200 hover:border-[#6e6e6e]">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };