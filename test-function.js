// Test script para la función de Netlify
// Ejecutar con: node test-function.js

const testFunction = async () => {
  console.log('🧪 Iniciando prueba de función...');
  
  try {
    const testData = {
      sender: 'Test User',
      message: 'Mensaje de prueba desde Node.js',
      clientId: 'test-' + Date.now()
    };

    console.log('📤 Enviando datos:', testData);
    
    // Simular el evento que recibiría la función
    const mockEvent = {
      body: JSON.stringify(testData),
      headers: {
        'content-type': 'application/json'
      }
    };

    // Importar y ejecutar la función
    const { handler } = require('./.netlify/functions/enviar.js');
    const result = await handler(mockEvent);
    
    console.log('📥 Resultado:', result);
    console.log('✅ Prueba completada exitosamente');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
    process.exit(1);
  }
};

// Ejecutar la prueba solo si este archivo se ejecuta directamente
if (require.main === module) {
  testFunction();
}

module.exports = { testFunction };
