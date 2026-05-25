"use client";

import { useState, useCallback } from "react";
import { Download, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface JianyingExportProps {
  projectName: string;
  episode: number;
  shots: Array<{
    shotNumber: number;
    dialogue?: string;
    duration?: number; // seconds, default 2.5
  }>;
}

/* ------------------------------------------------------------------ */
/* Draft content builder                                               */
/* ------------------------------------------------------------------ */

function generateDraftContent(
  projectName: string,
  episode: number,
  shots: JianyingExportProps["shots"]
) {
  const projectId = crypto.randomUUID();

  // Build video segments and materials
  let currentTime = 0;
  const videoSegments: object[] = [];
  const videoMaterials: object[] = [];
  const textMaterials: object[] = [];
  const textSegments: object[] = [];

  for (const shot of shots) {
    const durationSec = shot.duration ?? 2.5;
    const durationUs = Math.round(durationSec * 1_000_000); // microseconds
    const materialId = `mat-${shot.shotNumber}`;
    const segmentId = `seg-${shot.shotNumber}`;

    // Video segment
    videoSegments.push({
      id: segmentId,
      material_id: materialId,
      target_timerange: {
        start: currentTime,
        duration: durationUs,
      },
      source_timerange: {
        start: 0,
        duration: durationUs,
      },
    });

    // Video material (placeholder path)
    videoMaterials.push({
      id: materialId,
      path: `/path/to/shot_${String(shot.shotNumber).padStart(2, "0")}.png`,
      duration: durationUs,
      width: 1080,
      height: 1920,
      type: "photo",
    });

    // Text segment & material for dialogue
    if (shot.dialogue && shot.dialogue.trim()) {
      const textId = `text-${shot.shotNumber}`;
      const textSegId = `textseg-${shot.shotNumber}`;

      textMaterials.push({
        id: textId,
        content: shot.dialogue,
        font_size: 7.0,
        text_color: "#FFFFFF",
        background_color: "#00000080",
        alignment: 1,
      });

      textSegments.push({
        id: textSegId,
        material_id: textId,
        target_timerange: {
          start: currentTime,
          duration: durationUs,
        },
      });
    }

    currentTime += durationUs;
  }

  const tracks: object[] = [
    {
      id: "track-video",
      type: "video",
      segments: videoSegments,
    },
  ];

  if (textSegments.length > 0) {
    tracks.push({
      id: "track-text",
      type: "text",
      segments: textSegments,
    });
  }

  return {
    id: projectId,
    name: `${projectName}\u{7B2C}${episode}\u{96C6}`,
    type: "draft_info",
    version: 360000,
    canvas_config: {
      width: 1080,
      height: 1920,
      ratio_type: "9:16",
    },
    duration: currentTime,
    tracks,
    materials: {
      videos: videoMaterials,
      texts: textMaterials,
      audios: [],
      stickers: [],
      effects: [],
    },
    create_time: Math.floor(Date.now() / 1000),
    update_time: Math.floor(Date.now() / 1000),
  };
}

function generateDraftMetaInfo(projectName: string, episode: number) {
  return {
    draft_id: crypto.randomUUID(),
    draft_name: `${projectName}\u{7B2C}${episode}\u{96C6}`,
    draft_root_path: "",
    tm_draft_create: Math.floor(Date.now() / 1000),
    tm_draft_modified: Math.floor(Date.now() / 1000),
    draft_removable_storage_device: "",
  };
}

const README_CONTENT = `\u{526A}\u{6620}\u{5DE5}\u{7A0B}\u{6587}\u{4EF6}\u{5BFC}\u{5165}\u{8BF4}\u{660E}\u{FF1A}
1. \u{89E3}\u{538B}\u{6B64}\u{6587}\u{4EF6}
2. \u{5C06}\u{89E3}\u{538B}\u{540E}\u{7684}\u{6587}\u{4EF6}\u{5939}\u{590D}\u{5236}\u{5230}\u{526A}\u{6620}\u{8349}\u{7A3F}\u{76EE}\u{5F55}\u{FF1A}
   - Mac: ~/Movies/JianyingPro/User Data/Projects/com.lveditor.draft/
   - Windows: C:\\Users\\\u{4F60}\u{7684}\u{7528}\u{6237}\u{540D}\\AppData\\Local\\JianyingPro\\User Data\\Projects\\com.lveditor.draft\\
3. \u{91CD}\u{542F}\u{526A}\u{6620}\u{FF0C}\u{5728}\u{300C}\u{8349}\u{7A3F}\u{300D}\u{4E2D}\u{627E}\u{5230}\u{6B64}\u{9879}\u{76EE}
4. \u{6CE8}\u{610F}\u{FF1A}\u{56FE}\u{7247}\u{8DEF}\u{5F84}\u{9700}\u{8981}\u{624B}\u{52A8}\u{66FF}\u{6362}\u{4E3A}\u{4F60}\u{7684}\u{5B9E}\u{9645}\u{5206}\u{955C}\u{56FE}\u{8DEF}\u{5F84}

\u{672C}\u{6587}\u{4EF6}\u{7531} AI \u{6F2B}\u{5267}\u{5DE5}\u{4F5C}\u{53F0}\u{81EA}\u{52A8}\u{751F}\u{6210}
`;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function JianyingExport({
  projectName,
  episode,
  shots,
}: JianyingExportProps) {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = useCallback(async () => {
    if (shots.length === 0) return;

    setExporting(true);

    try {
      // Dynamic import JSZip
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      // Generate project files
      const draftContent = generateDraftContent(projectName, episode, shots);
      const draftMeta = generateDraftMetaInfo(projectName, episode);

      // Create folder structure
      const folderName = `${projectName}_\u{7B2C}${episode}\u{96C6}`;
      const folder = zip.folder(folderName);
      if (!folder) throw new Error("\u{521B}\u{5EFA}\u{6587}\u{4EF6}\u{5939}\u{5931}\u{8D25}");

      folder.file(
        "draft_content.json",
        JSON.stringify(draftContent, null, 2)
      );
      folder.file(
        "draft_meta_info.json",
        JSON.stringify(draftMeta, null, 2)
      );
      folder.file("README.txt", README_CONTENT);

      // Generate zip blob
      const blob = await zip.generateAsync({ type: "blob" });

      // Download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${folderName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } catch (err) {
      console.error("\u{5BFC}\u{51FA}\u{5931}\u{8D25}:", err);
    } finally {
      setExporting(false);
    }
  }, [projectName, episode, shots]);

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5 text-xs"
      onClick={handleExport}
      disabled={exporting || shots.length === 0}
    >
      {exporting ? (
        <>
          <Loader2 className="size-3.5 animate-spin" />
          {"\u{5BFC}\u{51FA}\u{4E2D}..."}
        </>
      ) : exported ? (
        <>
          <Check className="size-3.5 text-green-600" />
          {"\u{5DF2}\u{5BFC}\u{51FA}"}
        </>
      ) : (
        <>
          <Download className="size-3.5" />
          {"\u{5BFC}\u{51FA}\u{526A}\u{6620}\u{5DE5}\u{7A0B}\u{6587}\u{4EF6}"}
        </>
      )}
    </Button>
  );
}
