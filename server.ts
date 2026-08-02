import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', store: 'ALMA STORE', timestamp: new Date().toISOString() });
  });

  // AI Assistant Route using Gemini API
  app.post('/api/ai/recommend', async (req, res) => {
    try {
      const { userQuery, contextProducts, language } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          reply: language === 'ar'
            ? 'مرحباً بك! أنا مساعد ألما الذكي. يبدو أن مفتاح API الخاص بـ Gemini لم يتم ضبطه في البيئة، ولكن يمكنك تصفح كافة منتجاتنا الفاخرة مباشرة من الكتالوج.'
            : 'Welcome! I am ALMA AI Assistant. Gemini API Key is not set, but you can explore all our luxury products directly in the catalog.',
          suggestedProductIds: []
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const catalogSummary = contextProducts && Array.isArray(contextProducts)
        ? contextProducts.map((p: any) => `- ID: ${p.id}, Title: ${p.titleEn} / ${p.titleAr}, Price: ${p.price} SAR, Category: ${p.categoryId}, Tags: ${p.tags.join(', ')}`).join('\n')
        : '';

      const systemInstruction = `
You are ALMA STORE AI Personal Shopping Advisor ("مساعد ألما الذكي").
ALMA STORE is an ultra-premium luxury e-commerce platform selling high-end watches, fashion, perfumes, audio gear, and home decor.
Language requested: ${language === 'ar' ? 'Arabic (العربية)' : 'English'}.

Available Products Catalog:
${catalogSummary}

Your goal:
1. Answer the customer's query in a warm, polite, luxury tone.
2. Recommend 1-3 specific products from the catalog above if applicable.
3. Keep response concise, helpful, and elegant.
4. Return response in valid JSON with format:
{
  "reply": "Your message here in requested language",
  "recommendedProductIds": ["prod-1", "prod-3"]
}
Only output pure JSON.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: systemInstruction + '\n\nUser Query: ' + userQuery }] }
        ]
      });

      const text = response.text || '';
      try {
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        return res.json(parsed);
      } catch {
        return res.json({
          reply: text || (language === 'ar' ? 'يسعدني مساعدتك في العثور على أفضل اختيار من مجموعة ألما الفاخرة.' : 'I am happy to assist you in selecting from ALMA luxury collection.'),
          recommendedProductIds: []
        });
      }
    } catch (err: any) {
      console.error('AI Error:', err);
      res.status(500).json({
        reply: req.body.language === 'ar'
          ? 'عذراً، حدث خطأ مؤقت في الاتصال بـ مساعد ألما الذكي. يرجى المحاولة مرة أخرى.'
          : 'Sorry, a temporary issue occurred connecting to ALMA AI Assistant.',
        recommendedProductIds: []
      });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ALMA STORE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
