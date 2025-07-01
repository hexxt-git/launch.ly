# 🚀 launch.ly

**launch.ly** is an AI-native application that transforms a single startup idea into a fully refined concept with an actionable, scheduled execution plan. It uses a sophisticated, two-stage multi-agent system to simulate a team of expert collaborators, which then feeds a resilient, distributed task scheduler to automate real-world actions.

## ✨ Core Features

* **AI-Powered Idea Refinement:** A "Refinement Council" of specialized AI agents analyzes an idea from every critical angle (marketing, legal, technical, etc.).
* **Live Collaboration Showcase:** A real-time streaming UI that visualizes the agent collaboration, displaying their insights as they are generated.
* **Human-in-the-Loop Approval:** The user acts as the CEO, giving the final "go" or "no-go" on the refined concept before any execution planning begins.
* **Agentic Execution Planning:** A "Planner Agent" converts the final report into a structured, machine-readable JSON plan.
* **Tool-Using Executor Agents:** A crew of "Executor Agents" (Sales, Content Creator) use tools to carry out the plan, such as finding leads and drafting content.
* **Resilient Task Scheduling:** Integration with the **Chronos Engine**, a distributed task scheduler using Kafka and PostgreSQL, to reliably schedule and execute time-based tasks like sending meeting notifications or follow-up emails.

## 🧠 The Full Architecture

![image](https://github.com/user-attachments/assets/c0709320-3b20-4543-a35b-be937a4f367e)


## 🛠️ Tech Stack

* **Framework:** Next.js
* **Routing & Server Functions:** TanStack Router
* **Database:** PostgreSQL (Primary & for Chronos) & SQLite (for local development)
* **ORM:** Prisma
* **AI Orchestration:** LangGraph.js
* **Language Model (LLM):** Google Gemini
* **Task Scheduling (Chronos Engine):**
    * **Message Queue:** Apache Kafka
    * **Worker/API:** Python (FastAPI)
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **Package Manager:** pnpm

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or newer)
* pnpm
* Docker & Docker Compose (for Chronos Engine)
* A Google Gemini API Key

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[your-username]/launch.ly.git
    cd launch.ly
    ```

2.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project. Add your database URL and Google API key:
    ```.env
    # For local development with SQLite
    DATABASE_URL="file:./dev.db"
    
    # For production with PostgreSQL
    # DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    GOOGLE_API_KEY="your_google_api_key_here"
    ```

3.  **Install dependencies for the webapp:**
    ```bash
    pnpm install
    ```

4.  **Run database migrations:**
    Push the Prisma schema to your database.
    ```bash
    pnpm prisma db push
    ```

5.  **Run the Chronos Engine (Kafka, PostgreSQL, etc.):**
    Navigate to your Chronos Engine directory and start all services.
    ```bash
    cd path/to/chronos-engine
    docker-compose up --build -d
    ```

6.  **Run the main webapp development server:**
    ```bash
    pnpm dev
    ```

The application will be available at `http://localhost:3000`.

---
