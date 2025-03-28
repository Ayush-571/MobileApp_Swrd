import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qstwouyyalbrxxpahbtn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdHdvdXl5YWxicnh4cGFoYnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNDMxNDEsImV4cCI6MjA1MTgxOTE0MX0.NhoB3H6NTXJqc8MxkshfDw-TEZGYik_qlc2_5h-fs2w';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
