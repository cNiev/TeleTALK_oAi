const { Configuration, OpenAIApi } = require("openai");

(async () => {
  try {
    // Verificación básica de la variable de entorno
    if (!process.env.OPENAI_PROJECT_KEY) {
      console.error("❌ ERROR: No se encontró la variable de entorno OPENAI_PROJECT_KEY.");
      process.exit(1);
    }

    // Configuración de OpenAI
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_PROJECT_KEY, // Cambia aquí el nombre de la variable si es necesario
    });
    const openai = new OpenAIApi(configuration);

    // Consulta al modelo GPT-4
    const response = await openai.createChatCompletion({
      model: "gpt-4", // Cambia "gpt-4" a "gpt-3.5-turbo" si no tienes acceso a GPT-4
      messages: [
        {
          role: "user",
          content: "Hello, OpenAI!",
        },
      ],
      max_tokens: 50, // Define un límite razonable de tokens
    });

    // Validación de respuesta
    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      console.error("❌ ERROR: Respuesta inesperada o vacía de la API de OpenAI.", response.data);
      process.exit(1);
    }

    // Mostrar la respuesta en consola
    console.log("✅ Respuesta de OpenAI:", response.data.choices[0].message.content.trim());
  } catch (error) {
    // Manejo de errores
    console.error("❌ ERROR: Ocurrió un problema al invocar la API de OpenAI.", error.message);

    // Mostrar detalles adicionales del error si están disponibles
    if (error.response) {
      console.error("Detalles del error:", error.response.status, error.response.data);
    }
    process.exit(1);
  }
})();
