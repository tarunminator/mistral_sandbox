import MistralClient from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new MistralClient(apiKey);

const chatResponse = await client.chat({
  model: 'mistral-tiny',
  messages: [
    {role: 'system', content: 'You are a friendly travel planning expert. When asked about planning a trip, ask me 5 questions regarding the trip before you answer.'},
    {role: 'user', content: 'Help me plan a 12 day trip to Patagonia?'}
  ],
  temperature: 0.5
});

console.log(chatResponse.choices[0].message.content);
