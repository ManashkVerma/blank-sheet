# BlankSheet ✦

<p align="center">
  <strong>AI-Powered Diagramming Workspace</strong>
</p>

<p align="center">
  Turn natural-language ideas into interactive visual diagrams.
</p>

<p align="center">
  <a href="https://blank-sheet-brown.vercel.app/">
    🚀 Live Demo
  </a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://github.com/ManashkVerma/blank-sheet">
    📂 GitHub Repository
  </a>
</p>

---

## 📖 Overview

**BlankSheet** is a full-stack AI-powered diagramming workspace that transforms natural-language ideas into structured, interactive visual diagrams.

Instead of manually creating every shape, connection, label, and component, users can describe the system or workflow they have in mind, generate an initial diagram through AI assistance, and then edit and refine the result inside an interactive workspace.

The application combines:

* 🤖 AI-assisted diagram generation
* 🎨 Interactive diagram editing
* 📁 Project-based organization
* 🗄️ PostgreSQL-backed persistence
* 🧩 Reusable React components
* 🔷 TypeScript-based development
* 🚀 Production deployment with Vercel

---

# ✨ Features

## 🤖 AI-Powered Diagram Generation

Describe a system, workflow, architecture, or idea using natural language and generate a structured visual diagram.

### Example Prompt

```text
Create a system architecture diagram for an
e-commerce application with a frontend,
backend API, authentication service,
PostgreSQL database and payment gateway.
```

The AI-assisted workflow generates an initial diagram that can then be edited and refined inside the workspace.

---

## 🎨 Interactive Diagram Workspace

BlankSheet provides a dedicated visual workspace for creating, viewing, editing, and refining diagrams.

### Workspace capabilities

* Interactive diagram editing
* Canvas-based interaction
* Visual organization
* Diagram refinement
* Workspace controls
* AI-assisted actions
* Editing of generated diagrams

The goal is to combine the speed of AI generation with the control of a traditional visual editor.

---

## 📁 Project Management

Projects provide a structured way to organize diagram-related work.

Project data is persisted using PostgreSQL, allowing users to maintain diagram-related information across sessions.

---

## 🧩 Reusable UI Architecture

The application is organized around reusable React components, custom hooks, shared application logic, database modules, and utility layers.

This separates responsibilities across the codebase and makes the application easier to maintain and extend.

---

## 📱 Responsive Workspace

The interface is designed around a clean workspace experience with:

* Responsive layouts
* Interactive controls
* Dedicated workspace tools
* Reusable UI components
* AI-assisted actions
* Minimal visual organization

---

# 🏆 Engineering Highlights

BlankSheet is designed as a practical full-stack system rather than a static AI demo.

### ⚡ Full-Stack Architecture

Built a complete full-stack web application using **Next.js, React, TypeScript, PostgreSQL, and Drizzle ORM**, covering the interactive frontend, application logic, persistence layer, and production deployment.

### 🤖 AI-to-UI Pipeline

Implemented an end-to-end workflow where **natural-language input is transformed into structured diagram data**, which is then rendered inside an interactive workspace for further modification.

### 🎨 Interactive Editor

Integrated a canvas-based editing experience that allows generated diagrams to be **edited, organized, and refined after generation**, keeping users in control of the final output.

### 🧩 10+ Reusable Components

Built and organized **10+ reusable UI components** to modularize application interfaces and workspace functionality.

### 🗄️ Database Persistence

Implemented **PostgreSQL-backed persistence using Drizzle ORM** to store project-related data and maintain application state across user sessions.

### 🏗️ Modular Code Organization

Separated application responsibilities across:

```text
Routes
Components
Context
Hooks
Database
Utilities
Shared Logic
```

This provides clear boundaries between UI, application logic, and persistence.

### 🔷 Type-Safe Development

Used **TypeScript** throughout the application to improve type safety, maintainability, and development reliability across the codebase.

### 🔐 Environment-Based Configuration

Configured sensitive database and AI credentials through environment variables rather than hard-coding secrets into the application source.

### 🚀 Production Deployment

Deployed the complete application to **Vercel**, making the AI-assisted diagram generation workflow and database-backed workspace available as a production web application.

---

# 🏗️ System Architecture

```text
                           ┌───────────────────┐
                           │       USER        │
                           └─────────┬─────────┘
                                     │
                                     │ Natural Language Prompt
                                     ▼
                           ┌───────────────────┐
                           │   AI PROCESSING   │
                           └─────────┬─────────┘
                                     │
                                     │ Structured Diagram
                                     ▼
                   ┌────────────────────────────────┐
                   │      INTERACTIVE WORKSPACE     │
                   │                                │
                   │        Canvas + Editor         │
                   └───────────────┬────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
             ┌──────────────┐             ┌──────────────┐
             │ Edit / Refine│             │ Project Data │
             └──────────────┘             └───────┬──────┘
                                                   │
                                                   ▼
                                           ┌────────────────┐
                                           │   PostgreSQL   │
                                           └────────────────┘
```

---

# 🔄 Core Application Workflow

```text
                         ┌──────────────────┐
                         │    User Idea     │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │ Natural-Language Prompt  │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │   AI Processing  │
                       └────────┬─────────┘
                                │
                                ▼
                     ┌────────────────────┐
                     │ Diagram Generation │
                     └─────────┬──────────┘
                               │
                               ▼
                 ┌────────────────────────────┐
                 │    Interactive Workspace   │
                 └────────────┬───────────────┘
                              │
                    ┌─────────┼─────────┐
                    │         │         │
                    ▼         ▼         ▼
                  Edit      Refine    Organize
                    │         │         │
                    └─────────┼─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ Project Storage  │
                     └────────┬─────────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ PostgreSQL  │
                       └─────────────┘
```

---

# 🧠 Architecture Principles

BlankSheet follows a modular application structure designed to separate concerns.

### Presentation Layer

Responsible for:

* React components
* Workspace UI
* Interactive controls
* Diagram interactions
* Responsive layouts

### Application Layer

Responsible for:

* Shared application state
* Hooks
* Context
* Utility functions
* AI-assisted workflows

### Persistence Layer

Responsible for:

* PostgreSQL database
* Drizzle ORM
* Schema configuration
* Project persistence

### Infrastructure

Responsible for:

* Environment configuration
* Production build
* Vercel deployment

---

# 🛠️ Tech Stack

| Technology       | Purpose                                      |
| ---------------- | -------------------------------------------- |
| **Next.js**      | Full-stack React framework                   |
| **React**        | Interactive user interface                   |
| **TypeScript**   | Type-safe application development            |
| **Tailwind CSS** | Styling and responsive UI                    |
| **PostgreSQL**   | Persistent data storage                      |
| **Drizzle ORM**  | Database access and schema management        |
| **Vercel**       | Production deployment                        |
| **AI**           | Natural-language-assisted diagram generation |

---

# 📂 Project Structure

```text
blank-sheet/
│
├── app/
│   ├── workspace/
│   └── ...
│
├── components/
│   └── Reusable UI Components
│
├── context/
│   └── Shared Application Logic
│
├── db/
│   ├── Database Configuration
│   └── Database Schema
│
├── hooks/
│   └── Custom React Hooks
│
├── lib/
│   └── Utilities and Services
│
├── public/
│   └── Static Assets
│
├── drizzle.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🎯 Use Cases

## 💻 Software Architecture

Create diagrams for:

* Frontend applications
* Backend services
* REST APIs
* Databases
* Authentication systems
* External integrations
* Application infrastructure

### Example

```text
                     ┌─────────────┐
                     │   Client    │
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
                     │  Frontend   │
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
                     │  Backend    │
                     │     API     │
                     └──────┬──────┘
                            │
                     ┌──────┴──────┐
                     ▼             ▼
              ┌───────────┐ ┌─────────────┐
              │ PostgreSQL│ │  Services   │
              └───────────┘ └─────────────┘
```

---

## 🏗️ System Design

Visualize:

* Distributed systems
* Backend architecture
* APIs
* Microservices
* Databases
* Authentication
* Third-party services
* Data flows

---

## 🗄️ Database Design

Useful for representing:

* Entities
* Attributes
* Relationships
* Database structures
* Data relationships

---

## 🔄 Flowcharts

Create diagrams for:

* Algorithms
* Application workflows
* Business processes
* Decision trees
* User flows
* Process documentation

---

## 📚 Technical Documentation

Use visual diagrams to explain complex systems and make technical documentation easier to understand.

---

## 🧠 Learning & Brainstorming

Transform abstract concepts and technical ideas into structured visual representations.

---

# 📊 Project Snapshot

| Category                | Details                          |
| ----------------------- | -------------------------------- |
| **Project Type**        | AI-Powered Diagramming Workspace |
| **Architecture**        | Full-Stack Web Application       |
| **Frontend**            | Next.js + React                  |
| **Language**            | TypeScript                       |
| **Styling**             | Tailwind CSS                     |
| **Database**            | PostgreSQL                       |
| **ORM**                 | Drizzle ORM                      |
| **AI**                  | AI-Assisted Diagram Generation   |
| **Reusable Components** | 10+                              |
| **Deployment**          | Vercel                           |

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js 18+
* npm
* PostgreSQL
* Git

Verify your installations:

```bash
node --version
npm --version
git --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/ManashkVerma/blank-sheet.git
cd blank-sheet
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
DATABASE_URL="your_postgresql_connection_string"
```

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/blank_sheet"
```

Configure the required AI credentials as environment variables as well.

Example:

```env
AI_API_KEY="your_api_key"
```

> Never commit `.env.local` or private API keys to GitHub.

---

## 4. Setup the Database

Push the database schema using Drizzle ORM:

```bash
npx drizzle-kit push
```

Make sure your PostgreSQL database is running before executing this command.

---

## 5. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# 🧪 Development Commands

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Production Server

```bash
npm start
```

### Lint

```bash
npm run lint
```

---

# 🔐 Environment Configuration

Sensitive configuration should be stored outside the source code.

Example:

```env
DATABASE_URL="your_database_url"
AI_API_KEY="your_ai_api_key"
```

Recommended `.gitignore` entries:

```gitignore
.env
.env.local
.env.*.local
```

Never expose private credentials through client-side code or commit them to the repository.

---

# ☁️ Deployment

BlankSheet is deployed using **Vercel**.

## 🚀 Production Application

**[Launch BlankSheet](https://blank-sheet-brown.vercel.app/)**

## Deploy Your Own Instance

### 1. Fork the Repository

```text
https://github.com/ManashkVerma/blank-sheet
```

### 2. Import into Vercel

Connect the GitHub repository to Vercel.

### 3. Configure Environment Variables

Add the required variables:

```text
DATABASE_URL
AI_API_KEY
```

### 4. Configure PostgreSQL

Connect the deployment to a PostgreSQL database.

### 5. Deploy

Deploy the application through Vercel.

---

# 💡 Why BlankSheet?

Traditional diagramming requires users to manually create and arrange shapes, connections, labels, and system components.

### Traditional Workflow

```text
Idea
  ↓
Open Diagram Tool
  ↓
Add Shapes
  ↓
Add Connections
  ↓
Add Labels
  ↓
Arrange Elements
  ↓
Edit
  ↓
Finalize
```

### BlankSheet Workflow

```text
Idea
  ↓
Describe It
  ↓
AI-Assisted Generation
  ↓
Interactive Diagram
  ↓
Edit & Refine
  ↓
Save
```

BlankSheet focuses on simplifying the transition from:

**Idea → Structured Diagram**

while still giving the user complete control over the final result.

---

# 🔧 Engineering Concepts Demonstrated

BlankSheet brings together practical software-engineering concepts across multiple layers:

### Frontend

* React component architecture
* Interactive UI development
* Canvas-based interaction
* Responsive workspace design
* Reusable components
* TypeScript

### Backend / Application

* Full-stack Next.js development
* AI-assisted workflows
* Application state management
* Shared application logic
* Modular route organization

### Database

* PostgreSQL integration
* Drizzle ORM
* Database schema management
* Persistent project storage

### Infrastructure

* Environment-based configuration
* Production builds
* Vercel deployment

---

# 📈 Engineering Scope

The project combines several distinct engineering concerns in one application:

```text
                 ┌─────────────────────┐
                 │   Natural Language  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    AI Processing    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Structured Diagram  │
                 └──────────┬──────────┘
                            │
                            ▼
        ┌──────────────────────────────────────┐
        │          Interactive React UI        │
        └──────────────────┬───────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
        ┌───────────────┐      ┌──────────────┐
        │ User Editing  │      │  Persistence  │
        └───────────────┘      └──────┬───────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │ PostgreSQL  │
                               └─────────────┘
```

---

# 🔮 Future Improvements

The architecture can be extended with:

* [ ] User authentication
* [ ] Real-time collaborative editing
* [ ] Multi-user workspaces
* [ ] Public diagram sharing
* [ ] PNG export
* [ ] SVG export
* [ ] PDF export
* [ ] Diagram templates
* [ ] Version history
* [ ] Improved undo / redo
* [ ] Advanced AI diagram refinement
* [ ] AI-powered diagram explanations
* [ ] Keyboard shortcuts
* [ ] Workspace customization
* [ ] Real-time cursor presence
* [ ] Team-based projects

---

# 🤝 Contributing

Contributions are welcome.

## 1. Fork the Repository

```text
https://github.com/ManashkVerma/blank-sheet
```

## 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/blank-sheet.git
cd blank-sheet
```

## 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature
```

## 4. Make Your Changes

Implement your feature, improvement, or bug fix.

## 5. Stage Changes

```bash
git add .
```

## 6. Commit Changes

```bash
git commit -m "feat: add your feature"
```

## 7. Push Your Branch

```bash
git push origin feature/your-feature
```

## 8. Open a Pull Request

Create a pull request describing the changes made.

---

# 📜 License

This project is distributed under the license specified in the repository.

Refer to the repository for the current license information.

---

# 👨‍💻 Author

## Manash Kumar Verma

<p align="center">
  <a href="https://github.com/ManashkVerma">
    GitHub
  </a>
</p>

---

# 🔗 Quick Links

| Resource     | Link                                                      |
| ------------ | --------------------------------------------------------- |
| 🚀 Live Demo | [BlankSheet](https://blank-sheet-brown.vercel.app/)       |
| 📂 GitHub    | [Repository](https://github.com/ManashkVerma/blank-sheet) |
| 👨‍💻 Author | [Manash Kumar Verma](https://github.com/ManashkVerma)     |

---

<p align="center">
  <strong>✦ BlankSheet</strong>
  <br/>
  From a blank canvas to a structured idea.
  <br/><br/>
  Built with <strong>Next.js · React · TypeScript · PostgreSQL · Drizzle ORM · AI</strong>
</p>
