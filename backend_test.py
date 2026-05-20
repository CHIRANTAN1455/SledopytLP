import requests
import sys
from datetime import datetime
import json

class SledopytAPITester:
    def __init__(self, base_url="https://sledopyt-preview.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                    print(f"   Response: {json.dumps(result['response_data'], indent=2)}")
                except:
                    result["response_data"] = response.text
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error"] = error_data
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    result["error"] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, result["response_data"] if success else result["error"]

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, str(e)

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "",
            200
        )
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message for Sledopyt AI contact form."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success and response:
            # Verify response structure
            required_fields = ["id", "name", "email", "message", "created_at", "status"]
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in response: {missing_fields}")
                return False
            
            # Verify data matches
            if (response["name"] == test_data["name"] and 
                response["email"] == test_data["email"] and 
                response["message"] == test_data["message"]):
                print("✅ Contact data matches submitted data")
                return True
            else:
                print("❌ Contact data doesn't match submitted data")
                return False
        
        return success

    def test_get_contacts(self):
        """Test getting all contacts (admin endpoint)"""
        success, response = self.run_test(
            "Get All Contacts",
            "GET",
            "contacts",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} contact(s)")
            return True
        
        return success

    def test_invalid_contact_submission(self):
        """Test contact form with invalid data"""
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "message": ""  # Empty message
        }
        
        success, response = self.run_test(
            "Invalid Contact Submission",
            "POST",
            "contact",
            422,  # Expecting validation error
            data=invalid_data
        )
        return success

def main():
    print("🚀 Starting Sledopyt AI Backend API Tests")
    print("=" * 50)
    
    # Setup
    tester = SledopytAPITester()
    
    # Run tests in order
    tests = [
        ("API Root Endpoint", tester.test_api_root),
        ("Contact Form Submission", tester.test_contact_submission),
        ("Get Contacts", tester.test_get_contacts),
        ("Invalid Contact Data", tester.test_invalid_contact_submission),
    ]
    
    for test_name, test_func in tests:
        print(f"\n📋 Running: {test_name}")
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        
        # Print failed tests summary
        failed_tests = [result for result in tester.test_results if not result["success"]]
        if failed_tests:
            print("\n❌ Failed Tests:")
            for test in failed_tests:
                print(f"   - {test['test_name']}: {test['actual_status']} (expected {test['expected_status']})")
        
        return 1

if __name__ == "__main__":
    sys.exit(main())