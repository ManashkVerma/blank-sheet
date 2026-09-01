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

## 📖 About

**BlankSheet** is a full-stack AI-powered diagramming workspace designed to help users transform natural-language ideas into structured and interactive visual diagrams.

Instead of manually creating every shape, connection, and component from scratch, users can describe what they want using natural language and use AI-assisted generation to create an initial diagram that can then be edited and refined inside the workspace.

### What BlankSheet provides

- AI-assisted diagram generation
- Interactive diagram editing
- Project management
- Persistent project data
- Modern responsive workspace
- Reusable React components
- Type-safe development with TypeScript
- PostgreSQL-backed data storage
- Production deployment with Vercel

# ✨ Features

## 🤖 AI-Powered Diagram Generation

Describe the diagram you want using natural language.

### Example Prompt

```text
Create a system architecture diagram for an
e-commerce application with a frontend,
backend API, authentication service,
PostgreSQL database and payment gateway.
```

The AI-assisted workflow processes the prompt and generates a structured diagram that can be further edited and refined inside the workspace.

---

## 🎨 Interactive Diagram Workspace

BlankSheet provides a dedicated visual workspace for creating, viewing, editing, and refining diagrams.

### The workspace supports

- Interactive diagram editing
- Visual organization
- Diagram refinement
- Workspace controls
- AI-assisted actions
- Canvas-based interaction
- Editing of generated diagrams

---

## 📁 Project Management

Projects provide a structured way to organize diagram-related work.

The application allows project data to be persisted using a PostgreSQL-backed database layer, making it possible to maintain diagram-related information between sessions.

---

## ⚡ Modern Workspace

BlankSheet is designed around a modern workspace experience focused on diagram creation.

The interface includes:

- Responsive layouts
- Interactive controls
- Dedicated workspace tools
- AI-assisted actions
- Reusable UI components
- Clean and minimal design

---

## 🧩 Modular Architecture

The application is organized into separate functional layers to make the codebase easier to maintain and extend.

```text
Application
│
├── Routes / Pages
│
├── UI Components
│
├── Hooks
│
├── Database
│
├── Utilities
│
└── Shared Logic
```

---

# 🛠️ Tech Stack

| Technology       | Purpose                               |
| ---------------- | ------------------------------------- |
| **Next.js**      | Full-stack React framework            |
| **React**        | Interactive user interface            |
| **TypeScript**   | Type-safe application development     |
| **Tailwind CSS** | Styling and responsive design         |
| **PostgreSQL**   | Persistent data storage               |
| **Drizzle ORM**  | Database access and schema management |
| **Vercel**       | Production deployment                 |

---

# 🏗️ High-Level Architecture

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
                  │      Canvas + Editor           │
                  └───────────────┬────────────────┘
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                     ▼                         ▼
              ┌──────────────┐         ┌──────────────┐
              │ Edit / Refine│         │ Project Data │
              └──────────────┘         └───────┬──────┘
                                               │
                                               ▼
                                      ┌────────────────┐
                                      │   PostgreSQL   │
                                      └────────────────┘
```

---

# 💡 How It Works

The core workflow of BlankSheet is:

```text
User Idea
    │
    ▼
Natural-Language Prompt
    │
    ▼
AI Processing
    │
    ▼
Diagram Generation
    │
    ▼
Interactive Workspace
    │
    ├── Edit
    ├── Refine
    └── Organize
    │
    ▼
Project Storage
    │
    ▼
PostgreSQL
```

This workflow helps reduce the manual effort needed to create the initial version of a diagram.

---

# 🎯 Use Cases

## 💻 Software Architecture

Create diagrams for:

- Frontend applications
- Backend services
- REST APIs
- Databases
- Authentication systems
- External integrations
- Application infrastructure

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

BlankSheet can be used to visualize:

- Distributed systems
- Backend architecture
- APIs
- Microservices
- Databases
- Authentication
- Third-party services
- Data flow

---

## 🗄️ Database Design

Useful for representing:

- Entities
- Attributes
- Relationships
- Database structures
- Data relationships

---

## 🔄 Flowcharts

Create diagrams for:

- Algorithms
- Application workflows
- Business processes
- Decision trees
- User flows
- Process documentation

---

## 📚 Technical Documentation

Use diagrams to explain complex systems and make technical documentation easier to understand.

---

## 🧠 Learning & Brainstorming

Transform abstract concepts and ideas into structured visual representations.

---

# 📊 Project Highlights

| Category      | Details                          |
| ------------- | -------------------------------- |
| Project Type  | AI-Powered Diagramming Workspace |
| Architecture  | Full-Stack Web Application       |
| Frontend      | Next.js + React                  |
| Language      | TypeScript                       |
| Styling       | Tailwind CSS                     |
| Database      | PostgreSQL                       |
| ORM           | Drizzle ORM                      |
| AI            | AI-Assisted Diagram Generation   |
| Deployment    | Vercel                           |
| UI Components | 10+ Reusable Components          |

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

# 🚀 Getting Started

Follow the steps below to run BlankSheet locally.

## ✅ Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm
- PostgreSQL
- Git

Verify your installations:

```bash
node --version
npm --version
git --version
```

---

# 1. Clone the Repository

```bash
git clone https://github.com/ManashkVerma/blank-sheet.git
```

Navigate into the project:

```bash
cd blank-sheet
```

---

# 2. Install Dependencies

```bash
npm install
```

---

# 3. Configure Environment Variables

Create a `.env.local` file in the root of the project.

```env
DATABASE_URL="your_postgresql_connection_string"
```

### Example

```env
DATABASE_URL="postgresql://username:password@localhost:5432/blank_sheet"
```

If your AI integration requires additional API keys, add them to the same file.

For example:

```env
AI_API_KEY="your_api_key"
```

> **Important:** Never commit `.env.local` or private API keys to GitHub.

---

# 4. Setup the Database

Push the database schema using Drizzle ORM:

```bash
npx drizzle-kit push
```

Make sure your PostgreSQL database is running before executing the command.

---

# 5. Run the Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

Open the URL in your browser.

---

# 🧪 Development Commands

## Start Development Server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

## Run Linter

```bash
npm run lint
```

> The available commands depend on the scripts configured in `package.json`.

---

# 🔐 Environment Variables

Sensitive configuration should be stored in environment variables rather than source code.

Example:

```env
DATABASE_URL="your_database_url"
AI_API_KEY="your_ai_api_key"
```

Make sure your `.gitignore` contains:

```gitignore
.env
.env.local
.env.*.local
```

Never expose private credentials in client-side code or commit them to GitHub.

---

# ☁️ Deployment

BlankSheet is deployed using **Vercel**.

## Production Application

### 🚀 [https://blank-sheet-brown.vercel.app/](https://blank-sheet-brown.vercel.app/)

---

## Deploy Your Own Instance

### 1. Fork the Repository

Fork the project:

https://github.com/ManashkVerma/blank-sheet

### 2. Import Into Vercel

Connect the GitHub repository to Vercel.

### 3. Configure Environment Variables

Add all required environment variables to your Vercel project.

Example:

```text
DATABASE_URL
AI_API_KEY
```

### 4. Configure PostgreSQL

Connect your deployment to a PostgreSQL database.

### 5. Deploy

Deploy the application through Vercel.

---

# 🧭 Product Workflow

```text
                         BLANKSHEET WORKFLOW

                              ┌─────────┐
                              │  IDEA   │
                              └────┬────┘
                                   │
                                   ▼
                         ┌─────────────────┐
                         │ Natural Language│
                         │     Prompt      │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  AI Generation  │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     Diagram     │
                         └────────┬────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │ Interactive Editor  │
                       └──────────┬──────────┘
                                  │
                        ┌─────────┴─────────┐
                        │                   │
                        ▼                   ▼
                   ┌─────────┐        ┌─────────┐
                   │ Refine  │        │  Save   │
                   └─────────┘        └────┬────┘
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │ PostgreSQL  │
                                    └─────────────┘
```

---

# 🧠 Why BlankSheet?

Traditional diagramming tools generally require users to manually create and arrange every element.

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

**Idea → Diagram**

---

# 📌 Key Engineering Concepts

BlankSheet demonstrates practical implementation of:

- Full-stack Next.js development
- React component architecture
- TypeScript
- Interactive UI development
- AI-assisted application workflows
- PostgreSQL integration
- Drizzle ORM
- Database-backed persistence
- Responsive web design
- Modular application architecture
- Production deployment
- Modern frontend development

---

# 🔮 Future Improvements

Potential future improvements include:

- [ ] User authentication
- [ ] Real-time collaborative editing
- [ ] Multi-user workspaces
- [ ] Public diagram sharing
- [ ] PNG export
- [ ] SVG export
- [ ] PDF export
- [ ] Diagram templates
- [ ] Version history
- [ ] Improved undo / redo
- [ ] Advanced AI diagram refinement
- [ ] AI-powered diagram explanations
- [ ] Keyboard shortcuts
- [ ] Workspace customization
- [ ] Real-time cursor presence
- [ ] Team-based projects

---

# 🤝 Contributing

Contributions are welcome.

## 1. Fork the Repository

Fork the repository:

https://github.com/ManashkVerma/blank-sheet

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

Create a pull request describing the changes you made.

---

# 📜 License

This project is distributed under the license specified in the repository.

Refer to the repository for the current license information.

---

# 👨‍💻 Author

## Manash Kumar Verma

### GitHub

https://github.com/ManashkVerma

### Repository

https://github.com/ManashkVerma/blank-sheet

### Live Application

https://blank-sheet-brown.vercel.app/

---

# ⭐ Support

If you find **BlankSheet** useful or interesting, consider giving the repository a ⭐ on GitHub.

---

# 🔗 Quick Links

| Resource     | Link                                                      |
| ------------ | --------------------------------------------------------- |
| 🚀 Live Demo | [BlankSheet](https://blank-sheet-brown.vercel.app/)       |
| 📂 GitHub    | [Repository](https://github.com/ManashkVerma/blank-sheet) |
| 👨‍💻 Author    | [Manash Kumar Verma](https://github.com/ManashkVerma)     |

---

<p align="center">

# ✦ BlankSheet

### From a blank canvas to a structured idea.

Built with **Next.js · React · TypeScript · PostgreSQL · Drizzle ORM · AI**

</p>
