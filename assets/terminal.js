// A deliberately client-side portfolio terminal, not an operating-system shell.
import { i as loadReact } from './framework-D_rUT4EX.js';
const React = loadReact();
const {useState,useRef,useEffect} = React;
const h = React.createElement;
const apps = {about:'about',projects:'works',works:'works',resume:'resume',contact:'contact',games:'games',terminal:'terminal',settings:'settings'};
const themes = ['vintage','paper','midnight'];
const commands = ['help','ls','pwd','cd','cat','echo','whoami','date','open','theme','github','linkedin','email','history','clear'];
const files = {'about.txt':'Reedhan Garg — DTU student exploring web development, cybersecurity and competitive programming.','resume.txt':'Student at Delhi Technological University. Interests include Python, C, web development and cybersecurity.','contact.txt':'Email: reedhangarg08@gmail.com\nGitHub: github.com/reedhan-g\nLinkedIn: linkedin.com/in/reedhan-garg/','projects.txt':'Last Hex · Auth Log Parser · IGTS DTU. Type open projects for details.'};
const help = [
 'help                  Show this command list',
 'ls                    List available files',
 'pwd                   Show the current directory',
 'cd ~                  Return to the home directory',
 'cat <file>            Read a portfolio text file',
 'echo <text>           Print text',
 'whoami                Show a short introduction',
 'date                  Show local date and time',
 'open <app>            Open a desktop window',
 'theme [name]          Show or change the theme',
 'github / linkedin     Open a social profile',
 'email                 Open your email app',
 'history               Show previous commands',
 'clear                 Clear the terminal',
 '',
 'Apps: about, projects, resume, contact, games, terminal, settings',
 'Themes: vintage, paper, midnight. Use Tab to complete and ↑/↓ for history.'
];
export default function Terminal({open,theme,setTheme}) {
 const [lines,setLines]=useState(['Reedhan.OS [Version 1.0]','A small simulated terminal. Type help to explore.','']);
 const [input,setInput]=useState('');
 const history=useRef([]), historyAt=useRef(0), output=useRef(null), field=useRef(null);
 useEffect(()=>{output.current?.scrollTo(0,output.current.scrollHeight)},[lines]);
 function run() {
  const raw=input.trim(); setInput(''); if(!raw)return;
  history.current.push(raw); historyAt.current=history.current.length;
  const [cmd,...args]=raw.split(/\s+/), key=cmd.toLowerCase(), arg=(args[0]||'').toLowerCase(); let response=[];
  switch(key) {
   case 'clear': setLines([]); return;
   case 'help': response=help; break;
   case 'ls': response=[Object.keys(files).join('   ')]; break;
   case 'pwd': response=['/home/reedhan']; break;
   case 'cd': response=(args.length===0 || ['~','/home/reedhan','.'].includes(args[0]))?[]:['No such directory: '+args[0]+' (this is a simulated terminal)']; break;
   case 'cat': response=!arg?['Usage: cat <file>']:files[arg]?files[arg].split('\n'):['File not found: '+arg]; break;
   case 'echo': response=[args.join(' ')]; break;
   case 'whoami': response=['Reedhan Garg — DTU student, curious builder and lifelong learner.']; break;
   case 'date': response=[new Date().toLocaleString()]; break;
   case 'history': response=history.current.map((v,i)=>`${i+1}  ${v}`); break;
   case 'theme': if(!arg)response=[`Current theme: ${theme}. Available: ${themes.join(', ')}`]; else if(themes.includes(arg)){setTheme(arg);response=[`Theme changed to ${arg}.`]} else response=['Unknown theme. Choose vintage, paper or midnight.']; break;
   case 'open': if(apps[arg]){open(apps[arg]);response=[`Opening ${arg}…`]} else response=['Usage: open <app>','Apps: '+Object.keys(apps).join(', ')]; break;
   case 'github': window.open('https://github.com/reedhan-g','_blank','noopener,noreferrer');response=['Opening GitHub…'];break;
   case 'linkedin': window.open('https://www.linkedin.com/in/reedhan-garg/','_blank','noopener,noreferrer');response=['Opening LinkedIn…'];break;
   case 'email': window.location.href='mailto:reedhangarg08@gmail.com';response=['Opening your email app…'];break;
   default: if(apps[key]){open(apps[key]);response=[`Opening ${key}…`]} else response=[`Command not found: ${cmd}`,'Type help for a list of commands.'];
  }
  setLines(old=>[...old,`reedhan@desktop ~ % ${raw}`,...response,'']);
 }
 function complete(event){
  const value=input, parts=value.trimStart().split(/\s+/), trailing=/\s$/.test(value); let prefix='', choices=[];
  if(parts.length===1&&!trailing) choices=commands.filter(x=>x.startsWith(parts[0].toLowerCase()));
  else {let first=parts[0].toLowerCase(), word=trailing?'':parts[parts.length-1].toLowerCase(); prefix=first+' '; choices=(first==='open'?Object.keys(apps):first==='theme'?themes:first==='cat'?Object.keys(files):first==='cd'?['~']:[]).filter(x=>x.startsWith(word));}
  if(!choices.length)return;
  let shared=choices[0]; for(const c of choices)while(!c.startsWith(shared))shared=shared.slice(0,-1);
  setInput(prefix+shared+(choices.length===1?' ':''));
  if(choices.length>1 && prefix+shared===value) setLines(old=>[...old,`reedhan@desktop ~ % ${value}`,choices.join('   '),'']);
 }
 return h('div',{className:'terminal-body',onClick:()=>field.current?.focus()},[
  h('div',{ref:output,className:'terminal-output',role:'log','aria-label':'Terminal output',key:'output'},lines.map((line,i)=>h('div',{key:i},line||'\u00a0'))),
  h('form',{key:'form',onSubmit:e=>{e.preventDefault();run()}},[
   h('label',{htmlFor:'command',key:'label'},'reedhan@desktop ~ % '),
   h('input',{ref:field,id:'command',key:'input','aria-label':'Terminal command',value:input,spellCheck:false,autoComplete:'off',onChange:e=>setInput(e.target.value),onKeyDown:e=>{
    if(e.key==='ArrowUp'){e.preventDefault();historyAt.current=Math.max(0,historyAt.current-1);setInput(history.current[historyAt.current]||'')}
    else if(e.key==='ArrowDown'){e.preventDefault();historyAt.current=Math.min(history.current.length,historyAt.current+1);setInput(history.current[historyAt.current]||'')}
    else if(e.key==='Tab'){e.preventDefault();complete(e)}
   }})])]);
}
