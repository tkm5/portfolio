export interface ProjectSection {
  title: {
    ja: string;
    en: string;
  };
  content: {
    ja: string[];
    en: string[];
  };
  list?: {
    ja: string[];
    en: string[];
  };
}

export interface Project {
  slug: string;
  title: {
    ja: string;
    en: string;
  };
  meta: {
    ja: string;
    en: string;
  };
  description: string;
  sections: ProjectSection[];
  technologies: string[];
}

export interface Experience {
  company: {
    ja: string;
    en: string;
  };
  period: string;
  role: {
    ja: string;
    en: string;
  };
}

export interface SkillCategory {
  title: string;
  skills: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  github: string;
  formspreeId: string;
}
