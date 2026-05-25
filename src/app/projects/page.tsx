"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowRight, FolderOpen, Download, Sparkles, Lightbulb, Import, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  loadProjects,
  createProject,
  saveProject,
  deleteProject,
  type Project,
} from "@/lib/store";

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form state for new project
  const [formName, setFormName] = useState("");
  const [formGenre, setFormGenre] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formConcept, setFormConcept] = useState("");
  const [formTotalEpisodes, setFormTotalEpisodes] = useState(10);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage on mount is intentional
    setProjects(loadProjects());
    setLoaded(true);
  }, []);

  const resetForm = useCallback(() => {
    setFormName("");
    setFormGenre("");
    setFormDescription("");
    setFormConcept("");
    setFormTotalEpisodes(10);
  }, []);

  const handleCreate = useCallback(() => {
    if (!formName.trim() || !formGenre.trim() || !formConcept.trim())
      return;
    const project = createProject({
      name: formName.trim(),
      genre: formGenre.trim(),
      description: formDescription.trim(),
      protagonist: "",
      concept: formConcept.trim(),
      totalEpisodes: formTotalEpisodes,
    });
    saveProject(project);
    setProjects(loadProjects());
    setDialogOpen(false);
    resetForm();
    router.push(`/projects/${project.id}`);
  }, [
    formName,
    formGenre,
    formDescription,
    formConcept,
    formTotalEpisodes,
    resetForm,
    router,
  ]);

  const handleDelete = useCallback((id: string) => {
    deleteProject(id);
    setProjects(loadProjects());
    setConfirmDeleteId(null);
  }, []);

  const exportProject = useCallback((project: Project) => {
    const blob = new Blob([JSON.stringify(project, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name || "project"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  if (!loaded) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl flex items-center gap-2">
              <FolderOpen className="size-5 text-primary" /> {"漫剧工作站"}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"创建和管理你的 AI 漫剧项目"}
            </p>
          </div>

          <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
            <SheetTrigger
              render={
                <Button size="lg" className="gap-1.5 shrink-0" />
              }
            >
              <Plus className="size-4" />
              {"新建漫剧"}
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{"新建 AI 漫剧项目"}</SheetTitle>
                <SheetDescription>
                  {"填写基本信息，创建后按照 角色 → 大纲 → 剧本 的流程开始创作"}
                </SheetDescription>
              </SheetHeader>
              <div className="px-4 space-y-4">
                <FormField label="剧名" required>
                  <Input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="例: 逆袭人生"
                    className="text-sm"
                  />
                </FormField>
                <FormField label="题材" required>
                  <Input
                    value={formGenre}
                    onChange={(e) => setFormGenre(e.target.value)}
                    placeholder="例: 都市逆袭"
                    className="text-sm"
                  />
                </FormField>
                <FormField label="故事概要" required>
                  <textarea
                    value={formConcept}
                    onChange={(e) => setFormConcept(e.target.value)}
                    placeholder="例：赵昊是一个被公司陷害的金融天才，被扫地出门后偶然获得一个神秘系统，从此开始了复仇与逆袭之路..."
                    rows={4}
                    className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
                  />
                </FormField>
                <FormField label="简介">
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="简要描述剧情风格、目标受众等（选填）"
                    rows={2}
                    className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
                  />
                </FormField>
                <FormField label="总集数">
                  <Input
                    type="number"
                    value={formTotalEpisodes}
                    onChange={(e) =>
                      setFormTotalEpisodes(Number(e.target.value) || 10)
                    }
                    min={1}
                    max={999}
                    className="text-sm w-24"
                  />
                </FormField>
                <Button
                  onClick={handleCreate}
                  disabled={
                    !formName.trim() ||
                    !formGenre.trim() ||
                    !formConcept.trim()
                  }
                  className="w-full"
                  size="lg"
                >
                  {"创建项目"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Project Cards Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => {
              const episodeCount = project.episodes.length;
              const characterCount = project.characters.length;
              const createdDate = new Date(
                project.createdAt
              ).toLocaleDateString("zh-CN");

              return (
                <Card key={project.id} className="group/card relative">
                  <CardContent className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-foreground truncate">
                          {project.name}
                        </h3>
                      </div>
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-[10px]"
                      >
                        {project.genre}
                      </Badge>
                    </div>

                    {project.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        {episodeCount} {"集剧本"}
                      </span>
                      <span>{"·"}</span>
                      <span>
                        {characterCount} {"个角色"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-muted-foreground">
                        {"创建于 "}
                        {createdDate}
                      </span>
                      <div className="flex items-center gap-1">
                        {confirmDeleteId === project.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="destructive"
                              size="xs"
                              onClick={() => handleDelete(project.id)}
                            >
                              {"确认删除"}
                            </Button>
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              {"取消"}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => exportProject(project)}
                              title="导出项目"
                            >
                              <Download className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() =>
                                setConfirmDeleteId(project.id)
                              }
                              title="删除项目"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                            <Link href={`/projects/${project.id}`}>
                              <Button
                                variant="outline"
                                size="xs"
                                className="gap-1"
                              >
                                {"进入工作台"}
                                <ArrowRight className="size-3" />
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Rich onboarding empty state */
          <div className="space-y-6">
            {/* Welcome heading */}
            <Card className="border-primary/20">
              <CardContent className="py-8 text-center space-y-3">
                <div className="flex justify-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Sparkles className="size-7 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                  {"欢迎来到漫剧工作站"}
                </h2>
                <p className="text-muted-foreground text-base">
                  {"从一个想法到一部完整漫剧，全程 AI 驱动"}
                </p>
              </CardContent>
            </Card>

            {/* 7-step workflow */}
            <Card>
              <CardContent className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">{"7 步创作流程"}</h3>
                {/* Desktop flow */}
                <div className="hidden sm:flex items-center justify-between gap-1">
                  {[
                    { step: "概要", desc: "AI 想故事" },
                    { step: "角色", desc: "AI 设计" },
                    { step: "大纲", desc: "AI 生成" },
                    { step: "剧本", desc: "AI 编写" },
                    { step: "分镜", desc: "AI 生成" },
                    { step: "生图", desc: "8 厂商" },
                    { step: "合成", desc: "导出" },
                  ].map((item, i) => (
                    <div key={item.step} className="flex items-center gap-1">
                      <div className="flex flex-col items-center gap-1 min-w-[60px]">
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="text-xs font-semibold text-foreground">{item.step}</span>
                        <span className="text-[10px] text-muted-foreground">{item.desc}</span>
                      </div>
                      {i < 6 && <ChevronRight className="size-3.5 text-primary/40 shrink-0 -mt-3" />}
                    </div>
                  ))}
                </div>
                {/* Mobile flow */}
                <div className="sm:hidden flex flex-wrap items-center gap-1.5">
                  {["概要", "角色", "大纲", "剧本", "分镜", "生图", "合成"].map((step, i) => (
                    <span key={step} className="flex items-center gap-1.5">
                      <Badge variant="outline" className="text-[11px] px-2 py-0.5 border-primary/30 text-primary font-medium">{step}</Badge>
                      {i < 6 && <ChevronRight className="size-3 text-muted-foreground" />}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Two creation paths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-primary/15">
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <Lightbulb className="size-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{"从零开始"}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {"选个题材，AI 帮你想故事、设计角色、写剧本，一步步生成完整漫剧"}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/15">
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <Import className="size-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{"导入改编"}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {"粘贴已有小说/剧本，AI 自动改编成漫剧格式，提取角色、生成分镜"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center py-2">
              <Button
                size="lg"
                className="h-12 px-8 text-base gap-2"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="size-4" />
                {"新建漫剧，开始创作"}
              </Button>
            </div>

            {/* Stats bar */}
            <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span>{"支持 8 大 AI 厂商"}</span>
              <span>{"·"}</span>
              <span>{"9 个专业工具"}</span>
              <span>{"·"}</span>
              <span>{"9 篇知识库教程"}</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
