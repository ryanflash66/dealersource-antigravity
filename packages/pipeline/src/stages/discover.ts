import { Anthropic } from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || 'mock',
});

export async function extractListingData(htmlContent: string) {
  if (process.argv.includes('--offline') || process.env.CLAUDE_API_KEY === 'placeholder') {
    return {
      title: 'Mock Listing extracted',
      address: '123 Mock St, Greenville, NC',
      rentMonthly: 800,
      officeRequired: true
    };
  }

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 1024,
    system: "Extract listing details from the HTML. Return JSON with title, address, rentMonthly (number), and officeRequired (boolean).",
    messages: [
      { role: 'user', content: htmlContent }
    ],
  });
  
  // Parse response
  try {
     return JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '{}');
  } catch(e) {
     return null;
  }
}
