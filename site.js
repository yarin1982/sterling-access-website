const header=document.querySelector('.site-header');
const menu=document.querySelector('#mobile-menu');
const toggle=document.querySelector('.menu-toggle');
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();toggle.focus();}});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
matchMedia('(min-width: 1021px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
function compact(){header.classList.toggle('compact',scrollY>32);}addEventListener('scroll',compact,{passive:true});compact();
const form=document.querySelector('#service-form');
if(form){
 const service=new URLSearchParams(location.search).get('service');
 if(['Garage Door','Locksmith'].includes(service))form.elements.service.value=service;
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const d=Object.fromEntries(new FormData(form));if(d.website)return;
  window.sterlingAnalytics?.formHandoff(form);
  const body=['Name: '+d.name,'Phone: '+d.phone,'Email: '+(d.email||'Not provided'),'Service: '+d.service,'City: '+d.city,'','What is happening:',d.message].join('\n');
  location.href='mailto:sterlingaccessca@gmail.com?subject='+encodeURIComponent(d.service+' service enquiry — '+d.city)+'&body='+encodeURIComponent(body);
  document.querySelector('#form-status').textContent='Your enquiry is ready in your email app. Press Send there to email us. If no app opened, email sterlingaccessca@gmail.com or call (437) 212-7754. Nothing has been sent by this website.';
 });
}
const arrival=document.querySelector('.arrival-video');
if(arrival){
 const control=document.querySelector('.motion-control');
 const parked=document.querySelector('.arrival-still');
 // Hold the corrected lettering after the original arrival film ends.
 arrival.addEventListener('playing',()=>{if(parked)parked.hidden=true;});
 arrival.addEventListener('ended',()=>{if(parked&&parked.complete&&parked.naturalWidth)parked.hidden=false;});
 if(parked)parked.addEventListener('load',()=>{if(arrival.ended)parked.hidden=false;});
 if(parked)parked.addEventListener('error',()=>{parked.hidden=true;});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const label=()=>{const text=arrival.ended?'Replay arrival':arrival.paused?'Play arrival':'Pause arrival';control.textContent=text;control.setAttribute('aria-label',text);};
 const play=()=>{if(arrival.ended)arrival.currentTime=0;arrival.play().catch(label);};
 control.addEventListener('click',()=>{if(arrival.paused||arrival.ended)play();else arrival.pause();});
 ['play','pause','ended'].forEach(event=>arrival.addEventListener(event,label));
 arrival.addEventListener('error',()=>{control.hidden=true;if(parked&&parked.complete&&parked.naturalWidth)parked.hidden=false;});
 reduced.addEventListener('change',()=>{if(reduced.matches)arrival.pause();});
 if(!reduced.matches)play();
}

