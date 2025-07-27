from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    service: str
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    service: str
    message: str

class PortfolioData(BaseModel):
    hero: Dict[str, Any]
    about: Dict[str, Any]
    services: List[Dict[str, Any]]
    experience: List[Dict[str, Any]]
    certifications: List[Dict[str, Any]]
    testimonials: List[Dict[str, Any]]
    contact: Dict[str, Any]

# Portfolio Data
portfolio_data = {
    "hero": {
        "name": "Gunjan Jagtiani",
        "tagline": "Yoga Instructor • Sound Healer • Wellness Guide",
        "description": "Empowering minds and bodies through ancient wisdom and modern wellness practices. From teaching young minds to guiding adults in their healing journey, I bring holistic wellness to every life I touch."
    },
    "about": {
        "title": "My Journey to Wellness",
        "description": "My path has been beautifully diverse - from nurturing young minds as an elementary teacher, to building my own flavored dry fruit business, to discovering my true calling in yoga and sound healing. Each step has shaped my understanding of holistic wellness.",
        "highlights": [
            "Elementary Teacher at Euro School Ahmedabad",
            "Entrepreneur - Flavored Dry Fruit Business",
            "Certified Yoga Instructor",
            "Prenatal & Postnatal Yoga Specialist",
            "Certified Sound Healer",
            "Freelance Wellness Practitioner"
        ],
        "currentFocus": "Currently based in the USA, I continue to offer online wellness sessions while expanding my knowledge in AI tools to better serve my community. My goal is to collaborate with gyms, yoga studios, and wellness centers to make healing accessible to everyone."
    },
    "services": [
        {
            "id": 1,
            "title": "Yoga for Beginners",
            "description": "Gentle introduction to yoga practice, focusing on basic poses, breathing techniques, and mindfulness for complete beginners.",
            "features": ["Basic Asana Practice", "Breathing Techniques", "Meditation Guidance", "Flexibility Building"],
            "icon": "🧘‍♀️",
            "color": "emerald"
        },
        {
            "id": 2,
            "title": "Prenatal & Postnatal Yoga",
            "description": "Specialized yoga sessions designed for mothers-to-be and new mothers, supporting healthy pregnancy and recovery.",
            "features": ["Safe Pregnancy Poses", "Labor Preparation", "Postpartum Recovery", "Breathing for Birth"],
            "icon": "🤱",
            "color": "rose"
        },
        {
            "id": 3,
            "title": "Sound Healing",
            "description": "Therapeutic sound sessions using various instruments to promote deep relaxation, stress relief, and energetic balance.",
            "features": ["Singing Bowl Therapy", "Chakra Balancing", "Stress Release", "Deep Meditation"],
            "icon": "🎵",
            "color": "violet"
        },
        {
            "id": 4,
            "title": "Online Wellness Sessions",
            "description": "Convenient virtual sessions bringing personalized yoga and sound healing directly to your space.",
            "features": ["1-on-1 Sessions", "Group Classes", "Flexible Scheduling", "Global Accessibility"],
            "icon": "💻",
            "color": "blue"
        }
    ],
    "experience": [
        {
            "id": 1,
            "role": "Elementary Teacher",
            "organization": "Euro School Ahmedabad",
            "duration": "1 Year",
            "description": "Taught and nurtured young minds, developing patience, communication skills, and understanding of individual learning needs."
        },
        {
            "id": 2,
            "role": "Entrepreneur",
            "organization": "Flavored Dry Fruit Business",
            "duration": "2 Years",
            "description": "Built and managed my own business, gaining valuable experience in operations, customer service, and business development."
        },
        {
            "id": 3,
            "role": "Yoga Instructor & Sound Healer",
            "organization": "Freelance & Studio Collaborations",
            "duration": "Current",
            "description": "Providing yoga and sound healing sessions to diverse clients, collaborating with yoga studios and gyms."
        },
        {
            "id": 4,
            "role": "Overnight Stocker",
            "organization": "Walmart (USA)",
            "duration": "Nov 2024 - Current",
            "description": "Demonstrating adaptability and work ethic while transitioning to life in the USA and building wellness practice."
        }
    ],
    "certifications": [
        {
            "id": 1,
            "title": "Yoga Instructor Diploma",
            "issuer": "Certified Yoga Institute",
            "year": "2022",
            "description": "Comprehensive training in yoga philosophy, anatomy, and teaching methodology."
        },
        {
            "id": 2,
            "title": "Prenatal Yoga Instructor",
            "issuer": "Prenatal Yoga Center",
            "year": "2023",
            "description": "Specialized training in safe yoga practices for pregnant women and expectant mothers."
        },
        {
            "id": 3,
            "title": "Postnatal Yoga Instructor",
            "issuer": "Postnatal Wellness Institute",
            "year": "2023",
            "description": "Expert training in yoga for postpartum recovery and new mother wellness."
        },
        {
            "id": 4,
            "title": "Sound Healer Certification",
            "issuer": "Sound Healing Academy",
            "year": "2023",
            "description": "Professional training in sound therapy, chakra healing, and vibrational medicine."
        },
        {
            "id": 5,
            "title": "BBA (Bachelor of Business Administration)",
            "issuer": "University",
            "year": "2020",
            "description": "Strong foundation in business principles, management, and organizational behavior."
        }
    ],
    "testimonials": [
        {
            "id": 1,
            "name": "Sarah Martinez",
            "role": "New Mother",
            "content": "Gunjan's prenatal yoga classes were a blessing during my pregnancy. Her gentle approach and deep knowledge made me feel safe and supported throughout my journey.",
            "rating": 5
        },
        {
            "id": 2,
            "name": "Michael Chen",
            "role": "Yoga Beginner",
            "content": "As someone who was intimidated by yoga, Gunjan made me feel welcome and comfortable from day one. Her teaching style is patient and encouraging.",
            "rating": 5
        },
        {
            "id": 3,
            "name": "Lisa Thompson",
            "role": "Wellness Enthusiast",
            "content": "The sound healing sessions with Gunjan are transformative. I leave feeling completely renewed and balanced. Her energy is truly healing.",
            "rating": 5
        },
        {
            "id": 4,
            "name": "David Rodriguez",
            "role": "Gym Member",
            "content": "Gunjan's online sessions fit perfectly into my busy schedule. Her expertise and warmth come through even in virtual classes.",
            "rating": 5
        }
    ],
    "contact": {
        "title": "Ready to Begin Your Wellness Journey?",
        "description": "Whether you're a complete beginner or looking to deepen your practice, I'm here to guide you with compassion and expertise.",
        "email": "gunjan.wellness@gmail.com",
        "phone": "+1 (555) 123-4567",
        "services": [
            "Individual Yoga Sessions",
            "Group Classes",
            "Sound Healing Therapy",
            "Prenatal/Postnatal Support",
            "Studio Collaborations",
            "Wellness Workshops"
        ]
    }
}

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Gunjan Jagtiani Wellness Portfolio API"}

@api_router.get("/portfolio", response_model=PortfolioData)
async def get_portfolio():
    """Get all portfolio data"""
    return portfolio_data

@api_router.post("/contact")
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """Submit contact form"""
    try:
        # Create contact submission object
        contact_submission = ContactSubmission(**contact_data.dict())
        
        # Save to database
        result = await db.contact_submissions.insert_one(contact_submission.dict())
        
        if result.inserted_id:
            return {
                "success": True,
                "message": "Thank you for reaching out! I'll get back to you within 24 hours.",
                "id": contact_submission.id
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact submission")
            
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact-submissions")
async def get_contact_submissions():
    """Get all contact submissions (for admin use)"""
    try:
        submissions = await db.contact_submissions.find().sort("submitted_at", -1).to_list(100)
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
