import MistralClient from "@mistralai/mistralai";
import { createClient } from "@supabase/supabase-js";

const mistralClient = new MistralClient(process.env.MISTRAL_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

const input = "Plan a 7 day trip to Patagonia for me";
const embedding = await createEmbedding(input);
const context = await retrieveMatches(embedding);

const response = await generateChatResponse(context, input);
console.log(response);

async function createEmbedding(input) {
  const embeddingResponse = await mistralClient.embeddings({
      model: 'mistral-embed',
      input: [input]
  });
  return embeddingResponse.data[0].embedding;
}

async function retrieveMatches(embedding) {
    const { data } = await supabase.rpc('match_trip_docs', {
        query_embedding: embedding,
        match_threshold: 0.78,
        match_count: 5
    });
    return data.map(chunk => chunk.content).join(" ");
}


async function generateChatResponse(context, query) {
    const response = await mistralClient.chat({
        model: 'mistral-large-latest',
        messages: [{
            role: 'user',
            content: `Sample trip context: ${context} - Question: ${query}`
        }]
    });
    return response.choices[0].message.content;
}
