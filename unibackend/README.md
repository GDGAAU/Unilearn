# UniLearn Backend

This repository contains the backend for **UniLearn**, a student-driven academic platform built with Django and Django REST Framework.

---

## Core Backend Responsibilities

The backend handles:
- User authentication and student profiles
- Course pages and academic resource sharing
- Student project showcasing
- Structured course insights (safe by design)
- Content moderation and reporting ( to be added after basic apis are done)
- Role-based access control (Student / Admin)

---

## Tech Stack

- Python
- Django
- Django REST Framework
- SQLite (development)
- Environment variables via `python-dotenv`

---

## Project Structure Overview

```

unilearn-backend/
│
├── root/
│   ├── settings.py      # Global settings and installed apps
│   ├── urls.py          # Root API routing
│   └── wsgi.py / asgi.py
│
├── accounts/            # User accounts & student profiles
│   ├── models.py        # Custom user / profile models
│   ├── serializers.py  # API serializers for user data
│   ├── views.py         # Auth & profile endpoints
│   └── urls.py
│
├── courses/             # Course information & insights
│   ├── models.py        # Course metadata and structure
│   ├── views.py         # Course listing and detail APIs
│   └── urls.py
│
├── generic/           # Academic resource management
│   ├── models.py        # Files, tags, ratings, comments
│   ├── views.py         # Upload, download, rating APIs
│   └── serializers.py
│
├── projects/            # Student project showcase
│   ├── models.py        # Project entries and media
│   ├── views.py         # Project browse & submission APIs
│   └── serializers.py
│
├── moderation/          # Safety, reports, and admin review # not available at the moment
│   ├── models.py        # Reports, flags, moderation logs
│   ├── views.py         # Admin-only moderation actions
│   └── urls.py
│
├── manage.py
├── requirements.txt
├── .env
└── .gitignore

```

---

## Design Principles


### 1. Clear App Boundaries

| App        | Responsibility |
|------------|---------------|
| accounts   | Authentication, users, student profiles |
| courses    | Course metadata and structured insights |
| generic  | File uploads, tagging, ratings, comments |
| projects   | Student projects and engagement |
| moderation | Reporting, flags, admin review actions |


### 3. API-First Structure

- All backend features are exposed through REST APIs

```

/api/accounts/
/api/courses/
/api/generic/
/api/projects/
/api/moderation/


## Setup Instructions (Quick Start)

```bash
git clone <repo-url>
cd unilearn-backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
````

Create `.env`:

```
DEBUG=True
SECRET_KEY=your-secret-key

generate your own secret key
```

Run:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

## Development Notes for Backend Contributors

* Follow existing app boundaries when adding features
* Do not introduce instructor rating or personal feedback logic
* All user-generated content must support moderation
* Admin-only actions should be protected by permissions
* Keep endpoints predictable and RESTful

---

## Status

This backend is under active development.

---