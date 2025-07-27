#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Gunjan Jagtiani Wellness Portfolio
Tests all API endpoints with various scenarios including success and error cases.
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("❌ ERROR: REACT_APP_BACKEND_URL not found in environment")
    sys.exit(1)

print(f"🔗 Testing backend at: {BACKEND_URL}")

class WellnessAPITester:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
        self.test_results = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details
        })
        
    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Gunjan Jagtiani Wellness Portfolio API" in data["message"]:
                    self.log_test("Root endpoint returns welcome message", True)
                    return True
                else:
                    self.log_test("Root endpoint returns welcome message", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Root endpoint returns welcome message", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Root endpoint returns welcome message", False, f"Exception: {str(e)}")
            return False
    
    def test_portfolio_endpoint(self):
        """Test GET /api/portfolio endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/portfolio", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required sections
                required_sections = ['hero', 'about', 'services', 'experience', 'certifications', 'testimonials', 'contact']
                missing_sections = [section for section in required_sections if section not in data]
                
                if missing_sections:
                    self.log_test("Portfolio data structure", False, f"Missing sections: {missing_sections}")
                    return False
                
                # Validate hero section
                hero = data.get('hero', {})
                if not all(key in hero for key in ['name', 'tagline', 'description']):
                    self.log_test("Portfolio hero section", False, "Missing required hero fields")
                    return False
                
                if hero.get('name') != "Gunjan Jagtiani":
                    self.log_test("Portfolio hero section", False, f"Incorrect name: {hero.get('name')}")
                    return False
                
                # Validate services section
                services = data.get('services', [])
                if not isinstance(services, list) or len(services) == 0:
                    self.log_test("Portfolio services section", False, "Services should be a non-empty list")
                    return False
                
                # Check service structure
                for service in services:
                    required_service_fields = ['id', 'title', 'description', 'features', 'icon', 'color']
                    missing_fields = [field for field in required_service_fields if field not in service]
                    if missing_fields:
                        self.log_test("Portfolio services structure", False, f"Service missing fields: {missing_fields}")
                        return False
                
                # Validate specific services exist
                service_titles = [s.get('title', '') for s in services]
                expected_services = ['Yoga for Beginners', 'Prenatal & Postnatal Yoga', 'Sound Healing', 'Online Wellness Sessions']
                for expected in expected_services:
                    if expected not in service_titles:
                        self.log_test("Portfolio services content", False, f"Missing service: {expected}")
                        return False
                
                # Validate experience section
                experience = data.get('experience', [])
                if not isinstance(experience, list) or len(experience) == 0:
                    self.log_test("Portfolio experience section", False, "Experience should be a non-empty list")
                    return False
                
                # Validate certifications section
                certifications = data.get('certifications', [])
                if not isinstance(certifications, list) or len(certifications) == 0:
                    self.log_test("Portfolio certifications section", False, "Certifications should be a non-empty list")
                    return False
                
                # Validate testimonials section
                testimonials = data.get('testimonials', [])
                if not isinstance(testimonials, list) or len(testimonials) == 0:
                    self.log_test("Portfolio testimonials section", False, "Testimonials should be a non-empty list")
                    return False
                
                # Validate contact section
                contact = data.get('contact', {})
                if not all(key in contact for key in ['title', 'description', 'email', 'services']):
                    self.log_test("Portfolio contact section", False, "Missing required contact fields")
                    return False
                
                self.log_test("Portfolio endpoint comprehensive data", True, f"All sections validated successfully")
                return True
                
            else:
                self.log_test("Portfolio endpoint comprehensive data", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Portfolio endpoint comprehensive data", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_form_submission_success(self):
        """Test successful contact form submission"""
        test_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@email.com",
            "service": "yoga-beginners",
            "message": "Hi Gunjan, I'm interested in starting my yoga journey and would love to learn more about your beginner classes. I'm completely new to yoga but very excited to begin this wellness journey."
        }
        
        try:
            response = requests.post(f"{self.base_url}/api/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if not all(key in data for key in ['success', 'message', 'id']):
                    self.log_test("Contact form success response structure", False, f"Missing response fields: {data}")
                    return False
                
                if data.get('success') != True:
                    self.log_test("Contact form success response structure", False, f"Success should be True: {data}")
                    return False
                
                if not data.get('id'):
                    self.log_test("Contact form success response structure", False, "Missing submission ID")
                    return False
                
                if "Thank you for reaching out" not in data.get('message', ''):
                    self.log_test("Contact form success response structure", False, f"Unexpected message: {data.get('message')}")
                    return False
                
                self.log_test("Contact form successful submission", True, f"Submission ID: {data.get('id')}")
                return True
                
            else:
                self.log_test("Contact form successful submission", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact form successful submission", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_form_different_services(self):
        """Test contact form with different service options"""
        services_to_test = ["prenatal-yoga", "sound-healing", "studio-collaboration"]
        
        for service in services_to_test:
            test_data = {
                "name": f"Test User for {service}",
                "email": f"test.{service}@email.com",
                "service": service,
                "message": f"I'm interested in {service} services. Please provide more information."
            }
            
            try:
                response = requests.post(f"{self.base_url}/api/contact", json=test_data, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('success') == True and data.get('id'):
                        self.log_test(f"Contact form with service: {service}", True)
                    else:
                        self.log_test(f"Contact form with service: {service}", False, f"Invalid response: {data}")
                        return False
                else:
                    self.log_test(f"Contact form with service: {service}", False, f"Status: {response.status_code}")
                    return False
                    
            except Exception as e:
                self.log_test(f"Contact form with service: {service}", False, f"Exception: {str(e)}")
                return False
        
        return True
    
    def test_contact_form_validation_errors(self):
        """Test contact form validation with invalid data"""
        
        # Test invalid email
        invalid_email_data = {
            "name": "Test User",
            "email": "invalid-email",
            "service": "yoga-beginners",
            "message": "Test message"
        }
        
        try:
            response = requests.post(f"{self.base_url}/api/contact", json=invalid_email_data, timeout=10)
            
            if response.status_code == 422:  # Pydantic validation error
                self.log_test("Contact form invalid email validation", True, "Correctly rejected invalid email")
            else:
                self.log_test("Contact form invalid email validation", False, f"Expected 422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Contact form invalid email validation", False, f"Exception: {str(e)}")
        
        # Test missing required fields
        missing_fields_data = {
            "name": "Test User",
            "email": "test@email.com"
            # Missing service and message
        }
        
        try:
            response = requests.post(f"{self.base_url}/api/contact", json=missing_fields_data, timeout=10)
            
            if response.status_code == 422:  # Pydantic validation error
                self.log_test("Contact form missing fields validation", True, "Correctly rejected missing fields")
            else:
                self.log_test("Contact form missing fields validation", False, f"Expected 422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Contact form missing fields validation", False, f"Exception: {str(e)}")
    
    def test_contact_submissions_retrieval(self):
        """Test GET /api/contact-submissions endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/contact-submissions", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if not isinstance(data, list):
                    self.log_test("Contact submissions retrieval", False, "Response should be a list")
                    return False
                
                # If there are submissions, validate structure
                if len(data) > 0:
                    submission = data[0]
                    required_fields = ['id', 'name', 'email', 'service', 'message', 'submitted_at', 'status']
                    missing_fields = [field for field in required_fields if field not in submission]
                    
                    if missing_fields:
                        self.log_test("Contact submissions structure", False, f"Missing fields: {missing_fields}")
                        return False
                    
                    # Check if submissions are sorted by date (newest first)
                    if len(data) > 1:
                        first_date = datetime.fromisoformat(data[0]['submitted_at'].replace('Z', '+00:00'))
                        second_date = datetime.fromisoformat(data[1]['submitted_at'].replace('Z', '+00:00'))
                        
                        if first_date < second_date:
                            self.log_test("Contact submissions date sorting", False, "Submissions not sorted by newest first")
                            return False
                        else:
                            self.log_test("Contact submissions date sorting", True)
                
                self.log_test("Contact submissions retrieval", True, f"Retrieved {len(data)} submissions")
                return True
                
            else:
                self.log_test("Contact submissions retrieval", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact submissions retrieval", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests and return summary"""
        print("🧪 Starting Gunjan Jagtiani Wellness Portfolio Backend API Tests")
        print("=" * 70)
        
        # Test all endpoints
        tests = [
            self.test_root_endpoint,
            self.test_portfolio_endpoint,
            self.test_contact_form_submission_success,
            self.test_contact_form_different_services,
            self.test_contact_form_validation_errors,
            self.test_contact_submissions_retrieval
        ]
        
        for test in tests:
            print(f"\n🔍 Running: {test.__name__}")
            test()
        
        # Summary
        print("\n" + "=" * 70)
        print("📊 TEST SUMMARY")
        print("=" * 70)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['details']}")
        
        return passed == total

if __name__ == "__main__":
    tester = WellnessAPITester(BACKEND_URL)
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend API is working correctly.")
        sys.exit(0)
    else:
        print("\n💥 Some tests failed. Please check the issues above.")
        sys.exit(1)