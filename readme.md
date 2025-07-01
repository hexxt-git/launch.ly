# 🚀 launch.ly

## Problem Statement

Innovative concepts fail to deliver real world impact because there’s no clear, systematic path from ideation through validation to execution. Entrepreneurs often work with messy data and have to rely only on their intuition to guide them through the process.

## Proposed Solution

A studio that guides you from an initial spark to a solid project concept. the platform offers tools for multiple steps as follows: brainstorming, validation, market research, planning and execution

## Core Features

**Brainstorming**: Input problems, audiences, themes, and constraints to generate and rank dozens of tailored project ideas.

**Validation**: Run quick surveys, TAM/SAM/SOM calculators, and business‑model canvases to vet and score your top concepts.

**Market Research**: Auto‑scan competitors, aggregate industry trends, and pull live keyword signals for actionable insights.

**Planning**: Turn validated ideas into milestone‑driven roadmaps and prioritized to‑do lists with time and resource estimates.

**Execution**: Leverage specialized AI agents to draft marketing copy, name your project, export tasks to your favorite tools, and track progress.

**Outreach Automation**: Setup and manage lead generation and outreach campaigns with cold emails, phone calls, Dms.

## 🧠 Architecture

## 🛠️ Tech Stack

- **Web Application:** Tanstack Start, React
- **Database:** PostgreSQL (production) / SQLite (development)
- **ORM:** Prisma
- **AI:** LangGraph.js with Google Gemini
- **Task Scheduling:** Chronos Engine (Kafka + Python FastAPI)
- **Styling:** Tailwind CSS + shadcn/ui

# Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/[your-username]/launch.ly.git
   cd launch.ly
   ```

2. **Configure environment:**
   Create `.env.local` in the project root:

   ```env
   # Development (SQLite)
   DATABASE_URL="file:./dev.db"

   # Production (PostgreSQL)
   # DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

   GOOGLE_API_KEY="your_google_api_key_here"
   ```

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Setup database:**

   ```bash
   pnpm prisma db push
   ```

5. **Start Chronos Engine:**

   ```bash
   cd scheduling/chronos-engine
   docker-compose up --build -d
   ```

6. **Run the application:**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173`.
