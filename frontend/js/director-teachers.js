(() => {
"use strict";
const $ = id => document.getElementById(id);
const get = key => {try {const v=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(v)?v:[]}catch{return []}};
const str = v => String(v??"");
const safe = v => str(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const word = key => window.t(key,"director-teachers");
const name = u => u.name||u.fullName||[u.firstName,u.lastName].filter(Boolean).join(" ")||u.email||u.id||word("notSpecified");
const uid = u => str(u.id??u.userId??u.email);
const score = r => {const v=r.score??r.percentage??r.percent??r.totalScore; if(v==null||v==="")return null;const n=Number(v);return Number.isFinite(n)&&n>=0&&n<=100?n:null};
const avg = values => values.length ? Math.round(values.reduce((a,b)=>a+b,0)/values.length) : null;
function latest(results) {const seen=new Map();results.forEach((r,i)=>{const u=r.studentId??r.userId??r.student?.id;const t=r.testId??r.testID??r.test?.id;if(u==null||t==null||score(r)==null)return;const k=JSON.stringify([str(u),str(t)]);const time=Date.parse(r.completedAt??r.submittedAt??r.createdAt??r.date??"")||0;const old=seen.get(k);if(!old||time>old.time||(time===old.time&&i>old.index))seen.set(k,{r,time,index:i})});return [...seen.values()].map(x=>x.r)}
function data() {
 const users=get("advantaUsers"),classes=get("advantaClasses"),tests=get("advantaTests"),results=latest(get("advantaResults"));
 const map=new Map();
 function ensure(id) {id=str(id);if(!id)return null;if(!map.has(id))map.set(id,{id,record:null,classes:new Set(),subjects:new Set(),tests:[]});return map.get(id)}
 users.forEach(u=>{if(["teacher","учитель","мұғалім"].includes(str(u.role??u.userRole).toLowerCase())){const p=ensure(uid(u));if(p){p.record=u;(u.classIds||[]).forEach(id=>p.classes.add(str(id)));if(u.subject||u.subjectName||u.subjectId)p.subjects.add(str(u.subjectName||u.subject||u.subjectId))}}});
 classes.forEach(c=>{const p=ensure(c.teacherId??c.ownerId);if(p){p.classes.add(str(c.id??c.classId??c.name));if(c.subjectName||c.subject)p.subjects.add(str(c.subjectName||c.subject))}});
 tests.forEach(test=>{const p=ensure(test.teacherId??test.createdBy??test.authorId);if(p){p.tests.push(test);[test.classId,...(Array.isArray(test.classIds)?test.classIds:[]),...(Array.isArray(test.assignedClassIds)?test.assignedClassIds:[])].filter(v=>v!=null).forEach(id=>p.classes.add(str(id)));const sub=test.subjectName??test.subject??test.subjectId;if(sub)p.subjects.add(str(sub))}});
 const classNames=new Map();classes.forEach(c=>{classNames.set(str(c.id),str(c.name??c.className??c.id));classNames.set(str(c.name??c.className),str(c.name??c.className))});
 const teachers=[...map.values()].map(p=>{const ids=new Set(p.tests.map(t=>str(t.id)));const completed=results.filter(r=>ids.has(str(r.testId??r.testID??r.test?.id)));const average=avg(completed.map(score).filter(x=>x!=null));return {...p,display:name(p.record||{id:p.id}),subject:[...p.subjects].join(", ")||word("notSpecified"),classNames:[...p.classes].map(x=>classNames.get(x)||x).join(", ")||word("noClasses"),completed,average}});
 teachers.sort((a,b)=>a.display.localeCompare(b.display,"ru"));return {teachers,classNames};
}
let selected=null;
function update(){const {teachers,classNames}=data();$("totalTeachers").textContent=teachers.length;$("activeTeachers").textContent=teachers.filter(t=>t.tests.length>0).length;$("attentionTeachers").textContent=teachers.filter(t=>t.average!=null&&t.average<70).length;
 const select=$("subjectFilter"),old=select.value,subjects=[...new Set(teachers.map(t=>t.subject))].sort();select.replaceChildren(new Option(word("allSubjects"),""));subjects.forEach(s=>select.add(new Option(s,s)));select.value=subjects.includes(old)?old:"";
 const query=$("teacherSearch").value.trim().toLowerCase();const filtered=teachers.filter(t=>(t.display+" "+t.subject+" "+t.classNames).toLowerCase().includes(query)&&(!select.value||select.value===t.subject));
 const body=$("teachersTableBody");body.replaceChildren();if(!filtered.length){body.innerHTML=`<tr><td colspan="7" class="text-muted">${safe(word("none"))}</td></tr>`}
 for(const t of filtered){const tr=document.createElement("tr");const stat=t.average==null?word("unknown"):t.average<70?word("risk"):word("good");tr.innerHTML=`<td class="fw-semibold">${safe(t.display)}</td><td>${safe(t.subject)}</td><td>${safe(t.classNames)}</td><td>${t.tests.length}</td><td>${t.average==null?"—":t.average+"/100"}</td><td>${safe(stat)}</td><td><button class="btn btn-sm btn-outline-primary" type="button">${safe(word("details"))}</button></td>`;tr.querySelector("button").addEventListener("click",()=>{selected=t.id;showDetails(data())});body.append(tr)}
 if(selected)showDetails({teachers,classNames});
}
function showDetails({teachers,classNames}){const t=teachers.find(x=>x.id===selected);const section=$("teacherDetails");if(!t){section.classList.add("d-none");return}section.classList.remove("d-none");$("selectedTeacherName").textContent=t.display;const rows=[];for(const classId of t.classes){const tests=t.tests.filter(test=>[test.classId,...(test.classIds||[]),...(test.assignedClassIds||[])].some(v=>str(v)===classId));const ids=new Set(tests.map(test=>str(test.id)));const results=t.completed.filter(r=>ids.has(str(r.testId??r.testID??r.test?.id)));const students=new Set(results.map(r=>str(r.studentId??r.userId)).filter(Boolean));rows.push({className:classNames.get(classId)||classId,completions:results.length,students:students.size,average:avg(results.map(score).filter(x=>x!=null))})}$("detailsBody").innerHTML=rows.length?rows.map(r=>`<tr><td>${safe(r.className)}</td><td>${r.completions}</td><td>${r.students}</td><td>${r.average==null?"—":r.average+"/100"}</td></tr>`).join(""):`<tr><td colspan="4" class="text-muted">${safe(word("noClasses"))}</td></tr>`}
function init(){ $("teacherSearch").addEventListener("input",update);$("subjectFilter").addEventListener("change",update);$("closeDetails").addEventListener("click",()=>{selected=null;$("teacherDetails").classList.add("d-none")});window.addEventListener("languageChanged",update);window.addEventListener("storage",e=>{if(!e.key||["advantaUsers","advantaClasses","advantaTests","advantaResults"].includes(e.key))update()});update()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();