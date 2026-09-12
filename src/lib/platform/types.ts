export type CompetencyCategory =
  | "Statistical"
  | "Technical"
  | "Digital Governance"
  | "Behavioural & Managerial";

export const LEVEL_LABELS: Record<number, string> = {
  0: "Not Assessed",
  1: "Beginner",
  2: "Basic",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export interface Competency {
  id: string;
  name: string;
  category: CompetencyCategory;
  description: string;
  /** Level required for the officer's role (1-5). */
  required: number;
}

export type GapSeverity = "No Gap" | "Low" | "Medium" | "High" | "Critical";

export interface GapRow {
  competency: Competency;
  current: number;
  required: number;
  gap: number;
  severity: GapSeverity;
}

export interface AssessmentQuestion {
  id: string;
  competencyId: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  provider: string;
  competencyIds: string[];
  level: number;
  durationHours: number;
  format: "Self-paced" | "Blended" | "Instructor-led";
  rating: number;
  learners: number;
  departmentPriority: number; // 0-1
  careerRelevance: number; // 0-1
  roleRelevance: number; // 0-1
  description: string;
}

export interface Enrollment {
  courseId: string;
  progress: number; // 0-100
  enrolledAt: string;
}

export interface GeneratedMCQ {
  id: string;
  competencyId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceExcerpt: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
}

export interface ValidationResult {
  fourOptions: boolean;
  singleCorrect: boolean;
  hasExplanation: boolean;
  sourceLinked: boolean;
  competencyDetected: boolean;
}

export interface LearnerProfile {
  name: string;
  designation: string;
  division: string;
  department: string;
  grade: string;
  location: string;
  email: string;
  joinedOn: string;
  learningHours: number;
}

export interface HistoryEvent {
  id: string;
  at: string;
  kind: "assessment" | "enrollment" | "progress" | "material" | "mcq-test";
  label: string;
  detail: string;
}
