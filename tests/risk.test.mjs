import test from 'node:test';import assert from 'node:assert/strict';import{score,validate,meta}from'../server/risk.js';
const base={transaction_type:'PAYMENT',amount:120,available_balance:10000,avg_amount_30d:150,account_age_days:900,device_age_days:200,txns_last_hour:1,failed_logins_24h:0,hour:13,is_international:0,new_beneficiary:0};
test('valid transaction scored',()=>{const x=score(base);assert.ok(x.risk_score>=0&&x.risk_score<=100);assert.ok(['Low','Medium','High'].includes(x.risk_level));});
test('invalid missing fields rejected',()=>assert.throws(()=>validate({amount:1}),/Missing/));
test('negative amounts rejected',()=>assert.throws(()=>score({...base,amount:-1}),/Invalid/));
test('invalid hour rejected',()=>assert.throws(()=>score({...base,hour:24}),/Invalid/));
test('high-signal transaction scores higher',()=>{const a=score(base),b=score({...base,transaction_type:'TRANSFER',amount:15000,device_age_days:0,failed_logins_24h:5,txns_last_hour:8,is_international:1,new_beneficiary:1,hour:2});assert.ok(b.risk_score>a.risk_score)});
test('metadata exists',()=>assert.equal(meta().model_type,'logistic-regression'));
