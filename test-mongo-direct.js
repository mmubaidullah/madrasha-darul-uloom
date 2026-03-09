// Test direct mongo API
async function testMongoDirect() {
  try {
    console.log('🔍 Testing direct mongo API...');
    
    const response = await fetch('http://localhost:3001/api/test-mongo-direct');
    const result = await response.json();
    
    console.log('📋 Direct Mongo Test:', result);
    
    if (result.success) {
      console.log('✅ Direct connection successful!');
      console.log('📊 Student count:', result.studentCount);
    } else {
      console.log('❌ Direct connection failed:', result.error);
      console.log('🔍 Details:', result.details);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testMongoDirect();