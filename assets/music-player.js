// CC0 recordings from HoliznaCC0, distributed with this site.
import { i as loadReact } from './framework-D_rUT4EX.js';
const React=loadReact(), {useState,useRef,useEffect}=React, h=React.createElement;
const stations=[
 {id:'off',name:'Off'},
 {id:'lofi',name:'Lo-fi · Still Life',file:'lofi-still-life.mp3'},
 {id:'rain',name:'Lo-fi · Down Time',file:'lofi-down-time.mp3'},
 {id:'ambient',name:'Ambient · Atmosphere 1',file:'ambient-atmosphere-1.mp3'},
 {id:'night',name:'Ambient · Atmosphere 2',file:'ambient-atmosphere-2.mp3'}
];
export default function MusicPlayer(){
 const [shown,show]=useState(false),[station,setStation]=useState(()=>{try {const saved=localStorage.getItem('reedhan-radio-station');return stations.some(s=>s.id===saved)?saved:'off'}catch{return 'off'}}),[playing,setPlaying]=useState(false),[volume,setVolume]=useState(()=>{try {const v=localStorage.getItem('reedhan-radio-volume');return v===null?.28:Math.max(0,Math.min(1,Number(v)))}catch{return .28}}),[error,setError]=useState('');
 const player=useRef(null),root=useRef(null),generation=useRef(0);
 if(!player.current){player.current=new Audio();player.current.loop=true;player.current.preload='none'}
 useEffect(()=>{const audio=player.current;return()=>{generation.current++;audio.pause();audio.removeAttribute('src');audio.load()}},[]);
 useEffect(()=>{function close(e){if(root.current&&!root.current.contains(e.target))show(false)}function key(e){if(e.key==='Escape')show(false)}document.addEventListener('pointerdown',close);document.addEventListener('keydown',key);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',key)}},[]);
 async function play(id){
  const track=stations.find(s=>s.id===id), audio=player.current, request=++generation.current;
  if(!track?.file)return;
  setError('');audio.pause();audio.src=new URL('../music/'+track.file,import.meta.url).href;audio.volume=volume;audio.currentTime=0;
  try{await audio.play();if(request===generation.current)setPlaying(true)}catch(e){if(request===generation.current){setPlaying(false);setError('Unable to play this track. Please try again.')}}
 }
 function choose(id){setStation(id);try{localStorage.setItem('reedhan-radio-station',id)}catch{}if(id==='off'){generation.current++;player.current.pause();setPlaying(false);setError('')}else play(id)}
 async function toggle(){if(playing){generation.current++;player.current.pause();setPlaying(false);return}let id=station==='off'?'lofi':station;setStation(id);try{localStorage.setItem('reedhan-radio-station',id)}catch{};const audio=player.current;if(audio.src&&id===station){let request=++generation.current;try{setError('');await audio.play();if(request===generation.current)setPlaying(true)}catch{if(request===generation.current)setError('Unable to play this track. Please try again.')}}else play(id)}
 return h('div',{className:'radio-control',ref:root},[
 h('button',{className:'top-chip radio-toggle','aria-expanded':shown,'aria-label':'Music player'+(playing?', playing':', paused'),onClick:()=>show(!shown),key:'open'},playing?'♫ MUSIC':'♬ MUSIC'),
 shown&&h('div',{className:'radio-panel',role:'group','aria-label':'Music player',key:'panel'},[
 h('div',{className:'radio-head',key:'head'},[h('span',{key:'a'},'♫  DESKTOP RADIO'),h('button',{key:'b',onClick:()=>show(false),'aria-label':'Close music player'},'×')]),
 h('p',{className:'radio-caption',key:'c'},'A little music for exploring.'),
 h('div',{className:'radio-stations',role:'radiogroup','aria-label':'Music mood',key:'stations'},stations.map(s=>h('button',{role:'radio','aria-checked':station===s.id,className:'radio-option'+(station===s.id?' active':''),onClick:()=>choose(s.id),key:s.id},[h('span',{key:'a'},s.name),h('span',{key:'b'},station===s.id?'✓':'')]))),
 h('div',{className:'radio-controls',key:'controls'},[h('button',{className:'radio-play',onClick:toggle,key:'play'},playing?'Ⅱ  Pause':'▶  Play'),h('label',{key:'vol'},['Volume ',h('input',{key:'v',type:'range',min:'0',max:'1',step:'.01',value:volume,'aria-label':'Music volume',onChange:e=>{let v=Number(e.target.value);setVolume(v);player.current.volume=v;try{localStorage.setItem('reedhan-radio-volume',String(v))}catch{}}})])]),
 h('p',{className:'radio-foot',key:'foot'},error||'Music by HoliznaCC0 · CC0 1.0')])]);
}
