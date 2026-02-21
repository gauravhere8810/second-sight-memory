import Webcam from "react-webcam";
import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, CameraOff } from "lucide-react";
import { useFaceDetection } from "@/hooks/use-face-detection";
import { Detection } from "@mediapipe/tasks-vision";

const VisionLayer = () => {
  const [hasCamera, setHasCamera] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync videoRef with webcamRef's internal video element
  useEffect(() => {
    if (webcamRef.current?.video) {
      videoRef.current = webcamRef.current.video;
    }
  }, [webcamRef.current?.video]);

  const handleDetections = useCallback((detections: Detection[]) => {
    const canvas = canvasRef.current;
    if (!canvas || !videoRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const video = videoRef.current;

    // Set canvas dimensions to match video
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (detections.length === 0) return;

    ctx.strokeStyle = "#00FF00"; // Neon Green
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00FF00";

    detections.forEach((detection) => {
      const boundingBox = detection.boundingBox;
      if (boundingBox) {
        const { originX, originY, width, height } = boundingBox;
        ctx.strokeRect(originX, originY, width, height);
      }
    });
  }, []);

  useFaceDetection(videoRef, handleDetections);

  return (
    <div className="fixed inset-0 z-0">
      {hasCamera ? (
        <div className="relative h-full w-full">
          <Webcam
            audio={false}
            mirrored
            ref={webcamRef}
            className="h-full w-full object-cover"
            videoConstraints={{
              facingMode: "user",
              width: 1920,
              height: 1080,
            }}
            onUserMediaError={() => setHasCamera(false)}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            style={{ transform: "scaleX(-1)" }} // Mirror the canvas to match the mirrored webcam
          />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-background">
          <CameraOff className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="font-display text-xs tracking-widest text-muted-foreground/60">
            {error || "CAMERA FEED UNAVAILABLE"}
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
