"use client";

import dynamic from "next/dynamic";
import { Loader2, Film } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";

const LazyVideoComposer = dynamic(
  () =>
    import("@/components/video-composer").then((m) => ({
      default: m.VideoComposer,
    })),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardContent className="py-16 text-center space-y-4">
          <div className="flex justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            {"正在加载视频合成器..."}
          </p>
        </CardContent>
      </Card>
    ),
  }
);

export default function ComposerPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Film className="size-5 text-primary" /> {"视频合成"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {"上传分镜图片 + 配音，在浏览器中直接合成 MP4 视频"}
          </p>
        </div>
        <LazyVideoComposer />
      </div>
    </DashboardLayout>
  );
}
