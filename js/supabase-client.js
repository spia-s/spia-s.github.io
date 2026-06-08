/* supabase-client.js — Shared Supabase client configuration */

// Supabase configuration
const SUPABASE_URL = 'https://bsrpwvaxffvhjoiljsxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzcnB3dmF4ZmZ2aGpvaWxqc3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NzI0OTQsImV4cCI6MjA5NjQ0ODQ5NH0.Z5YXp1h0YpAYiNriIx_7UwuRdhvBjAJhDsX716kKjFE';

// Initialize Supabase client
let supabase;

// Wait for ES module to load if needed
function initSupabase() {
    try {
        // Try different ways the library might be exposed
        const lib = window.supabase || window.Supabase;
        
        if (lib && lib.createClient) {
            supabase = lib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            window.supabaseClient = supabase;
            console.log('Supabase client initialized successfully');
            return true;
        } else {
            console.error('Supabase library not loaded or createClient not available');
            console.log('Available window properties:', Object.keys(window).filter(k => k.toLowerCase().includes('supa')));
            return false;
        }
    } catch (error) {
        console.error('Error initializing Supabase client:', error);
        return false;
    }
}

// Try to initialize immediately
if (!initSupabase()) {
    // If failed, wait for module to load
    let attempts = 0;
    const maxAttempts = 20;
    const checkInterval = setInterval(() => {
        attempts++;
        if (initSupabase() || attempts >= maxAttempts) {
            clearInterval(checkInterval);
        }
    }, 100);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { supabase };
}
