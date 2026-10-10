(() => {
 "use strict";
 const read = k => {try{const x=JSON.parse(localStorage.getItem(k)||"[]");return Array.isArray(x)?x:[]}catch{return []}};
 const s=x=>String(x??"");
 const score=r=>{const raw=r.score??r.percentage??r.percent??r.totalScore;if(raw==null||raw==="")return null;const n=Number(raw);return Number.isFinite(n)&&n>=0&&n<=100?n:null};
 const tid=r=>s(r.testId??r.testID??r.test?.id), sid=r=>s(r.studentId??r.userId??r.student?.id);
 function load(){const tests=read('advantaTests'),classes=read('advantaClasses'),users=read('advantaUsers'),staff=read('advantaStaffUsers'),all=read('advantaResults');
 const cm=new Map();classes.forEach(c=>{cm.set(s(c.id),c);cm.set(s(c.name??c.className),c)});
 const tm=new Map(tests.map(t=>[s(t.id),t])),um=new Map(users.map(u=>[s(u.id),u])),sm=new Map(staff.map(u=>[s(u.id),u]));const latest=new Map();all.forEach((r,i)=>{const k=JSON.stringify([sid(r),tid(r)]);if(!sid(r)||!tid(r)||score(r)==null)return;const time=Date.parse(r.completedAt??r.submittedAt??r.createdAt??r.date??'')||0;const prev=latest.get(k);if(!prev||time>=prev.time)latest.set(k,{r,time,i})});
 const results=[...latest.values()].map(({r})=>{const t=tm.get(tid(r)),u=um.get(sid(r));const refs=[r.classId,u?.classId,u?.approvedClassId,t?.classId,...(Array.isArray(t?.classIds)&&t.classIds.length===1?t.classIds:[])];const cls=refs.map(v=>cm.get(s(v))).find(Boolean);const threshold=Number(t?.passingScore??t?.passScore??t?.threshold??50);return{raw:r,test:t,student:u,class:cls,classId:s(cls?.id??r.classId??u?.classId??''),score:score(r),threshold:Number.isFinite(threshold)?threshold:50,studentName:u?.fullName||u?.name||[u?.firstName,u?.lastName].filter(Boolean).join(' ')||r.studentName||sid(r),testName:t?.title||t?.name||r.testName||tid(r),subject:t?.subjectName||t?.subject||'',date:r.completedAt??r.submittedAt??r.createdAt??r.date??'',failed:score(r)<(Number.isFinite(threshold)?threshold:50)}});
 return{tests,classes,users,staff,results,tm,sm};}
 window.DirectorData={load,read,s,score,tid,sid,average:n=>n.length?n.reduce((a,b)=>a+b,0)/n.length:null};
})();