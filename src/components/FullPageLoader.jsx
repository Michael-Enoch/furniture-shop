import { Player } from "@lottiefiles/react-lottie-player";

const FullPageLoader = () => {
  return (
    <div
      role="alert"
      aria-busy="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F3EFEB] text-[#3A2F2A] animate-fadeIn"
    >
      <Player
        autoplay
        loop
        src="/lottie.json"
        className="w-50 h-50 opacity-90"
        style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
      />
    </div>
  );
};

export default FullPageLoader;
