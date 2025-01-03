const { Configuration, OpenAIApi } = require("openai");

(async () => {
  try {
    // Verificación básica de la variable de entorno
    if (!process.env.OPENAI_PROJECT_KEY) {
      console.error("ERROR: No se encontró la variable de entorno OPENAI_PROJECT_KEY");
      process.exit(1);
    }

    // Configuración de OpenAI
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_PROJECT_KEY
    });
    const openai = new OpenAIApi(configuration);

    // Consulta a GPT-4
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: "Hello, OpenAI!"
        }
      ]
    });

    // Validación de respuesta
    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      console.error("ERROR: Respuesta inesperada o vacía de la API de OpenAI:", response.data);
      process.exit(1);
    }

    console.log("Respuesta de OpenAI:", response.data.choices[0].message.content.trim());

  } catch (error) {
    // Manejo de errores
    console.error("ERROR: Ocurrió un problema al invocar la API de OpenAI.", error);
    process.exit(1);
  }
})();
