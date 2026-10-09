import {createClient} from '@supabase/supabase-js';
let cached;
export async function authenticate(req){
 const url=process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
 const key=process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)return false;
 const token=(req.headers.authorization||'').match(/^Bearer (.+)$/i)?.[1];
 if(!token)return false;
 if(!cached)cached=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 try{const {data,error}=await cached.auth.getUser(token);return !error&&!!data?.user;}catch{return false;}
}
