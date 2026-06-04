# CampusLens

**Academic productivity platform built exclusively for IIT Roorkee students.**

CampusLens consolidates the day-to-day academic management needs of IITR students into a single, cohesive interface — attendance tracking, assignment management, CGPA calculation, focused study sessions, timetable management, and an AI-powered study assistant.

---

## Demo

Watch the full walkthrough on YouTube: Click the banner below

[![CampusLens Demo](https://img.youtube.com/vi/m2ppbu-TX8U/maxresdefault.jpg)](https://www.youtube.com/watch?v=m2ppbu-TX8U)

---

## Screenshots

### Landing Page
![Landing Page](./sample/landing.png)

### CGPA Calculator
![CGPA Calculator](./sample/cgpa.png)

### Assignment Manager
![Assignment Manager](./sample/assignment.png)

### Pomodoro Timer
![Pomodoro Timer](./sample/pomodoro.png)

---

## Features

| Module | Description |
|---|---|
| Attendance Tracker | Calculates bunkable classes and attendance deficit against the 75% threshold |
| Assignment Manager | Deadline-sorted task board with subject tagging and priority levels |
| CGPA Calculator | IIT Roorkee grade-point system with per-course breakdown and semester CGPA |
| Pomodoro Timer | 25/5 focus cycles with session history to build study consistency |
| Timetable Manager | Visual weekly schedule grid tailored to the IITR course structure |
| AI Study Assistant | Claude-powered conversational assistant for subject-specific academic queries |

---

## Architecture

### Application Structure

```mermaid
flowchart TB
    subgraph Browser["Student Browser"]
        Home["Landing Page\napp/page.tsx"]
        Attendance["Attendance Calculator\napp/attendance/page.tsx"]
        Assignments["Assignment Tracker\napp/assignments/page.tsx"]
        CGPA["CGPA Calculator\napp/cgpa/page.tsx"]
        Pomodoro["Pomodoro Timer\napp/pomodoro/page.tsx"]
        AI["AI Study Assistant\napp/ai/page.tsx"]
    end

    subgraph NextApp["Next.js 16 App Router"]
        Layout["Root Layout\napp/layout.tsx"]
        Styles["Global Styles\napp/globals.css"]
        ChatRoute["Chat API Route\napp/api/chat/route.ts"]
    end

    Home --> Attendance
    Home --> Assignments
    Home --> CGPA
    Home --> Pomodoro
    Home --> AI

    Layout --> Home
    Layout --> Attendance
    Layout --> Assignments
    Layout --> CGPA
    Layout --> Pomodoro
    Layout --> AI
    Styles --> Layout

    AI -->|"POST /api/chat"| ChatRoute
    ChatRoute -->|"JSON reply"| AI
```

### Request Flow — AI Study Assistant

```mermaid
sequenceDiagram
    participant U as User
    participant P as app/ai Page
    participant A as app/api/chat Route

    U->>P: Types a question
    P->>P: Adds user message to local state
    P->>A: POST /api/chat with message history
    A-->>P: Returns JSON reply
    P->>P: Appends assistant response
    P-->>U: Renders updated conversation
```

### Page Routing

```mermaid
flowchart LR
    Root["/"] --> AT["/attendance"]
    Root --> AS["/assignments"]
    Root --> CG["/cgpa"]
    Root --> PM["/pomodoro"]
    Root --> AI["/ai"]
    AI --> API["/api/chat"]
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| AI Integration | Anthropic Claude API |
| Runtime | Node.js |

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- An Anthropic API key (for the AI Study Assistant)

### Installation

```bash
git clone https://github.com/your-username/campuslens.git
cd campuslens
npm install
```

### Environment Configuration

Create a `.env.local` file in the project root:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
campuslens/
├── app/
│   ├── page.tsx              # Landing page with feature overview
│   ├── layout.tsx            # Root layout and global metadata
│   ├── globals.css           # Global styles
│   ├── attendance/           # Attendance tracker module
│   ├── assignments/          # Assignment manager module
│   ├── cgpa/                 # CGPA calculator module
│   ├── pomodoro/             # Pomodoro timer module
│   ├── timetable/            # Timetable manager module
│   ├── ai/                   # AI study assistant module
│   └── api/
│       └── chat/             # Claude API proxy route
├── public/                   # Static assets
├── sample/                   # Application screenshots
└── next.config.ts
```

---

## Contributing

Contributions are welcome from IITR students and alumni. Please open an issue to discuss proposed changes before submitting a pull request.

---

## License

MIT License. See [LICENSE](./LICENSE) for details.

---

Built for the IIT Roorkee community. CampusLens 2025.
