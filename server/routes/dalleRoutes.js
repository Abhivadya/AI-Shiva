import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

/* async function main() {
  const image = await openai.images.generate({ prompt: "A cute baby sea otter" });

  console.log(image.data);
}
main(); */

router.route('/').get((req, res) => {
    res.send('Hello from Dall-E')
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '256x256',
      response_format: 'b64_json',
    });

    const image = aiResponse.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;
