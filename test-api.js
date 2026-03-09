// Test API endpoint with MongoDB
const testData = {
  studentName: 'মোহাম্মদ আব্দুল্লাহ',
  nationality: 'বাংলাদেশী',
  dateOfBirth: '2010-01-15',
  ageYears: '14',
  ageMonths: '2',
  bloodGroup: 'B+',
  fatherName: 'মোহাম্মদ ইব্রাহিম',
  fatherProfession: 'ব্যবসা',
  fatherMobile: '01711111111',
  motherName: 'ফাতিমা খাতুন',
  motherProfession: 'গৃহিণী',
  motherMobile: '01722222222',
  presentAddress: {
    village: 'রামপুর',
    postOffice: 'রামপুর',
    upazila: 'সাভার',
    district: 'ঢাকা'
  },
  permanentAddress: {
    village: 'রামপুর',
    postOffice: 'রামপুর',
    upazila: 'সাভার',
    district: 'ঢাকা'
  },
  guardianName: 'মোহাম্মদ ইব্রাহিম',
  guardianRelation: 'পিতা',
  guardianMobile: '01711111111',
  guardianEmail: 'ibrahim@example.com',
  previousInstitution: 'স্থানীয় প্রাথমিক বিদ্যালয়',
  department: 'কিতাব বিভাগ',
  admissionClass: 'ইবতিদাইয়্যাহ-১ (উর্দূ)',
  academicYear: '২০২৬',
  hostelRequired: 'yes',
  specialComments: 'ভাল ছাত্র'
};

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoint...');
    
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ API test successful!');
      console.log('📝 Student created:', result.data.studentName);
      console.log('🆔 Student ID:', result.data.id);
    } else {
      console.log('❌ API test failed:', result.error);
    }
    
    // Test GET endpoint
    console.log('\n📋 Testing GET endpoint...');
    const getResponse = await fetch('http://localhost:3000/api/students');
    const getResult = await getResponse.json();
    
    if (getResult.success) {
      console.log('✅ GET test successful!');
      console.log('📊 Total students:', getResult.pagination.total);
    } else {
      console.log('❌ GET test failed:', getResult.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();