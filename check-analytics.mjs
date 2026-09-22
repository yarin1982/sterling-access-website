import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';
import {googleTag} from './google-tag.mjs';
const root=new URL('./dist/',import.meta.url);
const pages=readdirSync(root,{recursive:true}).filter(p=>p.endsWith('.html'));
for(const p of pages){
 const html=readFileSync(new URL(p.replaceAll('\\','/'),root),'utf8');
 assert.equal(html.split('https://www.googletagmanager.com/gtag/js?id=G-3X62D0LDMX').length-1,1,p);
 assert.equal(html.split("gtag('config', 'G-3X62D0LDMX'").length-1,1,p);
 assert.equal(html.split('src="/analytics.js"').length-1,1,p);
 assert.ok(html.indexOf(googleTag)<html.indexOf('</head>'),p);
}
const events=[],listeners={};let submit,valid=true,spam='';
const form={elements:{service:{value:'Garage Door'}},reportValidity:()=>valid,addEventListener:(name,fn)=>{if(name==='submit')submit=fn;}};
const menu={hidden:true,querySelectorAll:()=>[],setAttribute(){}};
const header={classList:{toggle(){}}};const toggle={addEventListener(){},setAttribute(){}};const status={};
const context={URL,URLSearchParams,FormData:class{*[Symbol.iterator](){yield ['website',spam];yield ['name','Private Name'];yield ['phone','PRIVATE_PHONE'];yield ['email','private@example.com'];yield ['service',form.elements.service.value];yield ['city','Private City'];yield ['message','Private message'];}},
 location:{href:'https://sterlingaccessca.com/contact/',origin:'https://sterlingaccessca.com',pathname:'/contact/',search:''},
 document:{addEventListener:(name,fn)=>{listeners[name]??=[];listeners[name].push(fn)},querySelector:selector=>({'.site-header':header,'#mobile-menu':menu,'.menu-toggle':toggle,'#service-form':form,'#form-status':status}[selector]||null)},
 matchMedia:()=>({addEventListener(){}}),addEventListener(){},scrollY:0};
context.window=context;context.gtag=(...args)=>events.push(args);
vm.createContext(context);
const analytics=readFileSync(new URL('analytics.js',root),'utf8');
vm.runInContext(analytics,context);vm.runInContext(analytics,context);
assert.equal(listeners.click.length,1,'Do not duplicate listeners');
function click(href){const a={getAttribute:()=>href,closest:()=>null};listeners.click[0]({target:{closest:()=>a}});}
click('tel:+14372127754');click('/garage-doors/');click('/locksmith/rekeying/');click('/about/');click('https://example.com/locksmith/');
assert.deepEqual(events.map(e=>e[1]),['phone_click','garage_door_cta_click','locksmith_cta_click']);
vm.runInContext(readFileSync(new URL('site.js',root),'utf8'),context);
const event={preventDefault(){}};
valid=false;submit(event);assert.equal(events.length,3,'Invalid form must not count');
valid=true;spam='bot';submit(event);assert.equal(events.length,3,'Honeypot must not count');
spam='';submit(event);assert.equal(events.length,4);assert.equal(events[3][1],'request_service_submit');assert.equal(events[3][2].submission_status,'email_handoff');
assert.ok(context.location.href.startsWith('mailto:sterlingaccessca@gmail.com?'),'Preserve email handoff');
assert.ok(status.textContent.includes('Nothing has been sent'),'Preserve form status');
form.elements.service.value='Locksmith';submit(event);assert.equal(events[4][2].service_type,'locksmith');
assert.ok(!/Private|PRIVATE|private@/.test(JSON.stringify(events)),'No submitted personal information in analytics');
context.gtag=()=>{throw Error('blocked')};submit(event);
console.log(`PASS: ${pages.length} pages tagged once; phone and service events; valid/invalid/spam forms; no PII; existing mailto behavior; analytics failure isolation.`);

