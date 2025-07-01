# 🚀 launch.ly

**launch.ly** is an AI-native application that transforms a single startup idea into a fully refined concept with an actionable execution plan. It uses a sophisticated, two-stage multi-agent system to simulate a team of expert collaborators, guided by human interaction.

## ✨ Core Features

* **AI-Powered Idea Refinement:** Leverages a "Refinement Council" of specialized AI agents to analyze an idea from every critical angle (marketing, legal, technical, etc.).
* **Live Collaboration Showcase:** A real-time streaming UI that visualizes the agent collaboration, showing which agent is "thinking" and displaying their insights as they are generated.
* **Structured Reporting:** A final, clean summary report is generated for user review, synthesizing the entire collaboration into actionable insights.
* **Human-in-the-Loop Approval:** The user acts as the CEO, giving the final "go" or "no-go" on the refined concept before any execution planning begins.
* **Type-Safe Full-Stack:** Built on a modern, fully type-safe stack from the database to the UI.

## 🧠 The Agentic Architecture

The core of launch.ly is a two-team agent system, with a critical human interaction point acting as a gate between them.

### Team 1: The Refinement Council

This is the initial "think tank." Its goal is to take a raw idea and forge it into a viable concept.


                           +-----------------+
                           |   User's Idea   |
                           +-----------------+
                                   |
                                   V
                        +--------------------+
                        |  Refinement Graph  | (Looping)
                        |--------------------|
                        |   - Marketing      |
                        |   - Brand          |
                        |   - Software       |
                        |   - Law            |
                        +--------------------+
                                   |
                                   V
                          +----------------+
                          | Summary Agent  |
                          +----------------+
                                   |
                                   V


### The Human Interaction Gate
This is the most important step. The system does not proceed automatically.


                           +-----------------+
                           |  Final Report   |
                           +-----------------+
                                   |

+--------------------------------------V--------------------------------------+
|                                                                             |
|                      Does the User Accept the Report?                       |
|                                                                             |
+--------------------------------------|--------------------------------------+
| (Yes)                                  | (No)
V                                        V
+-------------------+                          +----------+
| Proceed to Team 2 |                          |   End    |
+-------------------+                          +----------+


### Team 2: The Execution Crew

Once the user grants approval, the refined concept is handed off to a new team of agents focused on action.


    +-------------------+
    |  Accepted Report  |
    +-------------------+
              |
              V
    +-------------------+
    |   Planner Agent   |  (Creates a structured JSON plan)
    +-------------------+
              |
              V
    +--------------------+
    |  Execution Graph   |
    |--------------------|
    | - Marketing Executor (uses video/post tools) |
    | - Sales Executor (uses lead-gen tools)       |
    | - Calendar Agent (uses scheduling tools)     |
    +--------------------+
              |
              V
    +---------------------+
    |  Actionable Output  |
    | (Calendar Events,   |
    |  Ad Scripts, etc.)  |
    +---------------------+


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

## 🗺️ Roadmap

* ✅ **Phase 1: Idea Refinement & Reporting**
    * Implement the "Refinement Council" agent graph.
    * Build the real-time streaming UI to showcase agent collaboration.
    * Generate a final summary report.
* ▶️ **Phase 2: Planning & Execution**
    * Build the "Planner Agent" to convert the final report into a structured JSON plan.
    * Develop a set of "Execution Tools" (e.g., video generation, social media posting, calendar integration).
    * Create the "Execution Crew" graph that uses these tools to carry out the plan.
* **Phase 3: Idea & Project Management**
    * Develop a dashboard to view, save, and manage past idea refinement sessions.
    * Implement user authentication to associate ideas with users.
    * Allow users to select a past idea and re-enter the "Planning & Execution" phase.