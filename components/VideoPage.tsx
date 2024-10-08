"use client";

import { MAXVIDEOSIZE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Hand, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

/**
 * What we're going to render is:
 *
 * 1. A video component so the user can see what's on the camera.
 *
 * 2. A button to generate an image of the video, load OpenCV and
 * process the image.
 *
 * 3. A canvas to allow us to capture the image of the video and
 * show it to the user.
 */

const VideoPage = () => {
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const canvasElement = useRef<HTMLCanvasElement | null>(null);
  const outputCanvasElement = useRef<HTMLCanvasElement | null>(null);

  const [letter, setLetter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(0);
  const [words, setWords] = useState<string>("");

  /**
   * In the onClick event we'll capture a frame within
   * the video to pass it to our service.
   */
  const processImage = async () => {};

  /**
   * In the useEffect hook we'll load the video
   * element to show what's on camera.
   */
  useEffect(() => {
    const video = videoElement.current;

    const initCamera = async (): Promise<HTMLVideoElement> => {
      if (video) {
        video.width = MAXVIDEOSIZE;
        video.height = MAXVIDEOSIZE;

        try {
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                width: MAXVIDEOSIZE,
                height: MAXVIDEOSIZE,
                facingMode: "environment",
              },
            });
            video.srcObject = stream;

            return new Promise<HTMLVideoElement>((resolve) => {
              video!.onloadedmetadata = () => {
                resolve(video!);
              };
            });
          } else {
            throw new Error(
              "This browser does not support video capture, or this device does not have a camera."
            );
          }
        } catch (error: unknown) {
          if (error instanceof Error) alert(error.message);
          else alert("An unknown error occurred.");
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(new Error("Video element not found"));
      }
    };

    const load = async () => {
      try {
        const videoLoaded = await initCamera();
        videoLoaded.play();
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error loading video:", error.message);
        } else {
          console.error("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      <MaxWidthWrapper>
        <div className="mt-5 flex mx-auto max-w-screen-xl px-2.5 md:px-10 flex-col items-center gap-5 sm:gap-10">
          <div className=" flex flex-col items-center">
            <div className=" flex space-x-2">
              <Hand className="text-purple-600 text-lg" />
              <p className=" text-xl font-bold text-purple-600">
                ISL Detection
              </p>
            </div>
            <p className="text-gray-600 text-center mt-2">
              Use your camera to predict letters and words through sign language
            </p>
          </div>

          {loading && (
            <div className=" justify-center">
              <div className=" text-center">
                <Loader2 className=" h-32 w-32 mb-5 animate-spin text-purple-500 text-center" />
              </div>
            </div>
          )}

          <div
            className={cn(
              "justify-center items-center",
              loading ? "hidden" : "flex"
            )}
          >
            <div className=" flex flex-col items-center">
              {/* TODO: */}
              <video className="video" playsInline ref={videoElement}></video>
            </div>

            <canvas
              className="hidden"
              ref={canvasElement}
              width={MAXVIDEOSIZE}
              height={MAXVIDEOSIZE}
            />

            <canvas
              className="w-1/2 hidden"
              ref={outputCanvasElement}
              width={MAXVIDEOSIZE}
              height={MAXVIDEOSIZE}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 w-full px-10">
            <div className=" flex flex-col items-center gap-2 w-full">
              <h5 className="text-purple-500">Predicted Letter:</h5>
              <Input
                className="text-purple-300 text-center"
                value={letter}
                readOnly
              />
            </div>

            <div className=" flex flex-col items-center gap-2 w-full">
              <h3 className="text-purple-500">Predicted Words:</h3>
              <Textarea
                className="text-purple-300 text-center"
                value={words}
                readOnly
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="absolute left-1/2 bottom-10 -translate-x-1/2">
        <p className="text-base flex items-center justify-center text-purple-500">
          FPS: {fps.toFixed(3)}
        </p>
      </div>
    </>
  );
};

export default VideoPage;
