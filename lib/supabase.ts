import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prhddoiyfavpqhqqcmty.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByaGRkb2l5ZmF2cHFocXFjbXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNTM0OTcsImV4cCI6MjA4MzgyOTQ5N30.H8IHRKWvh-C8yYke9iU7BdCRwQb5ZBUgexl_s9cMYbs';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});