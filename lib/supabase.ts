import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ouqjpbscfvwnweiodybp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cWpwYnNjZnZ3bndlaW9keWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2Mzk3NTYsImV4cCI6MjA4MDIxNTc1Nn0.deAbbc1DMay5zYjwIz_BMnXx8xiZYe-tSG6zvfP-OVs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
