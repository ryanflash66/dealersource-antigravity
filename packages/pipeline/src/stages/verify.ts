import { Anthropic } from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || 'mock',
});

export async function generateVerificationEmail(caseType: string, address: string) {
  if (process.argv.includes('--offline') || process.env.CLAUDE_API_KEY === 'placeholder') {
    return `Subject: Inquiry regarding ${address}\n\nHello, I would like to verify the ${caseType} status for ${address}.`;
  }

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 1024,
    system: "You are drafting an email template to verify a gating fact for a car dealership site. Ensure it is polite and professional.",
    messages: [
      { role: 'user', content: `Draft an email to verify ${caseType} for ${address}.` }
    ],
  });
  
  return response.content[0].type === 'text' ? response.content[0].text : '';
}
