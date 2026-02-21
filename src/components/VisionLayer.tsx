import Webcam from "react-webcam";

const VisionLayer = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Webcam
        audio={false}
        mirrored
        className="h-full w-full object-cover"
        videoConstraints={{
          facingMode: "user",
          width: 1920,
          height: 1080,
        }}
      />
      {/* Scanline overlay */}
      <div className="scanline pointer-events-none absolute inset-0 z-10" />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsl(220 25% 6% / 0.6) 100%)",
        }}
      />
    </div>
  );
};

export default VisionLayer;
