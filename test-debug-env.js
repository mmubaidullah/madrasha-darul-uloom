// Test debug env API
async function testDebugEnv() {
  try {
    console.log('🔍 Testing debug env API...');
    
    const response = await fetch('http://localhost:3001/api/debug-env');
    const result = await response.json();
    
    console.log('📋 Environment Debug:', result);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testDebugEnv();