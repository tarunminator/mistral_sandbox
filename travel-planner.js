import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import MistralClient from "@mistralai/mistralai";
import { createClient } from "@supabase/supabase-js";

const client = new MistralClient(process.env.MISTRAL_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function splitDocument(path) {
    const response = await fetch(path);
    const text = await response.text();
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 250,
        chunkOverlap: 40
    });
    const output = await splitter.createDocuments([text]);
    const textArr = output.map(chunk => chunk.pageContent);
    return textArr;
}

const sampleTripChunks = await splitDocument('sample-trip.txt');

async function createEmbeddings(chunks) {
    const embeddings = await client.embeddings({
        model: 'mistral-embed',
        input: chunks
    });
    const data = chunks.map((chunk, i) => {
        return {
            content: chunk,
            embedding: embeddings.data[i].embedding
        }
    });
    return data;
}

const data = await createEmbeddings(sampleTripChunks);
