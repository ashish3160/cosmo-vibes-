
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { zodiac } = req.body;

    const prompt = `You are a fun and lighthearted astrologer. Give a cheerful, mystical, and motivating prediction for today for a person with Zodiac sign: ${zodiac}. Include today's vibe, what to focus on, what to avoid, and a lucky mantra.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } else {
    res.status(405).end();
  }
}
