import LottiePlayer from "react-lottie-player";

interface FullscreenLottiePlayerProps {
  lottieJson: any;
}

export default function FullscreenLottiePlayer(
  props: FullscreenLottiePlayerProps
) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 overflow-hidden z-9999">
      <LottiePlayer
        animationData={props.lottieJson}
        play={true}
        speed={1}
        loop={true}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          maxWidth: "250px",
          maxHeight: "250px",
        }}
      />
    </div>
  );
}
