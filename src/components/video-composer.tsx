"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload,
  X,
  GripVertical,
  Music,
  Volume2,
  Download,
  Loader2,
  AlertCircle,
  ImageIcon,
  Film,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  duration: number; // seconds
}

type ComposerStatus =
  | "idle"
  | "loading-ffmpeg"
  | "composing"
  | "done"
  | "error";

/* ------------------------------------------------------------------ */
/* VideoComposer                                                       */
/* ------------------------------------------------------------------ */

export function VideoComposer() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [bgmFile, setBgmFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ComposerStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  // Drag reorder state
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const voiceInputRef = useRef<HTMLInputElement>(null);
  const bgmInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<import("@ffmpeg/ffmpeg").FFmpeg | null>(null);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Total duration ---- */
  const totalDuration = images.reduce((sum, img) => sum + img.duration, 0);

  /* ---- Image upload ---- */
  const handleImageFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newItems: ImageItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      newItems.push({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        duration: 2.5,
      });
    }
    setImages((prev) => [...prev, ...newItems]);
    // Clear any previous output
    setOutputUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setStatus("idle");
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const updateDuration = useCallback((id: string, duration: number) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, duration } : img))
    );
  }, []);

  /* ---- Drag reorder ---- */
  const handleDragStart = useCallback((idx: number) => {
    setDragIdx(idx);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, idx: number) => {
      e.preventDefault();
      if (dragIdx === null || dragIdx === idx) return;
      setDragOverIdx(idx);
    },
    [dragIdx]
  );

  const handleDrop = useCallback(
    (idx: number) => {
      if (dragIdx === null || dragIdx === idx) {
        setDragIdx(null);
        setDragOverIdx(null);
        return;
      }
      setImages((prev) => {
        const next = [...prev];
        const [moved] = next.splice(dragIdx, 1);
        next.splice(idx, 0, moved);
        return next;
      });
      setDragIdx(null);
      setDragOverIdx(null);
    },
    [dragIdx]
  );

  const handleDragEnd = useCallback(() => {
    setDragIdx(null);
    setDragOverIdx(null);
  }, []);

  /* ---- Drop zone ---- */
  const handleDropZone = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleImageFiles(e.dataTransfer.files);
    },
    [handleImageFiles]
  );

  const handleDragOverZone = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  /* ---- Compose ---- */
  const handleCompose = useCallback(async () => {
    if (images.length === 0) return;

    setErrorMsg("");
    setProgress(0);
    setOutputUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    try {
      /* Load FFmpeg if not loaded */
      if (!ffmpegRef.current) {
        setStatus("loading-ffmpeg");
        const { FFmpeg } = await import("@ffmpeg/ffmpeg");
        const { toBlobURL } = await import("@ffmpeg/util");
        const ffmpeg = new FFmpeg();

        ffmpeg.on("progress", ({ progress: p }) => {
          setProgress(Math.min(Math.round(p * 100), 100));
        });

        await ffmpeg.load({
          coreURL: await toBlobURL(
            "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.js",
            "text/javascript"
          ),
          wasmURL: await toBlobURL(
            "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.wasm",
            "application/wasm"
          ),
        });

        ffmpegRef.current = ffmpeg;
      }

      setStatus("composing");
      setProgress(0);
      const ffmpeg = ffmpegRef.current;
      const { fetchFile } = await import("@ffmpeg/util");

      /* Write images to virtual filesystem */
      for (let i = 0; i < images.length; i++) {
        const filename = `img${i.toString().padStart(3, "0")}.png`;
        await ffmpeg.writeFile(filename, await fetchFile(images[i].file));
      }

      /* Create concat file with durations */
      const concatLines: string[] = [];
      for (let i = 0; i < images.length; i++) {
        const filename = `img${i.toString().padStart(3, "0")}.png`;
        concatLines.push(`file '${filename}'`);
        concatLines.push(`duration ${images[i].duration}`);
      }
      // FFmpeg concat demuxer needs the last file repeated without duration
      const lastFilename = `img${(images.length - 1).toString().padStart(3, "0")}.png`;
      concatLines.push(`file '${lastFilename}'`);

      await ffmpeg.writeFile("concat.txt", concatLines.join("\n"));

      /* Write audio files if present */
      const hasVoice = !!voiceFile;
      const hasBgm = !!bgmFile;

      if (hasVoice) {
        await ffmpeg.writeFile("voice.mp3", await fetchFile(voiceFile));
      }
      if (hasBgm) {
        await ffmpeg.writeFile("bgm.mp3", await fetchFile(bgmFile));
      }

      /* Build ffmpeg command */
      const args: string[] = [];

      // Input: concat images
      args.push("-f", "concat", "-safe", "0", "-i", "concat.txt");

      // Input: audio files
      if (hasVoice) {
        args.push("-i", "voice.mp3");
      }
      if (hasBgm) {
        args.push("-i", "bgm.mp3");
      }

      // Video filter: scale to 1080x1920 vertical
      args.push(
        "-vf",
        "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black"
      );

      // Video codec
      args.push("-c:v", "libx264", "-pix_fmt", "yuv420p");

      // Audio handling
      if (hasVoice && hasBgm) {
        // Mix voice and BGM (voice louder)
        const voiceIdx = 1;
        const bgmIdx = 2;
        args.push(
          "-filter_complex",
          `[${voiceIdx}:a]volume=1.0[v];[${bgmIdx}:a]volume=0.3[b];[v][b]amix=inputs=2:duration=shortest[a]`
        );
        args.push("-map", "0:v", "-map", "[a]");
        args.push("-shortest");
      } else if (hasVoice) {
        args.push("-c:a", "aac", "-shortest");
      } else if (hasBgm) {
        args.push("-c:a", "aac", "-shortest");
      }

      args.push("-y", "output.mp4");

      await ffmpeg.exec(args);

      /* Read output */
      const data = await ffmpeg.readFile("output.mp4");
      // Copy into a fresh ArrayBuffer to satisfy TypeScript's BlobPart constraint
      const src = data as Uint8Array;
      const copy = new Uint8Array(src.length);
      copy.set(src);
      const blob = new Blob([copy.buffer as ArrayBuffer], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setStatus("done");
      setProgress(100);

      /* Cleanup virtual filesystem */
      for (let i = 0; i < images.length; i++) {
        const filename = `img${i.toString().padStart(3, "0")}.png`;
        try {
          await ffmpeg.deleteFile(filename);
        } catch {
          /* ignore */
        }
      }
      try {
        await ffmpeg.deleteFile("concat.txt");
      } catch {
        /* ignore */
      }
      try {
        await ffmpeg.deleteFile("output.mp4");
      } catch {
        /* ignore */
      }
      if (hasVoice)
        try {
          await ffmpeg.deleteFile("voice.mp3");
        } catch {
          /* ignore */
        }
      if (hasBgm)
        try {
          await ffmpeg.deleteFile("bgm.mp3");
        } catch {
          /* ignore */
        }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "合成失败，请重试";
      setErrorMsg(message);
      setStatus("error");
    }
  }, [images, voiceFile, bgmFile]);

  /* ---- Download ---- */
  const handleDownload = useCallback(() => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `manga-video-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [outputUrl]);

  const isWorking = status === "loading-ffmpeg" || status === "composing";

  return (
    <div className="space-y-6 pt-4">
      {/* Header description */}
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Film className="size-4 text-primary" />
          {"视频合成器"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {"在浏览器中直接合成，无需上传到服务器。首次加载 FFmpeg 引擎约 30MB，请耐心等待。"}
        </p>
      </div>

      {/* Image upload section */}
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ImageIcon className="size-4 text-muted-foreground" />
              {"分镜图片"}
            </h3>
            {images.length > 0 && (
              <span className="text-xs text-muted-foreground tabular-nums">
                {"共 "}
                {images.length}
                {" 张 / 总时长 "}
                {totalDuration.toFixed(1)}
                {" 秒"}
              </span>
            )}
          </div>

          {/* Drop zone */}
          <div
            className="relative rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
            onDrop={handleDropZone}
            onDragOver={handleDragOverZone}
            onClick={() => imageInputRef.current?.click()}
          >
            <input
              ref={imageInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              className="hidden"
              onChange={(e) => {
                handleImageFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <Upload className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {"拖拽或点击上传图片"}
              </p>
              <p className="text-xs text-muted-foreground">
                {"支持 PNG / JPG / WebP，可多选"}
              </p>
            </div>
          </div>

          {/* Image thumbnails with reorder */}
          {images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={handleDragEnd}
                  className={`group relative shrink-0 rounded-lg border transition-all ${
                    dragOverIdx === idx
                      ? "border-primary ring-2 ring-primary/30"
                      : dragIdx === idx
                        ? "opacity-50 border-border"
                        : "border-border hover:border-border/80"
                  }`}
                  style={{ width: 120 }}
                >
                  {/* Drag handle */}
                  <div className="absolute top-1 left-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                    <GripVertical className="size-3.5 text-white drop-shadow-md" />
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(img.id);
                    }}
                    className="absolute top-1 right-1 z-10 flex size-5 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>

                  {/* Sequence number */}
                  <div className="absolute bottom-[calc(100%-24px)] left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="aspect-[9/16] w-full overflow-hidden rounded-t-lg bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element -- Using blob/data URLs from local file uploads */}
                    <img
                      src={img.previewUrl}
                      alt={`分镜 ${idx + 1}`}
                      className="size-full object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* Duration control */}
                  <div className="p-1.5">
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={img.duration}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          if (!isNaN(val) && val >= 0.5 && val <= 10) {
                            updateDuration(img.id, val);
                          }
                        }}
                        min={0.5}
                        max={10}
                        step={0.5}
                        className="h-6 text-[11px] text-center px-1 tabular-nums"
                      />
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {"秒"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audio section */}
      <Card>
        <CardContent className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Music className="size-4 text-muted-foreground" />
            {"音频（可选）"}
          </h3>

          {/* Voice */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-10 shrink-0 flex items-center gap-1.5">
              <Volume2 className="size-3.5" />
              {"配音"}
            </span>
            {voiceFile ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm text-foreground truncate">
                  {voiceFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setVoiceFile(null)}
                  className="flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="size-3" />
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => voiceInputRef.current?.click()}
              >
                {"选择文件"}
              </Button>
            )}
            <input
              ref={voiceInputRef}
              type="file"
              accept="audio/mpeg,audio/wav,audio/mp3"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setVoiceFile(file);
                e.target.value = "";
              }}
            />
          </div>

          {/* BGM */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-10 shrink-0 flex items-center gap-1.5">
              <Music className="size-3.5" />
              {"BGM"}
            </span>
            {bgmFile ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm text-foreground truncate">
                  {bgmFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setBgmFile(null)}
                  className="flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="size-3" />
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => bgmInputRef.current?.click()}
              >
                {"选择文件"}
              </Button>
            )}
            <input
              ref={bgmInputRef}
              type="file"
              accept="audio/mpeg,audio/wav,audio/mp3"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setBgmFile(file);
                e.target.value = "";
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Resolution info */}
      <div className="text-xs text-muted-foreground">
        {"输出分辨率: 1080 x 1920（竖屏 9:16）"}
      </div>

      {/* Compose button */}
      <Button
        onClick={handleCompose}
        disabled={images.length === 0 || isWorking}
        className="w-full gap-2"
        size="lg"
      >
        {isWorking ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {status === "loading-ffmpeg"
              ? "正在加载 FFmpeg 引擎..."
              : "合成中..."}
          </>
        ) : (
          <>
            <Film className="size-4" />
            {"开始合成"}
          </>
        )}
      </Button>

      {/* Progress bar */}
      {isWorking && (
        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground font-medium">
                {status === "loading-ffmpeg"
                  ? "正在下载 FFmpeg 引擎..."
                  : "正在合成视频..."}
              </span>
              <span className="text-sm text-muted-foreground tabular-nums">
                {progress}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                style={{
                  width: `${status === "loading-ffmpeg" ? 0 : progress}%`,
                }}
              />
            </div>
            {status === "loading-ffmpeg" && (
              <p className="text-xs text-muted-foreground">
                {"首次加载约需 10-30 秒，取决于网络速度。加载完成后再次合成无需重新下载。"}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {status === "error" && errorMsg && (
        <Card className="border-destructive/50">
          <CardContent className="flex items-start gap-3">
            <AlertCircle className="size-4 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm text-destructive font-medium">
                {"合成失败"}
              </p>
              <p className="text-xs text-destructive/80">{errorMsg}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Output */}
      {status === "done" && outputUrl && (
        <Card>
          <CardContent className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {"合成完成"}
            </h3>

            {/* Video preview */}
            <div className="rounded-lg overflow-hidden bg-black">
              <video
                src={outputUrl}
                controls
                className="w-full max-h-[480px] mx-auto"
                style={{ aspectRatio: "9/16", maxWidth: 270 }}
              />
            </div>

            {/* Download button */}
            <Button
              onClick={handleDownload}
              className="w-full gap-2"
              size="lg"
            >
              <Download className="size-4" />
              {"下载 MP4"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
