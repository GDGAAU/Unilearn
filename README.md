# UniLearn

UniLearn is a student-driven academic platform designed to help university students learn from each other through shared course resources, real student projects, and structured course insights.

The platform focuses on collaboration, transparency, and safety, with built-in moderation and restrictions to prevent abuse or harmful content.

---

## What Problem UniLearn Solves

University students often struggle to:
- Find reliable course materials
- Understand what to expect from courses before taking them
- See real examples of student projects
- Learn from seniors in a structured and safe way

UniLearn addresses this by providing a single platform where students can share resources, showcase projects, and access moderated academic insights.

---

## Core Features

- Student authentication and profiles
- Course pages with shared academic resources
- Resource upload, download, rating, and comments
- Student project showcase with likes and feedback
- Structured, non-harmful course insights
- Content reporting and moderation system
- Role-based access (Student / Admin)

---

## System Architecture

UniLearn follows a **modular architecture** with a clear separation between backend and frontend.

```

UniLearn
├── backend/     # Django + REST API
└── frontend/    # React

## Backend Overview

The backend is built using **Django and Django REST Framework**

### Backend Responsibilities
- Authentication and authorization
- Business logic and data validation
- API endpoints for all platform features
- Content moderation and safety enforcement

### Backend Structure (Simplified)

```

backend/
├── root/        # Global Django configuration
├── accounts/      # Users and student profiles
├── courses/       # Course data and insights
├── generic/     # Academic resources (uploads, ratings, comments)
├── projects/      # Student project showcase
├── moderation/    # Reports, flags, admin moderation
└── manage.py

```

More details are available in the backend README.

---

## Frontend Overview

The frontend is responsible for:
- User interface and navigation
- Data visualization and interaction
- Communicating with the backend APIs

The frontend consumes the backend exclusively through REST APIs and does not contain business logic.

---

## Design Principles

- **Student-first:** Built around real student needs
- **Safety by design:** No personal instructor ratings or harassment
- **Transparency:** Clear course expectations and shared learning
---

## User Roles

### Student
- Register and manage profile
- Browse courses and resources
- Upload and download academic materials
- Submit and explore student projects
- Like projects and leave constructive comments
- Report inappropriate content

### Administrator
- Review reported or flagged content
- Approve, edit, or remove submissions
- Feature selected student projects
- Maintain platform safety and quality

---

## License

This project is intended for academic and educational use.
```

