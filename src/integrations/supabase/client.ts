// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://eosbqoridfsbxxtkyybn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvc2Jxb3JpZGZzYnh4dGt5eWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTgzMzAsImV4cCI6MjA2NDYzNDMzMH0.IVsFAB7xyTVO4T2KYy8-1-dRYoVlb5PglkN28AzMeiI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);