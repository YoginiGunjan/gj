# API Contracts - Gunjan Jagtiani Wellness Portfolio

## Backend Implementation Plan

### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`
**Purpose:** Handle contact form submissions from potential clients

**Request Body:**
```json
{
  "name": "string",
  "email": "string", 
  "service": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "contact_id"
}
```

### 2. Get Portfolio Data
**Endpoint:** `GET /api/portfolio`
**Purpose:** Serve dynamic portfolio content instead of mock data

**Response:**
```json
{
  "hero": {...},
  "about": {...},
  "services": [...],
  "experience": [...],
  "certifications": [...],
  "testimonials": [...],
  "contact": {...}
}
```

### 3. Database Models

**ContactSubmission:**
- name: string
- email: string
- service: string
- message: string
- submitted_at: datetime
- status: string (new, contacted, resolved)

**PortfolioContent:**
- section: string
- content: object
- updated_at: datetime

### 4. Frontend Integration Changes

**Files to update:**
- `HomePage.js` - Replace mockData with API call
- `ContactSection.js` - Update form submission to use real API

**Mock data removal:**
- Remove `/frontend/src/data/mockData.js` after backend integration
- Replace mock API calls with real backend endpoints

### 5. Key Features
- Contact form submissions stored in MongoDB
- Admin can view contact submissions
- Portfolio content served dynamically
- Email notifications for new contacts (future enhancement)