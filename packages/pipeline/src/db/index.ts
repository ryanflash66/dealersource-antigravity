import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertRawDocument(sourceId: string, url: string, content: string) {
  const { data, error } = await supabase
    .from('raw_documents')
    .insert([{ source_id: sourceId, url, content }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function insertListing(rawDocId: string, title: string, address: string, rentMonthly: number) {
  const { data, error } = await supabase
    .from('listings')
    .insert([{ raw_document_id: rawDocId, title, address, rent_monthly: rentMonthly }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function upsertSite(canonicalAddress: string, locationStr?: string) {
  const { data, error } = await supabase
    .from('sites')
    .insert([{ canonical_address: canonicalAddress }]) // Skipping PostGIS location insert for mock
    .select()
    .single();

  if (error) throw error;
  return data;
}
