UniLearn API Documentation
Core Domain Rules (locked)
Instructors are not users
Many people can write insights on instructors
Instructor insights are moderated with admin later with ml feature
Courses:
can be rated
cannot be commented on
Projects:
have is_featured
are NOT linked to courses
Moderation:
admin-only
approves/rejects written content
Auth will be added later
Base URL
/api/
All endpoints are currently public.
 Authentication and permissions will be added later.

1. Accounts Module (Basic Profile Only)
Data Model (Simplified)
StudentProfile
- id
- full_name
- department
- year
- bio
- external_links
Endpoints
Create profile
POST /api/accounts/profiles/
Body
{
  "full_name": "John Doe",
  "department": "Computer Science",
  "year": 3,
  "bio": "Interested in backend development",
  "external_links": {
    "github": "https://github.com/johndoe"
  }
}


Get all profiles
GET /api/accounts/profiles/


Get single profile
GET /api/accounts/profiles/{id}/


Update profile
PUT /api/accounts/profiles/{id}/


Delete profile
DELETE /api/accounts/profiles/{id}/


2. Courses Module
Data Model
Course
- id
- course_code
- course_name
- department
- year
- description
Endpoints
Create course
POST /api/courses/

{
  "course_code": "CS301",
  "course_name": "Database Systems",
  "department": "Computer Science",
  "year": 3,
  "description": "Introduction to databases"
}


List courses
GET /api/courses/
Supports filtering later (department, year).

Get course detail
GET /api/courses/{id}/


Update course
PUT /api/courses/{id}/


Delete course
DELETE /api/courses/{id}/


3. Resources Module (Core Feature)
Data Model
Resource
- id
- course (FK)
- title
- resource_type (notes | slides | exam)
- academic_year
- file_url
- tags
- created_at


Endpoints
Upload resource
POST /api/resources/

{
  "course": 1,
  "title": "Midterm Revision Notes",
  "resource_type": "notes",
  "academic_year": "2024",
  "file_url": "https://example.com/file.pdf",
  "tags": ["midterm", "sql"]
}


List resources
GET /api/resources/


Get resource detail
GET /api/resources/{id}/


Update resource
PUT /api/resources/{id}/


Delete resource
DELETE /api/resources/{id}/


4. Resource Ratings
Rating Model
ResourceRating
- id
- resource (FK)
- value (1–5)
Rate resource
POST /api/resources/{id}/rate/

{
  "value": 4
}
5. Projects Module
Data Model
Project
- id
- title
- description
- course
- screenshots
- tech_stack
- likes_count


Endpoints
Create project
POST /api/projects/

{
  "title": "Student Management System",
  "description": "A CRUD app built with Django",
  "course": 1,
  "tech_stack": ["Django", "MySQL"]
}


List projects
GET /api/projects/


Get project detail
GET /api/projects/{id}/


Like project
POST /api/projects/{id}/like/


6. Instructor and Insights (Safe Design)
1. Data Models
Instructor
id
name
bio
courses (ManyToMany to Course)
InstructorInsight
id
instructor (FK)
teaching_style
assessment_type
workload_level
status (choices: "pending", "approved", "rejected")

2. Endpoints
A. Admin Endpoints (CRUD + Approve Insights)
Create Instructor
POST /api/admin/instructors/
{
  "name": "Dr. John Doe",
  "courses": [1, 3]
}
Update Instructor
PUT /api/admin/instructors/{id}/
{
  "name": "Dr. John Doe",
  "courses": [1, 3, 5]
}
Delete Instructor
DELETE /api/admin/instructors/{id}/
List/Search Instructors
GET /api/admin/instructors/?name=John&course=AI101
Approve / Reject Insight
PATCH /api/admin/insights/{id}/
{
  "status": "approved"   # or "rejected"
}

B. User Endpoints (Insights Submission / View)
Submit Insight
POST /api/instructors/{id}/insights/
{
  "teaching_style": "Concept-focused",
  "assessment_type": "Projects and exams",
  "workload_level": "Medium"
}
View Approved Insights
GET /api/instructors/{id}/insights/
# Only returns insights where status = "approved"

