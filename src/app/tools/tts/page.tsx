"use client";

import { useState, useCallback, useEffect } from "react";
import { Copy, Check, ExternalLink, Volume2, Music, Mic } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import { loadProjects, type Project, type Episode } from "@/lib/store";

/* ------------------------------------------------------------------ */
/* Types & Data                                                        */
/* ------------------------------------------------------------------ */

interface DialogueLine {
  id: string;
  character: string;
  text: string;
  shotNumber?: number;
}

interface VoiceRecommendation {
  characterType: string;
  voiceStyle: string;
  tool: string;
}

const voiceRecommendations: VoiceRecommendation[] = [
  { characterType: "\u{9738}\u{603B}\u{7537}\u{4E3B}", voiceStyle: "\u{4F4E}\u{6C89}\u{6C89}\u{7A33}", tool: "\u{8C46}\u{5305}-\u{6D69}\u{7136}" },
  { characterType: "\u{6E29}\u{67D4}\u{5973}\u{4E3B}", voiceStyle: "\u{8F7B}\u{67D4}\u{751C}\u{7F8E}", tool: "\u{8C46}\u{5305}-\u{6653}\u{6653}" },
  { characterType: "\u{53CD}\u{6D3E}", voiceStyle: "\u{9634}\u{6C89}\u{51B7}\u{9177}", tool: "\u{8BAF}\u{98DE}-\u{6C89}\u{7A33}\u{7537}\u{58F0}" },
  { characterType: "\u{65C1}\u{767D}", voiceStyle: "\u{6E05}\u{6670}\u{4E2D}\u{6027}", tool: "\u{8BAF}\u{98DE}-\u{7EAA}\u{5F55}\u{7247}\u{7537}\u{58F0}" },
  { characterType: "\u{5C11}\u{5E74}\u{70ED}\u{8840}", voiceStyle: "\u{6E05}\u{4EAE}\u{6709}\u{671D}\u{6C14}", tool: "\u{8C46}\u{5305}-\u{4E91}\u{626C}" },
  { characterType: "\u{5FA1}\u{59D0}\u{5973}\u{738B}", voiceStyle: "\u{6210}\u{719F}\u{5F3A}\u{52BF}", tool: "\u{8C46}\u{5305}-\u{6653}\u{79CB}" },
  { characterType: "\u{53EF}\u{7231}\u{5C0F}\u{59B9}", voiceStyle: "\u{5143}\u{6C14}\u{6D3B}\u{6CFC}", tool: "\u{8C46}\u{5305}-\u{6653}\u{5999}" },
  { characterType: "\u{6210}\u{719F}\u{7537}\u{4EBA}", voiceStyle: "\u{78C1}\u{6027}\u{4F4E}\u{97F3}", tool: "\u{8BAF}\u{98DE}-\u{78C1}\u{6027}\u{7537}\u{58F0}" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatDialogueForTTS(lines: DialogueLine[]): string {
  // Group by character
  const grouped: Record<string, DialogueLine[]> = {};
  for (const line of lines) {
    const char = line.character || "\u{672A}\u{77E5}\u{89D2}\u{8272}";
    if (!grouped[char]) grouped[char] = [];
    grouped[char].push(line);
  }

  const parts: string[] = [];
  for (const [character, charLines] of Object.entries(grouped)) {
    parts.push(`\u{3010}\u{89D2}\u{8272}\u{FF1A}${character}\u{3011}`);
    for (const line of charLines) {
      if (line.shotNumber) {
        parts.push(`\u{7B2C}${line.shotNumber}\u{955C}\u{FF1A}${line.text}`);
      } else {
        parts.push(line.text);
      }
    }
    parts.push("");
  }
  return parts.join("\n").trim();
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function TTSPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string>("");
  const [dialogueLines, setDialogueLines] = useState<DialogueLine[]>([]);
  const [manualText, setManualText] = useState("");
  const [manualCharacter, setManualCharacter] = useState("");
  const [inputMode, setInputMode] = useState<"project" | "manual">("manual");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formattedCopied, setFormattedCopied] = useState(false);

  // Load projects on mount
  useEffect(() => {
    const allProjects = loadProjects();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage on mount is intentional
    setProjects(allProjects);
  }, []);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const selectedEpisode = selectedProject?.episodes.find(
    (ep) => ep.id === selectedEpisodeId
  );

  // Load dialogue from selected episode
  const handleLoadEpisode = useCallback(
    (episode: Episode) => {
      const lines: DialogueLine[] = [];
      for (const shot of episode.shots) {
        if (shot.dialogue && shot.dialogue.trim()) {
          lines.push({
            id: crypto.randomUUID(),
            character: shot.characters || "\u{672A}\u{77E5}",
            text: shot.dialogue,
            shotNumber: shot.shotNumber,
          });
        }
      }
      setDialogueLines(lines);
    },
    []
  );

  // Add manual dialogue line
  const handleAddManualLine = useCallback(() => {
    if (!manualText.trim()) return;
    setDialogueLines((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        character: manualCharacter.trim() || "\u{672A}\u{77E5}\u{89D2}\u{8272}",
        text: manualText.trim(),
      },
    ]);
    setManualText("");
  }, [manualText, manualCharacter]);

  const handleRemoveLine = useCallback((id: string) => {
    setDialogueLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  // Copy single line
  const handleCopyLine = useCallback(async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }, []);

  // Copy formatted text
  const handleCopyFormatted = useCallback(async () => {
    const text = formatDialogueForTTS(dialogueLines);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setFormattedCopied(true);
    setTimeout(() => setFormattedCopied(false), 1500);
  }, [dialogueLines]);

  const formattedText = formatDialogueForTTS(dialogueLines);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl flex items-center gap-2">
            <Mic className="size-5 text-primary" /> {"\u{914D}\u{97F3}\u{5DE5}\u{5177}"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {"\u{4E3A}\u{89D2}\u{8272}\u{751F}\u{6210}\u{914D}\u{97F3}\u{FF0C}\u{4E00}\u{952E}\u{5BFC}\u{51FA}\u{97F3}\u{9891}"}
          </p>
        </div>

        {/* Section 1: Dialogue Input */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Mic className="size-4 text-primary" />
              {"\u{53F0}\u{8BCD}\u{8F93}\u{5165}"}
            </h2>

            {/* Input mode toggle */}
            <div className="flex gap-2">
              <Button
                variant={inputMode === "project" ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setInputMode("project")}
              >
                {"\u{4ECE}\u{9879}\u{76EE}\u{5BFC}\u{5165}"}
              </Button>
              <Button
                variant={inputMode === "manual" ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setInputMode("manual")}
              >
                {"\u{624B}\u{52A8}\u{8F93}\u{5165}"}
              </Button>
            </div>

            {inputMode === "project" ? (
              <div className="space-y-3">
                {projects.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {"\u{8FD8}\u{6CA1}\u{6709}\u{9879}\u{76EE}\u{FF0C}\u{8BF7}\u{5148}\u{521B}\u{5EFA}\u{9879}\u{76EE}\u{5E76}\u{751F}\u{6210}\u{5267}\u{672C}"}
                  </p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          {"\u{9009}\u{62E9}\u{9879}\u{76EE}"}
                        </label>
                        <select
                          value={selectedProjectId}
                          onChange={(e) => {
                            setSelectedProjectId(e.target.value);
                            setSelectedEpisodeId("");
                            setDialogueLines([]);
                          }}
                          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
                        >
                          <option value="">{"\u{8BF7}\u{9009}\u{62E9}..."}</option>
                          {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedProject && selectedProject.episodes.length > 0 && (
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-muted-foreground">
                            {"\u{9009}\u{62E9}\u{5267}\u{96C6}"}
                          </label>
                          <select
                            value={selectedEpisodeId}
                            onChange={(e) => {
                              setSelectedEpisodeId(e.target.value);
                              const ep = selectedProject.episodes.find(
                                (ep) => ep.id === e.target.value
                              );
                              if (ep) handleLoadEpisode(ep);
                            }}
                            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
                          >
                            <option value="">{"\u{8BF7}\u{9009}\u{62E9}..."}</option>
                            {selectedProject.episodes.map((ep) => (
                              <option key={ep.id} value={ep.id}>
                                {ep.title} ({ep.shots.length} {"\u{4E2A}\u{955C}\u{5934}"})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    {selectedProject &&
                      selectedProject.episodes.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          {"\u{8BE5}\u{9879}\u{76EE}\u{8FD8}\u{6CA1}\u{6709}\u{751F}\u{6210}\u{5267}\u{672C}\u{FF0C}\u{8BF7}\u{5148}\u{751F}\u{6210}\u{5267}\u{672C}"}
                        </p>
                      )}
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    {"\u{89D2}\u{8272}\u{540D}"}
                  </label>
                  <Input
                    value={manualCharacter}
                    onChange={(e) => setManualCharacter(e.target.value)}
                    placeholder={"\u{4F8B}\u{5982}\u{FF1A}\u{6797}\u{8FDC}"}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    {"\u{53F0}\u{8BCD}\u{5185}\u{5BB9}"}
                  </label>
                  <textarea
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    placeholder={"\u{8F93}\u{5165}\u{53F0}\u{8BCD}\u{6587}\u{672C}..."}
                    rows={3}
                    className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        handleAddManualLine();
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleAddManualLine}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  disabled={!manualText.trim()}
                >
                  {"\u{6DFB}\u{52A0}\u{53F0}\u{8BCD}"}
                </Button>
              </div>
            )}

            {/* Dialogue list */}
            {dialogueLines.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {"\u{5DF2}\u{6DFB}\u{52A0}"} {dialogueLines.length} {"\u{6761}\u{53F0}\u{8BCD}"}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => setDialogueLines([])}
                  >
                    {"\u{6E05}\u{7A7A}\u{5168}\u{90E8}"}
                  </Button>
                </div>
                {dialogueLines.map((line) => (
                  <div
                    key={line.id}
                    className="flex items-start gap-2 rounded-lg border border-border p-2.5 text-sm"
                  >
                    <Badge
                      variant="secondary"
                      className="shrink-0 text-[10px] h-5 mt-0.5"
                    >
                      {line.character}
                    </Badge>
                    <span className="flex-1 min-w-0 text-foreground">
                      {line.shotNumber && (
                        <span className="text-muted-foreground text-xs mr-1.5">
                          [{"\u{955C}"}{line.shotNumber}]
                        </span>
                      )}
                      {line.text}
                    </span>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className={
                          copiedId === line.id
                            ? "text-green-600"
                            : "text-muted-foreground hover:text-foreground"
                        }
                        onClick={() => handleCopyLine(line.id, line.text)}
                      >
                        {copiedId === line.id ? (
                          <Check className="size-3" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveLine(line.id)}
                      >
                        {"\u{2715}"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2: TTS Tools Quick Access */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ExternalLink className="size-4 text-primary" />
              {"TTS \u{5DE5}\u{5177}\u{76F4}\u{8FBE}"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {"\u{70B9}\u{51FB}\u{6309}\u{94AE}\u{8DF3}\u{8F6C}\u{5230}\u{514D}\u{8D39} TTS \u{5DE5}\u{5177}\u{FF0C}\u{7C98}\u{8D34}\u{53F0}\u{8BCD}\u{5373}\u{53EF}\u{751F}\u{6210}\u{914D}\u{97F3}"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="https://www.doubao.com/chat/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center space-y-2">
                  <Mic className="size-6 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    {"\u{8C46}\u{5305}"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {"\u{591A}\u{97F3}\u{8272}\u{53EF}\u{9009}\u{FF0C}\u{8D28}\u{91CF}\u{9AD8}"}
                  </p>
                  <Badge variant="outline" className="text-[10px] border-green-300 text-green-600">
                    {"\u{514D}\u{8D39}"}
                  </Badge>
                </div>
              </a>
              <a
                href="https://www.xfyun.cn/services/online_tts"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center space-y-2">
                  <Volume2 className="size-6 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    {"\u{8BAF}\u{98DE}\u{8BED}\u{97F3}"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {"\u{97F3}\u{8272}\u{4E30}\u{5BCC}\u{FF0C}\u{53EF}\u{8C03}\u{8282}\u{8BED}\u{901F}"}
                  </p>
                  <Badge variant="outline" className="text-[10px] border-green-300 text-green-600">
                    {"\u{514D}\u{8D39}\u{989D}\u{5EA6}"}
                  </Badge>
                </div>
              </a>
              <a
                href="https://tts.baidu.com/home"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center space-y-2">
                  <Volume2 className="size-6 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    {"\u{767E}\u{5EA6}\u{8BED}\u{97F3}"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {"\u{7A33}\u{5B9A}\u{53EF}\u{9760}\u{FF0C}\u{652F}\u{6301}\u{6279}\u{91CF}"}
                  </p>
                  <Badge variant="outline" className="text-[10px] border-green-300 text-green-600">
                    {"\u{514D}\u{8D39}\u{989D}\u{5EA6}"}
                  </Badge>
                </div>
              </a>
            </div>

            {dialogueLines.length > 0 && (
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs w-full"
                  onClick={handleCopyFormatted}
                >
                  {formattedCopied ? (
                    <>
                      <Check className="size-3.5" />
                      {"\u{5DF2}\u{590D}\u{5236}\u{5168}\u{90E8}\u{53F0}\u{8BCD} \u{2713}"}
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      {"\u{590D}\u{5236}\u{5168}\u{90E8}\u{53F0}\u{8BCD}\u{FF08}\u{53EF}\u{76F4}\u{63A5}\u{7C98}\u{8D34}\u{5230} TTS \u{5DE5}\u{5177}\u{FF09}"}
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 3: Voice Recommendations */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Volume2 className="size-4 text-primary" />
              {"\u{97F3}\u{8272}\u{63A8}\u{8350}"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {"\u{6839}\u{636E}\u{89D2}\u{8272}\u{7C7B}\u{578B}\u{9009}\u{62E9}\u{5408}\u{9002}\u{7684}\u{97F3}\u{8272}\u{FF0C}\u{8BA9}\u{914D}\u{97F3}\u{66F4}\u{8D34}\u{5408}\u{89D2}\u{8272}\u{6027}\u{683C}"}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">
                      {"\u{89D2}\u{8272}\u{7C7B}\u{578B}"}
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">
                      {"\u{63A8}\u{8350}\u{97F3}\u{8272}"}
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">
                      {"\u{63A8}\u{8350}\u{5DE5}\u{5177}"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {voiceRecommendations.map((rec) => (
                    <tr
                      key={rec.characterType}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-2.5 px-3 font-medium text-foreground">
                        {rec.characterType}
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        {rec.voiceStyle}
                      </td>
                      <td className="py-2.5 px-3">
                        <Badge
                          variant="outline"
                          className="text-[10px] border-primary/30 text-primary"
                        >
                          {rec.tool}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Volume Balance Reference */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Music className="size-4 text-primary" />
              {"\u{97F3}\u{91CF}\u{5E73}\u{8861}\u{53C2}\u{8003}"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {"\u{5269}\u{8F91}\u{65F6}\u{53C2}\u{8003}\u{4EE5}\u{4E0B}\u{97F3}\u{91CF}\u{6807}\u{51C6}\u{FF0C}\u{786E}\u{4FDD}\u{4EBA}\u{58F0}\u{6E05}\u{6670}\u{3001}BGM \u{4E0D}\u{62A2}\u{621A}"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border p-3 text-center space-y-1">
                <Mic className="size-5 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">{"\u{4EBA}\u{58F0}"}</p>
                <p className="text-lg font-bold text-primary">-6dB ~ -3dB</p>
                <p className="text-[11px] text-muted-foreground">{"\u{4E3B}\u{4F53}\u{97F3}\u{91CF}\u{FF0C}\u{4FDD}\u{6301}\u{6700}\u{5927}"}</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center space-y-1">
                <Music className="size-5 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">BGM</p>
                <p className="text-lg font-bold text-primary">-18dB ~ -20dB</p>
                <p className="text-[11px] text-muted-foreground">{"\u{80CC}\u{666F}\u{97F3}\u{4E50}\u{FF0C}\u{538B}\u{4F4E}\u{97F3}\u{91CF}"}</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center space-y-1">
                <Volume2 className="size-5 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">{"\u{97F3}\u{6548}"}</p>
                <p className="text-lg font-bold text-primary">-12dB ~ -8dB</p>
                <p className="text-[11px] text-muted-foreground">{"\u{73AF}\u{5883}\u{97F3}\u{6548}\u{FF0C}\u{9002}\u{4E2D}\u{5373}\u{53EF}"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Formatted Dialogue Output */}
        {dialogueLines.length > 0 && (
          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Copy className="size-4 text-primary" /> {"\u{4E00}\u{952E}\u{683C}\u{5F0F}\u{5316}\u{53F0}\u{8BCD}"}
                </h2>
                <CopyButton text={formattedText} variant="full" />
              </div>
              <p className="text-xs text-muted-foreground">
                {"\u{6309}\u{89D2}\u{8272}\u{5206}\u{7EC4}\u{FF0C}\u{53EF}\u{76F4}\u{63A5}\u{590D}\u{5236}\u{7C98}\u{8D34}\u{5230}\u{4EFB}\u{4F55} TTS \u{5DE5}\u{5177}"}
              </p>
              <div className="rounded-lg border border-border bg-muted/50 p-3 font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
                {formattedText}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
