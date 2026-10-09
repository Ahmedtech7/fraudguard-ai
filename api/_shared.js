import {authenticate} from '../server/auth.js';
import {execute} from '../server/core.js';
export async function handler(req,res,endpoint){
 res.setHeader('Cache-Control','no-store');
 if(req.method!==(['batch','predict'].includes(endpoint)?'POST':'GET'))return res.status(405).json({error:'Method not allowed'});
 if(!(await authenticate(req)))return res.status(401).json({error:'Please sign in'});
 try{
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  return res.status(200).json(execute(endpoint,body));
 }catch(err){return res.status(400).json({error:err.message||'Invalid request'});}
}
