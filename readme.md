# 🚀 launch.ly

## Problem Statement

Innovative concepts fail to deliver real world impact because there’s no clear, systematic path from ideation through validation to execution. Entrepreneurs often work with messy data and have to rely only on their intuition to guide them through the process.

## Proposed Solution

A studio that guides you from an initial spark to a solid project concept. the platform offers tools for multiple steps as follows: brainstorming, validation, market research, planning/execution and sales

## Core Features

**Brainstorming**: Input problems, audiences, themes, and constraints to generate and rank dozens of tailored project ideas.

**Validation**: Run quick surveys, TAM/SAM/SOM calculators, and business‑model canvases to vet and score your top concepts.

**Market Research**: Auto‑scan competitors, aggregate industry trends, and pull live keyword signals for actionable insights.

**Planning**: Turn validated ideas into milestone‑driven roadmaps and prioritized to‑do lists with time and resource estimates.

**Execution**: Leverage specialized AI agents to draft marketing copy, name your project, export tasks to your favorite tools, and track progress.

**Outreach Automation**: Setup and manage lead generation and outreach campaigns with cold emails, phone calls, Dms.

## 🧠 Architecture
### Step 1
brainstorming

![diagram-export-7-1-2025-11_00_44-PM](https://github.com/user-attachments/assets/6fbb19b8-df5f-4a28-990e-898a80541a3a)

### Step 2
idea validation and choosing a project

![diagram-export-7-1-2025-11_06_08-PM](https://github.com/user-attachments/assets/4118bbd0-e4ca-4173-bf52-33da104ed5b4)

### Step 3
Execution, planning and building the project

![diagram-export-7-1-2025-11_11_01-PM](https://github.com/user-attachments/assets/abda0914-4175-43e0-839b-f8d02b7620db)

### Step 4
Sales/outreach Automation

![diagram-export-7-1-2025-11_16_10-PM](https://github.com/user-attachments/assets/1eb91c4e-7204-473d-92b1-09b613e546c2)


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
