import { projects } from "./portfolio-data"

export const projectSlugs = ["interview-ai", "qt-messenger", "mongoshardlab", "can-2025-predictions", "modeya", "e-commerce", "e-service", "arabela-collection"] as const
export function projectSlug(title: string) { return projectSlugs[projects.findIndex(project => project.title === title)] }
export function getProject(slug: string) { return projects.find(project => projectSlug(project.title) === slug) }

/** These notes summarize the existing portfolio descriptions, rather than claiming measured outcomes. */
export const projectNotes: Record<string, { focus: string; scope: string[] }> = {
  "interview-ai": { focus: "Bring interview practice, saved progress, and AI coaching together in a Java desktop application.", scope: ["JavaFX desktop interface and Java 17 application logic", "Gemini and OpenRouter coaching integrations", "DAO persistence with MySQL, BCrypt, and role-based access", "Gamification alongside interview preparation"] },
  "qt-messenger": { focus: "Connect multiple messaging clients while keeping a desktop interface responsive to network activity.", scope: ["C++17 and Qt desktop application", "TCP sockets and asynchronous networking", "JSON and SQLite in the documented stack"] },
  mongoshardlab: { focus: "Explore coordination and availability in a distributed MongoDB deployment across four laptops.", scope: ["Sharded cluster with mongos routing", "Replica sets and configuration servers", "Docker and Docker Compose deployment over a LAN", "High availability and fault testing laboratory"] },
  "can-2025-predictions": { focus: "Connect a machine learning prediction pipeline to an application people can explore.", scope: ["Python and scikit-learn Random Forest model", "Monte Carlo simulations", "Prediction services exposed through FastAPI", "Next.js frontend and a project report"] },
  modeya: { focus: "Connect a scarf storefront and Cash on Delivery checkout with the operations behind the catalog.", scope: ["Next.js 16, React 19, and TypeScript storefront", "Supabase with a documented 18-table PostgreSQL schema", "Role-based authentication and Cash on Delivery checkout", "Inventory, orders, and an admin analytics dashboard"] },
  "e-commerce": { focus: "Bring shopping, account access, and administration into a Laravel application.", scope: ["PHP and Laravel application", "Authentication and shopping cart", "Administrative dashboard", "MySQL persistence and Blade views"] },
  "e-service": { focus: "Organize teaching-unit assignments across academic departments and their different responsibilities.", scope: ["Roles for admins, department heads, coordinators, and professors", "Preference selection and workload balancing", "Grade uploads and Excel import/export", "PHP, MySQL, Composer, and XAMPP"] },
  "arabela-collection": { focus: "Support a modest-fashion storefront in Arabic, French, and English, with a connected order workflow.", scope: ["Multilingual Next.js and React storefront", "Customer accounts and wishlist", "Cash on Delivery checkout with city-based shipping", "Protected catalog and order administration with Supabase"] },
}
