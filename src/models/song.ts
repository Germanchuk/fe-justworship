export interface Song {
  id: number;
  name: string;
  bpm: number;
  key: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  sections: Section[];
  // there is field 'owner' with detailed info, it's better to refactor it to isMy or something
}

export interface Section {
  id: number;
  content: string;
  spacing: number;
}

export type Status = "error" | "saved" | "saving" | "pending";