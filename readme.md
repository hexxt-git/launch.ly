# 🚀 launch.ly

**launch.ly** is an AI-native application that transforms a single startup idea into a fully refined concept with an actionable execution plan. It uses a sophisticated, two-stage multi-agent system to simulate a team of expert collaborators, guided by human interaction.

## ✨ Core Features

* **AI-Powered Idea Refinement:** Leverages a "Refinement Council" of specialized AI agents to analyze an idea from every critical angle (marketing, legal, technical, etc.).
* **Live Collaboration Showcase:** A real-time streaming UI that visualizes the agent collaboration, showing which agent is "thinking" and displaying their insights as they are generated.
* **Structured Reporting:** A final, clean summary report is generated for user review, synthesizing the entire collaboration into actionable insights.
* **Human-in-the-Loop Approval:** The user acts as the CEO, giving the final "go" or "no-go" on the refined concept before any execution planning begins.
* **Type-Safe Full-Stack:** Built on a modern, fully type-safe stack from the database to the UI.

## 🧠 The Agentic Architecture
![image](https://github.com/user-attachments/assets/4bb3404d-d240-4ea3-94a6-6eb311f9887a)





## 🛠️ Tech Stack

* **Framework:** Next.js
* **Routing & Server Functions:** TanStack Router
* **Database & ORM:** Prisma
* **AI Orchestration:** LangGraph.js
* **Language Model (LLM):** Google Gemini
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **Package Manager:** pnpm

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or newer)
* pnpm
* A Google Gemini API Key
* A PostgreSQL or other database connection string

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[hexxt]/idea_to_gen.git
    cd launch.ly
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project. Add your database URL and Google API key:
    ```
    DATABASE_URL="your_database_connection_string"
    GOOGLE_API_KEY="your_google_api_key_here"
    ```

4.  **Run database migrations:**
    Push the Prisma schema to your database.
    ```bash
    pnpm prisma db push
    ```

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```

The application will be available at `http://localhost:3000`.

