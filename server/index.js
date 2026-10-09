import http from 'node:http';
import {execute} from './core.js';
import {authenticate} from './auth.js';
const port=Number(process.env.PORT||4000);
const origin='http://localhost:5173';
const send=(res,status,obj)=>{res.writeHead(status,{'Content-Type':'application/json','Access-Control-Allow-Origin':origin,'Cache-Control':'no-store'});res.end(JSON.stringify(obj));};
http.createServer(async(req,res)=>{
 const endpoint=new URL(req.url,'http://localhost').pathname.replace(/^\/api\//,'');
 if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Authorization,Content-Type'});return res.end();}
 if(!['health','model','demo','predict','batch'].includes(endpoint))return send(res,404,{error:'Not found'});
 if(endpoint!=='health'&&!(await authenticate(req)))return send(res,401,{error:'Please sign in'});
 if(['predict','batch'].includes(endpoint)&&req.method!=='POST')return send(res,405,{error:'Method not allowed'});
 try{let body={};if(req.method==='POST'){let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>3_000_000)throw Error('Payload too large');}body=JSON.parse(raw||'{}');}
 return send(res,200,execute(endpoint,body));}catch(e){return send(res,400,{error:e.message});}
}).listen(port,()=>console.log('FraudGuard API at http://localhost:'+port));
