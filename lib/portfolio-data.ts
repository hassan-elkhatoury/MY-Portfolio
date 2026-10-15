// Shared portfolio content from the original site, master profile, and supplied CVs.

export type Profile = {
  name: string
  title: string
  location: string
  focus: string
  mainLanguage: string
  status: string
  tagline: string
  about: string[]
  email: string
  github: string
  linkedin: string
  resume: string
  formspreeId: string
  graduationYear: number
  availability: string
  pfeTarget: string
  preferredFormat: string
  specialization: string
  languages: { language: string; level: string }[]
}

export const profile: Profile = {
  name: "Hassan El Khatoury",
  title: "Java Backend Engineer",
  location: "Marrakech, Morocco",
  focus: "Backend Engineering",
  mainLanguage: "Java",
  status: "Computer Engineering Student",
  tagline: "Building reliable Java backends, thoughtful APIs, and database-driven applications.",
  about: [
    "I am a Computer Engineering student at ENSA Al Hoceima, graduating in 2027 and specializing in software engineering. Based in Marrakech, Morocco, I focus on Java backend development, Spring Boot, REST APIs, and relational databases. I hold Oracle Certified Professional credentials for Java SE 11 and Java SE 17, alongside an Oracle Cloud Infrastructure Foundations credential.",
    "My experience includes building an enterprise fleet-management backend at the Ministry of Economy and Finance and developing the MODEYA e-commerce platform with Next.js, React, and Supabase. I also explore AI-integrated Java applications, machine learning, and distributed MongoDB systems. I am seeking a PFE internship for 2027 in Java backend or software engineering, with remote opportunities preferred when available.",
  ],
  email: "hassanelkhatoury@gmail.com",
  github: "https://github.com/hassan-elkhatoury",
  linkedin: "https://www.linkedin.com/in/hasan-el-khatoury-5b9648292/",
  resume: "/resume/Hassan_El_Khatoury_CV_Java_Backend.pdf",
  formspreeId: "xojngwrb",
  graduationYear: 2027,
  availability: "Seeking a PFE internship for 2027",
  pfeTarget: "Java backend / software engineering",
  preferredFormat: "Remote when available",
  specialization: "Software Engineering",
  languages: [
    { language: "Arabic", level: "Native" },
    { language: "English", level: "Fluent" },
    { language: "French", level: "Intermediate" },
  ],
}
export type Project = {
  title: string
  category: string
  description: string
  tech: string[]
  image?: string
  githubUrl?: string
  demoUrl?: string
  reportUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: "InterviewAI",
    category: "Backend",
    description:
      "AI-powered interview coaching application built with Java 17 and JavaFX 20, integrating Gemini and OpenRouter for personalized coaching and gamification. Uses MySQL persistence, DAO architecture, BCrypt password hashing, and role-based access.",
    tech: ["Java 17", "JavaFX 20", "MySQL", "Maven", "Gemini", "OpenRouter", "DAO", "BCrypt"],
    image: "/images/projects/interview-ai.png",
    githubUrl: "https://github.com/hassan-elkhatoury/InterviewAI",
    featured: true,
  },
  {
    title: "Qt Messenger",
    category: "Academic",
    description:
      "Multi-client real-time messaging system built with C++ and Qt using TCP sockets and asynchronous networking.",
    image: "/images/projects/qt-messenger.png",
    tech: ["C++17", "Qt", "TCP", "SQLite", "JSON"],
    githubUrl: "https://github.com/hassan-elkhatoury/qt-messenger",
    featured: true,
  },
  {
    title: "MongoShardLab",
    category: "Distributed Systems",
    description:
      "MongoDB sharded-cluster laboratory deployed across four laptops, combining replica sets, configuration servers, and mongos routing to explore cluster coordination, high availability, and fault testing.",
    image: "/images/projects/MongoShardLab.png",
    tech: ["MongoDB", "Sharding", "Replica Sets", "Docker", "Docker Compose", "Next.js", "LAN"],
    githubUrl: "https://github.com/hassan-elkhatoury/MongoShardLab",
    demoUrl: "https://mongodb-gi2.vercel.app/",
    featured: true,
  },
  {
    title: "CAN-2025 Predictions",
    category: "Machine Learning",
    description:
      "Full-stack CAN 2025 prediction platform using a Python and scikit-learn Random Forest model with Monte Carlo simulations, exposing prediction services through FastAPI and presenting results in a Next.js frontend.",
    image: "/images/projects/can-2025.png",
    tech: ["Python", "scikit-learn", "Random Forest", "pandas", "FastAPI", "Next.js"],
    githubUrl: "https://github.com/hassan-elkhatoury/CAN-2025-Predictions",
    reportUrl: "/reports/RAPPORT_ML_PROJECT.pdf",
  },
  {
    title: "MODEYA — Premium E-Commerce Platform",
    category: "Full Stack",
    description:
      "Premium scarf e-commerce platform built with Next.js 16, React 19, TypeScript, and Supabase. Designed an 18-table PostgreSQL schema and implemented role-based authentication, Cash on Delivery checkout, inventory and order management, and an admin analytics dashboard.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase", "PostgreSQL", "Zustand", "Zod"],
    featured: true,
  },
  {
    title: "E-Commerce Website",
    category: "Full Stack",
    description:
      "Laravel-based e-commerce platform with authentication, cart, and admin dashboard.",
    image: "/images/projects/ecommerce.png",
    tech: ["PHP", "Laravel", "MySQL", "Blade"],
    githubUrl: "https://github.com/hassan-elkhatoury/E-Commerce_Website",
  },
  {
    title: "Gestion des Affectations des Enseignements",
    category: "Full Stack",
    description:
      "Web application for managing teaching unit assignments across academic departments. Features role-based access for admins, department heads, coordinators, and professors with preference selection, workload balancing, grade uploads, and Excel import/export.",
    image: "/images/projects/student-management.png",
    tech: ["PHP", "MySQL", "Composer", "XAMPP"],
    githubUrl: "https://github.com/hassan-elkhatoury/e-service",
  },

]

export type Experience = {
  title: string
  company: string
  logo?: string
  location: string
  period: string
  type: string
  responsibilities: string[]
}

export const experiences: Experience[] = [
  {
    title: "Software Engineering Intern",
    company: "Ministry of Economy and Finance (MEF)",
    location: "Rabat, Morocco · Hybrid",
    period: "Jul 2026 – Sep 2026",
    type: "Internship",
    responsibilities: [
      "Developed backend features for an enterprise fleet-management system using Java, Spring Boot, Spring Data JPA, and Hibernate",
      "Implemented vehicle, insurance, fuel, maintenance, and operational cost-management modules",
      "Designed and integrated REST APIs with relational databases and JPA entity relationships",
      "Applied Git workflows, Agile development, unit testing, and clean architecture principles",
    ],
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "MODEYA",
    location: "Remote",
    period: "Mar 2026 – Jun 2026",
    type: "Freelance",
    responsibilities: [
      "Built a premium e-commerce platform using Next.js, React, TypeScript, Supabase, and PostgreSQL",
      "Designed an 18-table PostgreSQL schema and implemented role-based authentication",
      "Implemented product discovery, cart, and Cash on Delivery checkout",
      "Developed inventory and order management with an admin analytics dashboard",
    ],
  },
  {
    title: "Web Development Intern",
    company: "CodSoft",
    logo: "/images/logos/codsoft.png",
    location: "Remote",
    period: "Feb 2025 – Mar 2025",
    type: "Internship",
    responsibilities: [
      "Built and delivered 10+ web application features using REST APIs and modern web technologies",
      "Collaborated with a distributed team using Git workflows and pull request reviews",
      "Applied clean architecture principles to improve code maintainability and modularity",
    ],
  },
]

export type Education = {
  degree: string
  institution: string
  location: string
  period: string
  logo?: string
  details?: string[]
  focus?: string[]
  featured?: boolean
}

export const education: Education[] = [
  {
    degree: "Engineering Degree in Computer Science",
    institution: "ENSAH — National School of Applied Sciences, Al Hoceima",
    location: "Al Hoceima, Morocco",
    period: "2022 – 2027 (Expected)",
    logo: "/images/logos/ensah.png",
    details: [
      "Engineering Cycle: 2024 – 2027",
      "Preparatory Classes: 2022 – 2024",
    ],
    focus:[
      "Advanced Algorithms, Advanced Java Programming, Software Architecture, Databases, Networks, Linux"
    ],
    featured: true,
  },
  {
    degree: "Baccalauréat in Mathematical Sciences (French Option)",
    institution: "High School",
    location: "Morocco",
    period: "2022",
  },
]

export type Certification = {
  title: string
  issuer: string
  logo: string
  issued?: string
  expires?: string
  credentialId?: string
  skills?: string[]
  verifyUrl?: string
  pdfFile?: string
  featured?: boolean
}

export const certifications: Certification[] = [
  {
    title: "Oracle Certified Professional: Java SE 17 Developer",
    issuer: "Oracle",
    logo: "/images/logos/oracle.png",
    issued: "Feb 2026",
    credentialId: "103380522OCPJSE17",
    skills: ["Modules", "Generics"],
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=9D8818D30FB5F85D194238131DABA947BB49BCE0EC089189A0773287556E2D99",
    pdfFile: "/certifications/JAVA17_certif.pdf",
    featured: true,
  },
  {
    title: "Oracle Certified Professional: Java SE 11 Developer",
    issuer: "Oracle",
    logo: "/images/logos/oracle.png",
    issued: "Feb 2026",
    credentialId: "103380522OCPJSE11",
    skills: ["Java", "OOP", "Exception Handling", "JDBC"],
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=9D8818D30FB5F85D194238131DABA947C9B84CA45D5C800CAEA1DC3FF5A817BA",
    pdfFile: "/certifications/JAVA11_certif.pdf",
    featured: true,
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    logo: "/images/logos/oracle.png",
    issued: "Dec 2025",
    expires: "Dec 2027",
    credentialId: "103380522OCI25FND",
    skills: ["OCI"],
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=6B0D0A107A85EFB7141DD92D98D4B843A66480EF8C1BB2F328028C0951B190C7",
    pdfFile: "/certifications/OCI_certif.pdf",
    featured: true,
  },
  {
    title: "Java Programming Fundamentals",
    issuer: "IBM",
    logo: "/images/logos/ibm.png",
    credentialId: "J5AJUMQQ2VWR",
    verifyUrl: "https://coursera.org/verify/specialization/J5AJUMQQ2VWR",
    pdfFile: "/certifications/java_fundamentals_certif.pdf",
  },
  {
    title: "English for Career Development",
    issuer: "University of Pennsylvania",
    logo: "/images/logos/upenn.png",
    issued: "Nov 2025",
    credentialId: "VZJ8WT1LARVN",
    verifyUrl: "https://coursera.org/verify/VZJ8WT1LARVN",
    pdfFile: "/certifications/english_career_certif.pdf",
  },
  {
    title: "OCI Foundations",
    issuer: "Oracle via Coursera",
    logo: "/images/logos/coursera.png",
    issued: "Nov 2025",
    credentialId: "YCQ9UV5ESM1D",
    verifyUrl: "https://coursera.org/verify/YCQ9UV5ESM1D",
    pdfFile: "/certifications/oci_foundations_certif.pdf",
  },
  {
    title: "Git, GitLab, GitHub Fundamentals",
    issuer: "Udemy",
    logo: "/images/logos/udemy.png",
    issued: "Feb 2025",
    verifyUrl: "https://www.udemy.com/certificate/UC-96829962-1560-4ce3-9b18-7cee71d51e95/",
    pdfFile: "/certifications/git_fundamentals_certif.pdf",
  },
  {
    title: "Complete C Programming Course",
    issuer: "Udemy",
    logo: "/images/logos/udemy.png",
    issued: "Dec 2024",
    verifyUrl: "https://www.udemy.com/certificate/UC-f9f55087-328f-42e2-b7d0-59999fc535c8/",
    pdfFile: "/certifications/c_programming_certif.pdf",
  },
  {
    title: "CSS, Bootstrap, JavaScript, and PHP Stack",
    issuer: "Udemy",
    logo: "/images/logos/udemy.png",
    issued: "Mar 2025",
    verifyUrl: "https://www.udemy.com/certificate/UC-74fb0079-0375-4f30-b5a4-576b8d91ac8c/",
    pdfFile: "/certifications/css_bootstrap_js_php_certif.pdf",
  },
  {
    title: "Java App Development Project",
    issuer: "SkillUp Online",
    logo: "/images/logos/skillup.png",
    issued: "Nov 2025",
    verifyUrl: "https://coursera.org/verify/WY56TELFWL8H",
    pdfFile: "/certifications/java_app_dev_certif.pdf",
  },
  {
    title: "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
    issuer: "IBM",
    logo: "/images/logos/ibm.png",
    issued: "Nov 2025",
    verifyUrl: "https://coursera.org/verify/I8OGFV1ECM2J",
    pdfFile: "/certifications/containers_docker_k8s_certif.pdf",
  },
  {
    title: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM",
    logo: "/images/logos/ibm.png",
    issued: "Nov 2025",
    verifyUrl: "https://coursera.org/verify/VOYNZ8ZAOPX3",
    pdfFile: "/certifications/eda_ml_certif.pdf",
  },
]

export type SkillGroup = {
  title: string
  skills: string[]
  status: string
}
export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    skills: ["Java", "Python", "C", "C++", "SQL", "JavaScript", "TypeScript", "PHP"],
    status: "Core",
  },
  {
    title: "Backend & Software Engineering",
    skills: ["Spring Boot", "Spring Data JPA", "Hibernate", "REST APIs", "Clean Architecture", "MVC Architecture", "Layered Architecture", "OOP", "Design Patterns", "Authentication & Security", "Microservices", "Unit Testing", "Agile"],
    status: "Specialty",
  },
  {
    title: "Databases",
    skills: ["MySQL", "MariaDB", "PostgreSQL", "Supabase", "Oracle Database", "MongoDB", "MongoDB Sharding", "JDBC", "Database Design", "JPA Entity Relationships"],
    status: "Data",
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "GitLab", "Linux", "Docker", "Oracle Cloud Infrastructure (OCI)", "Maven", "CMake", "Composer", "Node.js", "Vercel", "XAMPP"],
    status: "DevOps",
  },
  {
    title: "CS Fundamentals",
    skills: ["Data Structures", "Algorithms", "Problem Solving", "Complexity Analysis", "Systems Programming", "Networking Fundamentals"],
    status: "Foundation",
  },
  {
    title: "Frontend & Web Development",
    skills: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Laravel", "AJAX", "Framer Motion", "Zustand", "Zod"],
    status: "Web",
  },
  {
    title: "AI & Machine Learning",
    skills: ["scikit-learn", "Random Forest", "Machine Learning Pipelines", "FastAPI", "Google Gemini", "OpenRouter", "LLM API Integration"],
    status: "AI / ML",
  },
]
