const projects=[...document.querySelectorAll('.project')];
const filters=[...document.querySelectorAll('.filter')];
const modal=document.querySelector('.modal');
const modalVideo=modal.querySelector('video');
const modalTitle=modal.querySelector('h3');
const modalType=modal.querySelector('span');

// 视频加载：有真实视频时自动隐藏彩色占位图
projects.forEach((project)=>{
  const video=project.querySelector('video');
  const placeholder=project.querySelector('.placeholder');
  video.addEventListener('loadeddata',()=>project.querySelector('.project-media').classList.add('video-ready'));
  video.addEventListener('error',()=>project.querySelector('.project-media').classList.remove('video-ready'));
  const play=project.querySelector('.play');
  play.addEventListener('click',(e)=>{e.stopPropagation(); if(video.paused){video.play();play.textContent='Ⅱ'}else{video.pause();play.textContent='▶'}});
  video.addEventListener('play',()=>play.textContent='Ⅱ');
  video.addEventListener('pause',()=>play.textContent='▶');
  project.querySelector('.view').addEventListener('click',()=>openModal(project));
  project.querySelector('.project-media').addEventListener('dblclick',()=>openModal(project));
});

filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');
  const type=btn.dataset.filter;
  projects.forEach((p,i)=>{p.classList.toggle('hidden',type!=='all'&&p.dataset.category!==type); if(type==='all'||p.dataset.category===type){p.style.animation=`popIn .45s ${i*.035}s both`}});
}));

function openModal(project){
  const video=project.querySelector('video');
  const source=video.querySelector('source')?.src;
  modalType.textContent=project.querySelector('.project-meta span').textContent;
  modalTitle.textContent=project.querySelector('h3').textContent;
  modalVideo.src=source||'';
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  modalVideo.play().catch(()=>{});
}
function closeModal(){modalVideo.pause();modalVideo.removeAttribute('src');modalVideo.load();modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.querySelector('.modal-backdrop').addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// 移动端菜单
const mobileMenu=document.querySelector('.mobile-menu');
document.querySelector('.menu').addEventListener('click',()=>mobileMenu.classList.add('open'));
document.querySelector('.menu-close').addEventListener('click',()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

// 鼠标跟随效果（电脑端）
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
window.addEventListener('mousemove',e=>{dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px'});
document.querySelectorAll('a,button,.project-media').forEach(el=>{el.addEventListener('mouseenter',()=>{ring.style.width='58px';ring.style.height='58px';ring.style.background='rgba(255,92,168,.08)'});el.addEventListener('mouseleave',()=>{ring.style.width='38px';ring.style.height='38px';ring.style.background='transparent'})});

// 入场动画
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.section-label,.intro h2,.intro-text,.work-head h2,.project,.about-title,.about-copy,.skill-row,.contact-main').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
