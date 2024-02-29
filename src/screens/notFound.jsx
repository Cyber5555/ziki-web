import { Player, Controls } from "@lottiefiles/react-lottie-player";

export const NotFound = () => {
  return (
    <div style={{ height: "80vh", width: "100vw" }}>
      <Player
        autoplay
        loop
        src="https://Assets7.lottiefiles.com/packages/lf20_cr9slsdh.json"
        style={{ height: "80vh", width: "100%" }}
        controls={false}>
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
};
