// public/config.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// REPLACE THESE WITH YOUR ACTUAL SUPABASE KEYS
const SUPABASE_URL ='https://jilfujxzegrhnwxfvcop.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbGZ1anh6ZWdyaG53eGZ2Y29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NzI2NjEsImV4cCI6MjA4NTQ0ODY2MX0.ZWl_o9mLA5Njf0lAhYpMEWttiowdtWAJ7DmUcxFhMak';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper: Redirect if not logged in
export async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = 'login.html';
    }
    return session.user;
}