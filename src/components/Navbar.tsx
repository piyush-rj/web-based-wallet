export function Navbar() {
    return (
        <div className="flex justify-start items-center text-[#e4e4e4] text-[28px] font-semibold tracking-wider h-20 w-full border-b border-gray-800 gap-x-2 pl-8">

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                style={{ fill: "#c8c8c8" }}
                className="drop-shadow-lg"
            >
                <path d="M6 3h2v2H6zm2 16h3v2H8zm8-16h2v2h-2zm-3 16h3v2h-3zm7-8V9h-2V7h-2V5h-2v2h-4V5H8v2H6v2H4v2H2v8h2v-4h2v4h2v-3h8v3h2v-4h2v4h2v-8zm-10 1H8V9h2zm6 0h-2V9h2z" />
            </svg>

            <p className="text-[#c8c8c8]">NexWallet</p>

        </div>
    )
}
