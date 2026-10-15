export type CaseStudy = {
  slug: string
  projectTitle: string
  title: string
  organization: string
  eyebrow: string
  role: string
  period?: string
  summary: string
  challenge: string
  stack: string[]
  evidence: { value: string; label: string }[]
  contributions: string[]
  architecture: { label: string; detail: string }[]
  decisions: { title: string; detail: string }[]
  verification: string[]
  reflections: string[]
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
  sourceUrl?: string
  demoUrl?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "mef-fleet-management",
    projectTitle: "MEF Fleet Management",
    title: "Connecting the moving parts of fleet management.",
    organization: "Ministry of Economy and Finance",
    eyebrow: "ENTERPRISE BACKEND / INTERNSHIP",
    role: "Software Engineering Intern",
    period: "Jul 2026 – Sep 2026",
    summary: "Java and Spring Boot backend work for an enterprise fleet-management system at Morocco’s Ministry of Economy and Finance, connecting vehicles with their insurance, fuel, maintenance, and operational costs.",
    challenge: "Fleet information spans several related workflows: a vehicle has a lifecycle, insurance records, fuel consumption, maintenance events, and associated expenditure. The engineering problem is to represent those relationships consistently and expose clear APIs for the people working with them.",
    stack: ["Java 17", "Spring Boot", "Spring Data JPA", "Hibernate", "REST APIs", "PostgreSQL", "JUnit 5", "Maven"],
    evidence: [
      { value: "5", label: "documented fleet module areas" },
      { value: "Java", label: "Spring Boot backend" },
      { value: "2026", label: "MEF internship" },
    ],
    contributions: [
      "Developed backend features using Java, Spring Boot, Spring Data JPA, and Hibernate.",
      "Implemented features across vehicle, insurance, fuel, maintenance, and operational cost management.",
      "Designed and integrated REST APIs backed by relational data and JPA entity relationships.",
      "Worked with Git, Agile development, unit testing, and clean architecture principles during the internship.",
    ],
    architecture: [
      { label: "REST controllers", detail: "HTTP endpoints and request/response DTOs expose fleet operations." },
      { label: "Domain services", detail: "Vehicle, insurance, fuel, maintenance, and budget workflows hold business rules." },
      { label: "JPA repositories", detail: "Spring Data JPA and Hibernate connect services to related entities." },
      { label: "PostgreSQL", detail: "Relational persistence for fleet records and their operational relationships." },
    ],
    decisions: [
      { title: "Keep the fleet connected through relational data.", detail: "JPA entity relationships represent the links between vehicles and their associated records. This supports structured queries across modules, while making relationship ownership and persistence boundaries important implementation concerns." },
      { title: "Give business rules a service boundary.", detail: "The source separates controllers, DTOs, services, entities, and repositories. This keeps HTTP handling distinct from domain workflows and database access, with additional mapping code as the cost of that separation." },
      { title: "Treat lifecycle changes as business events.", detail: "The maintenance source includes preventive alerts and changes to vehicle status when a breakdown is immobilizing. These interactions make consistency across maintenance, vehicle availability, and costs a central concern." },
    ],
    verification: [
      "Unit testing is part of the documented internship practice.",
      "The available source contains JUnit 5 tests using SpringBootTest, a test profile, and transactional service/database integration.",
      "Maintenance test source checks preventive alerts, vehicle status changes after breakdowns, incident handling, and budget effects; separate source covers budget/dashboard and acceptance scenarios.",
    ],
    reflections: [
      "A fleet system is a set of connected lifecycles. A change in maintenance can also affect availability and budget records.",
      "Clear service boundaries and explicit entity relationships provide concrete places to review those interactions.",
    ],
  },
  {
    slug: "interview-ai",
    projectTitle: "InterviewAI",
    title: "Turning interview preparation into a Java application.",
    organization: "Independent project",
    eyebrow: "JAVA DESKTOP / AI INTEGRATION",
    role: "Java application development",
    summary: "An AI-powered interview coaching desktop application built with Java 17 and JavaFX 20, integrating Gemini and OpenRouter with MySQL persistence, account access, and gamification.",
    challenge: "Interview preparation brings together an interactive user experience, personalized coaching, and saved progress. This project combines a Java desktop interface with database-backed application features and external AI services.",
    stack: ["Java 17", "JavaFX 20", "MySQL", "Maven", "Gemini", "OpenRouter", "DAO", "BCrypt"],
    evidence: [
      { value: "2", label: "documented AI provider integrations" },
      { value: "Java 17", label: "application foundation" },
      { value: "JavaFX", label: "desktop interface" },
    ],
    contributions: [
      "Built a Java desktop application for AI-assisted interview preparation and coaching.",
      "Integrated Gemini and OpenRouter for personalized AI coaching features.",
      "Implemented MySQL persistence through a DAO architecture, with BCrypt password hashing and role-based access.",
      "Added gamification alongside the interview preparation experience.",
    ],
    architecture: [
      { label: "JavaFX 20", detail: "Desktop screens present interview preparation, account access, and coaching." },
      { label: "Java 17 application", detail: "Application logic connects the interface with persistence and AI integrations." },
      { label: "DAO + MySQL", detail: "Data access objects separate database persistence from the desktop interface." },
      { label: "Gemini + OpenRouter", detail: "Two documented provider integrations supply AI coaching capabilities." },
    ],
    decisions: [
      { title: "Separate persistence with data access objects.", detail: "The documented DAO architecture gives MySQL access a distinct boundary. It reduces the need for database-specific work in interface code while requiring explicit data mapping and connection handling." },
      { title: "Integrate AI as an application dependency.", detail: "Gemini and OpenRouter bring external model capabilities into the Java application. These integrations also introduce network latency, provider availability, and response handling as concerns to verify alongside the desktop workflow." },
      { title: "Combine coaching with account access.", detail: "The application documents role-based access and BCrypt password hashing. These address account permissions and password storage; they should be reviewed together with session behavior and access to saved user data." },
    ],
    verification: [
      "Account creation, sign-in, role restrictions, and password handling.",
      "Saved interview data and consistency between JavaFX interactions and MySQL persistence.",
      "Coaching responses from each provider, unavailable-provider behavior, and application responsiveness during requests.",
    ],
    reflections: [
      "Desktop software with AI integrations still depends on familiar engineering boundaries: interface, application logic, database access, and external services.",
      "Provider behavior and network failures deserve the same attention as successful coaching responses when reviewing the user experience.",
    ],
    image: { src: "/images/projects/interview-ai.png", alt: "Screenshot of the InterviewAI Java desktop application", caption: "InterviewAI application screenshot from the existing project portfolio.", width: 1919, height: 1079 },
    sourceUrl: "https://github.com/hassan-elkhatoury/InterviewAI",
  },
  {
    slug: "modeya",
    projectTitle: "MODEYA",
    title: "Building the storefront and the operations behind it.",
    organization: "MODEYA / MODÉYA SCARF",
    eyebrow: "FULL STACK / E-COMMERCE",
    role: "Freelance Full-Stack Developer",
    period: "Mar 2026 – Jun 2026",
    summary: "A premium scarf e-commerce platform built with Next.js 16, React 19, TypeScript, and Supabase, connecting product discovery and Cash on Delivery checkout with catalog, inventory, orders, and administration.",
    challenge: "A storefront is one part of a commerce system. Customers need product discovery, a cart, and checkout; administrators need a consistent way to manage products, inventory, orders, and content. MODEYA connects these experiences through a shared database and authenticated access.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase", "PostgreSQL", "Zustand", "Zod"],
    evidence: [
      { value: "18", label: "tables in the documented project scope" },
      { value: "COD", label: "Cash on Delivery checkout" },
      { value: "Full stack", label: "storefront + administration" },
    ],
    contributions: [
      "Developed a premium e-commerce storefront with product discovery, collections, product pages, a cart, and checkout.",
      "Designed the documented 18-table PostgreSQL schema and implemented role-based authentication with Supabase.",
      "Implemented Cash on Delivery checkout alongside inventory and order management.",
      "Built an admin analytics dashboard and management interfaces for store operations.",
    ],
    architecture: [
      { label: "Next.js + React", detail: "Storefront, customer account pages, and a role-protected administration area." },
      { label: "Application layer", detail: "Server actions and route handlers support commerce and management workflows." },
      { label: "Supabase", detail: "Authentication and PostgreSQL-backed data access connect the application to stored records." },
      { label: "Commerce records", detail: "Products, variants, orders, order items, customer profiles, and related content." },
    ],
    decisions: [
      { title: "Use a relational model for commerce.", detail: "Products, variants, orders, and order items have distinct responsibilities in the schema. Their relationships support both customer-facing flows and administrative work. The 18-table figure describes the documented project scope; the current source has expanded since that scope was recorded." },
      { title: "Make Cash on Delivery the checkout model.", detail: "The documented implementation uses Cash on Delivery instead of an online card-payment flow. This makes order capture and the subsequent operational workflow central to checkout, without implying that a payment gateway has processed a transaction." },
      { title: "Protect administration alongside customer access.", detail: "Supabase authentication and role-protected administration distinguish customer account features from store management. Authorization needs to be enforced where data is accessed, in addition to controlling which interface a user can see." },
    ],
    verification: [
      "Product and variant selection, cart changes, checkout validation, and order confirmation.",
      "Customer authentication, authorization for administration, and access to customer-specific records.",
      "Inventory changes, order management, and consistency between storefront information and administrative updates.",
    ],
    reflections: [
      "The customer experience and operational data model need to agree on products, inventory, and orders.",
      "A clear checkout model and explicit access boundaries make the system easier to reason about as storefront and administration features grow.",
    ],
    image: { src: "/images/projects/modeya-storefront.webp", alt: "The actual MODEYA scarf storefront homepage, showing its product collection and navigation", caption: "The public MODEYA storefront at modeya.page, captured from the live site.", width: 1411, height: 697 },
    demoUrl: "https://www.modeya.page/",
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug)
}
