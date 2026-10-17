(() => {
 const groups=[...document.querySelectorAll('.development-rows,.hw-process-rows')];
 if(!groups.length)return;
 let frame=0;
 function measure(){
  frame=0;
  groups.forEach(group=>{
   const rows=[...group.children].filter(row=>row.tagName==='ARTICLE');
   const heights=rows.map(row=>Math.ceil(row.getBoundingClientRect().height));
   const label=rows[0]?.querySelector('h3');
   const line=label?parseFloat(getComputedStyle(label).lineHeight):48;
   const step=Math.round((Number.isFinite(line)?line:48)/2);
   const base=innerWidth<=700?12:16;
   group.style.setProperty('--stack-cover',`${Math.max(...heights,0)}px`);
   let offset=base;
   rows.forEach((row,index)=>{
    row.style.setProperty('--stack-top',`${offset}px`);
    const heading=row.querySelector('h3');
    const rowBox=row.getBoundingClientRect();
    const headingBox=heading?.getBoundingClientRect();
    const padding=parseFloat(getComputedStyle(row).paddingTop)||0;
    offset+=group.dataset.stackLabel==='full'&&headingBox?Math.ceil(headingBox.bottom-rowBox.top+Math.max(16,padding*.5)):step;
    row.style.setProperty('--stack-height',`${heights[index]}px`);
   });
  });
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(measure);}
 measure();document.fonts.ready.then(schedule);addEventListener('resize',schedule);
 if('ResizeObserver'in window){const observer=new ResizeObserver(schedule);groups.forEach(group=>[...group.children].forEach(row=>observer.observe(row)));}
})();
