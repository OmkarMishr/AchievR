const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ===== AI FRAUD DETECTION =====
async function detectCertificateFraud(imageBuffer) {
  try {
    const base64Image = imageBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this certificate for authenticity. Rate from 0-100 (0=authentic, 100=forged):
              1. Logo quality and clarity
              2. Font consistency and professionalism
              3. Design elements and layout
              4. Signs of digital manipulation
              5. Watermark or security features
              
              Respond ONLY with JSON: {"fraudScore": number, "verdict": "authentic|suspicious|forged", "concerns": [], "confidence": number, "recommendation": "auto_approve|flag_for_review|auto_reject"}`
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Fraud Detection Error:', error);
    return {
      fraudScore: 50,
      verdict: "manual_review_required",
      recommendation: "flag_for_review",
      error: error.message
    };
  }
}

module.exports = { detectCertificateFraud };