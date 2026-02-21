import Webcam from "react-webcam";
import { useState } from "react";
import { Camera, CameraOff } from "lucide-react";

const VisionLayer = () => {
  const [hasCamera, setHasCamera] = useState(true);

  return (
    <div className="fixed inset-0 z-0">
      {hasCamera ? (
        <Webcam
          audio={false}
          mirrored
          className="h-full w-full object-cover"
          videoConstraints={{
            facingMode: "user",
            width: 1920,
            height: 1080,
          }}
          onUserMediaError={() => setHasCamera(false)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-background">
          <CameraOff className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="font-display text-xs tracking-widest text-muted-foreground/60">
            CAMERA FEED UNAVAILABLE
          </p>
          <p className="mt-2 max-w-xs text-center text-[10px] text-muted-foreground/40">
            Grant camera permissions or open in a new tab to enable live feed
          </p>
          {/* Animated grid background as fallback */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      )}
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
