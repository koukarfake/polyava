import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function TestingPage() {
    // Fetch data from the 'transactions' table
    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .limit(10);

    return (
        <main>
            <h1>Supabase Transactions Test</h1>
            {error && (
                <div style={{ color: 'red' }}>
                    <strong>Error:</strong> {error.message}
                </div>
            )}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </main>
    );
}