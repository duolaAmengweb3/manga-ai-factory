/* ------------------------------------------------------------------ */
/* Project data model + localStorage helpers                          */
/* ------------------------------------------------------------------ */

export interface Shot {
  shotNumber: number;
  shotType: string;
  scene: string;
  characters: string;
  action: string;
  emotion: string;
  dialogue: string;
}

export interface GeneratedImage {
  shotNumber: number;
  url: string;
  provider: string;
  taskId?: string;
  status?: "pending" | "running" | "succeeded" | "failed";
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  shots: Shot[];
  prompts: { shotNumber: number; prompt: string }[];
  images?: GeneratedImage[];
}

export interface Character {
  id: string;
  name: string;
  gender: string;
  age: number | "";
  role: string;
  appearance: string;
  clothing: string;
  accessory: string;
  promptTemplate: string;
}

export interface EpisodeOutline {
  episode: number;
  title: string;
  coreConflict: string;
  keyEvents: string[];
  endingHook: string;
}

export interface StoryOutline {
  logline: string;
  worldSetting: string;
  mainConflict: string;
  episodes: EpisodeOutline[];
}

export interface Project {
  id: string;
  name: string;
  genre: string;
  description: string;
  protagonist: string;
  concept: string;
  totalEpisodes: number;
  targetPlatform?: string;
  characters: Character[];
  episodes: Episode[];
  storyOutline?: StoryOutline;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "manga-projects";

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProject(id: string): Project | undefined {
  return loadProjects().find((p) => p.id === id);
}

export function saveProject(project: Project): void {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push(project);
  }
  saveProjects(projects);
}

export function deleteProject(id: string): void {
  saveProjects(loadProjects().filter((p) => p.id !== id));
}

export function createProject(data: {
  name: string;
  genre: string;
  description: string;
  protagonist: string;
  concept: string;
  totalEpisodes: number;
}): Project {
  return {
    id: crypto.randomUUID(),
    ...data,
    characters: [],
    episodes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* Chinese → English character translation mapping                     */
/* ------------------------------------------------------------------ */

export const zhEnMap: Record<string, string> = {
  "男": "man",
  "女": "woman",
  "其他": "person",
  "高瘦": "tall and slim",
  "高": "tall",
  "瘦": "slim",
  "矮": "short",
  "胖": "heavy-set",
  "剑眉": "sharp eyebrows",
  "星目": "bright star-like eyes",
  "凤眼": "phoenix eyes",
  "丹凤眼": "almond eyes",
  "圆脸": "round face",
  "瓜子脸": "oval face",
  "短发": "short hair",
  "长发": "long hair",
  "微卷": "slightly curly",
  "卷发": "curly hair",
  "直发": "straight hair",
  "黑色": "black",
  "棕色": "brown",
  "白色": "white",
  "红色": "red",
  "金色": "golden",
  "银色": "silver",
  "灰色": "gray",
  "蓝色": "blue",
  "西装": "suit",
  "古装": "ancient Chinese robes",
  "校服": "school uniform",
  "盔甲": "armor",
  "汉服": "traditional hanfu",
  "连衣裙": "dress",
  "T恤": "T-shirt",
  "卫衣": "hoodie",
  "风衣": "trench coat",
  "皮衣": "leather jacket",
  "长裙": "long skirt",
  "短裙": "short skirt",
  "衬衫": "shirt",
  "修身": "fitted",
  "宽松": "loose",
  "深灰色": "dark gray",
  "深蓝色": "dark blue",
  "深色": "dark-colored",
  "浅色": "light-colored",
  "健壮": "muscular",
  "娇小": "petite",
  "苗条": "slender",
  "马尾": "ponytail",
  "双马尾": "twin tails",
  "麻花辫": "braids",
  "双辫": "twin braids",
  "丸子头": "bun hairstyle",
  "披肩发": "shoulder-length hair",
  "手表": "watch",
  "项链": "necklace",
  "耳环": "earrings",
  "眼镜": "glasses",
  "伤疤": "scar",
  "纹身": "tattoo",
  "戒指": "ring",
  "手链": "bracelet",
  "发簪": "hair pin",
  "头带": "headband",
  "帽子": "hat",
};

export function translateZhToEn(text: string): string {
  if (!text.trim()) return "";
  let result = text;
  const sortedKeys = Object.keys(zhEnMap).sort(
    (a, b) => b.length - a.length
  );
  for (const zh of sortedKeys) {
    result = result.replaceAll(zh, zhEnMap[zh]);
  }
  result = result
    .replace(/[，、]/g, ", ")
    .replace(/[。]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return result;
}

export function getAgeDesc(age: number | ""): string {
  if (age === "" || isNaN(Number(age))) return "";
  const n = Number(age);
  if (n < 18) return "teenage";
  if (n <= 25) return "young, early 20s";
  if (n <= 35) return "mid-20s to 30s";
  if (n <= 50) return "middle-aged";
  return "elderly";
}

export function generatePromptTemplate(char: Character): string {
  const parts: string[] = [];
  const genderEn = zhEnMap[char.gender] || "person";
  const ageDesc = getAgeDesc(char.age);
  if (ageDesc) {
    parts.push(`a ${ageDesc} Chinese ${genderEn}`);
  } else {
    parts.push(`a Chinese ${genderEn}`);
  }
  const appearance = translateZhToEn(char.appearance);
  if (appearance) parts.push(appearance);
  const clothing = translateZhToEn(char.clothing);
  if (clothing) parts.push(`wearing ${clothing}`);
  const accessory = translateZhToEn(char.accessory);
  if (accessory) parts.push(accessory);
  return parts.join(", ");
}
