import { Handler } from '@netlify/functions';
import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'production' ? 
    Environment.Production : 
    Environment.Sandbox
});

export const handler: Handler = async () => {
  try {
    const { result } = await squareClient.catalogApi.listCatalog(undefined, 'ITEM');
    
    return {
      statusCode: 200,
      body: JSON.stringify({ items: result.objects || [] }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Failed to fetch catalog:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch catalog' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
}