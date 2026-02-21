import { useEffect, useRef, useState, useCallback } from "react";
import { FaceDetector, FilesetResolver, Detection } from "@mediapipe/tasks-vision";

export const useFaceDetection = (
    videoRef: React.RefObject<HTMLVideoElement | null>,
    onDetections?: (detections: Detection[]) => void
) => {
    const [detector, setDetector] = useState<FaceDetector | null>(null);
    const requestRef = useRef<number>();

    useEffect(() => {
        const initDetector = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
                );
                const faceDetector = await FaceDetector.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
                        delegate: "GPU",
                    },
                    runningMode: "VIDEO",
                });
                setDetector(faceDetector);
            } catch (error) {
                console.error("Error initializing MediaPipe Face Detector:", error);
            }
        };

        initDetector();

        return () => {
            detector?.close();
        };
    }, []);

    const detect = useCallback(() => {
        if (detector && videoRef.current && videoRef.current.readyState === 4) {
            const startTimeMs = performance.now();
            const results = detector.detectForVideo(videoRef.current, startTimeMs);
            if (onDetections) {
                onDetections(results.detections);
            }
        }
        requestRef.current = requestAnimationFrame(detect);
    }, [detector, videoRef, onDetections]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(detect);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [detect]);

    return { detector };
};
