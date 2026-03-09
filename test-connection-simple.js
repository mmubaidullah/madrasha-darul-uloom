// Simple test for connection API
async function testConnectionAPI() {
  try {
    console.log('🔍 Testing connection API...');
    
    const response = await fetch('http://localhost:3001/api/test-connection');
    const result = await response.json();
    
    console.log('📋 API Response:', result);
    
    if (result.success) {
      console.log('✅ Connection successful!');
      console.log('📊 Stats:', result.stats);
    } else {
      console.log('❌ Connection failed:', result.error);
      console.log('🔍 Details:', result.details);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testConnectionAPI();