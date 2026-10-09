import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {score,meta,FIELDS} from './risk.js';
export function csvParse(text){
 if(typeof text!=='string'||text.length>2_800_000)throw Error('CSV file too large');
 const out=[],rows=text.replace(/\r/g,'').trim().split('\n');
 if(rows.length>5001)throw Error('Maximum 5000 records');
 const header=rows.shift()?.split(',').map(x=>x.trim())||[];
 for(const f of FIELDS)if(!header.includes(f))throw Error('CSV missing field: '+f);
 for(let idx=0;idx<rows.length;idx++){
  if(!rows[idx].trim())continue;
  const parts=rows[idx].split(',');if(parts.length!==header.length)throw Error('Malformed CSV row '+(idx+2));
  out.push(Object.fromEntries(header.map((x,i)=>[x,parts[i]])));
 }return out;
}
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function demo(){const csv=fs.readFileSync(path.join(root,'data/demo_transactions.csv'),'utf8');return csvParse(csv).slice(0,240).map(score);}
export function execute(endpoint,body={}){
 if(endpoint==='health')return {status:'ok'};
 if(endpoint==='model')return meta();
 if(endpoint==='demo')return {transactions:demo()};
 if(endpoint==='predict')return {prediction:score(body)};
 if(endpoint==='batch')return {transactions:csvParse(body.csv).map(score)};
 throw Error('Not found');
}
