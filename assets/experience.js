// Small progressive enhancements layered over the recovered desktop.
const boot = document.querySelector('.boot-screen');
const finishBoot = () => {
  if (!boot || boot.classList.contains('is-done')) return;
  boot.classList.add('is-done');
  document.body.classList.add('desktop-ready');
  boot.setAttribute('aria-hidden', 'true');
  boot.querySelector('button').tabIndex = -1;
  setTimeout(() => boot.remove(), 500);
};
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const bootTimer = setTimeout(finishBoot, reduced ? 100 : 2300);
boot?.querySelector('button')?.addEventListener('click', () => { clearTimeout(bootTimer); finishBoot(); });

if (matchMedia('(pointer: fine)').matches && !reduced) {
  const dots = Array.from({ length: 9 }, () => {
    const el = document.createElement('span');
    el.className = 'pointer-dot';
    document.body.append(el);
    return { el, x: 0, y: 0 };
  });
  let x = 0, y = 0, visible = false;
  addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    x = event.clientX; y = event.clientY;
    if (!visible) { dots.forEach(dot => { dot.x = x; dot.y = y; }); visible = true; }
  }, { passive:true });
  addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('span');
      const angle = i * Math.PI / 3;
      spark.className = 'pointer-spark';
      spark.style.left = event.clientX + 'px'; spark.style.top = event.clientY + 'px';
      spark.style.setProperty('--x', Math.round(Math.cos(angle) * 18) + 'px');
      spark.style.setProperty('--y', Math.round(Math.sin(angle) * 18) + 'px');
      document.body.append(spark); spark.addEventListener('animationend', () => spark.remove());
    }
  }, { passive:true });
  function animate() {
    let targetX = x, targetY = y;
    dots.forEach((dot, i) => {
      dot.x += (targetX - dot.x) * .36; dot.y += (targetY - dot.y) * .36;
      dot.el.style.transform = `translate3d(${dot.x + 9}px,${dot.y + 11}px,0) scale(${1 - i * .07})`;
      dot.el.style.opacity = visible ? String((1 - i / dots.length) * .85) : '0';
      targetX = dot.x; targetY = dot.y;
    });
    requestAnimationFrame(animate);
  }
  animate();
}
