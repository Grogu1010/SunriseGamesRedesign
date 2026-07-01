document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;
    const close = () => { dropdown.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); };
    toggle.addEventListener('click', event => {
      event.preventDefault();
      const opening = !dropdown.classList.contains('is-open');
      document.querySelectorAll('.nav-dropdown.is-open').forEach(item => {
        if (item !== dropdown) {
          item.classList.remove('is-open');
          item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded','false');
        }
      });
      dropdown.classList.toggle('is-open', opening);
      toggle.setAttribute('aria-expanded', String(opening));
    });
    menu.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('click', event => { if (!dropdown.contains(event.target)) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  });

  if (document.body.classList.contains('page-home')) init_home();
  if (document.body.classList.contains('page-products')) init_products();
  if (document.body.classList.contains('page-how-to-play')) init_how_to_play();
});

function init_home(){
(function(){
  const PRICE = 19.99;
  const SHIPPING = 5.99;
  const CART_STORAGE_KEY = 'sunriseCartQty';
  function loadCartQty(){
    const savedQty = Number.parseInt(localStorage.getItem(CART_STORAGE_KEY) || '0', 10);
    return Number.isFinite(savedQty) && savedQty > 0 ? savedQty : 0;
  }
  function saveCartQty(){
    if (cartQty > 0) localStorage.setItem(CART_STORAGE_KEY, String(cartQty));
    else localStorage.removeItem(CART_STORAGE_KEY);
  }
  let cartQty = loadCartQty();
  let buyQty = 1;

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

  const cartCountEl = document.getElementById('cartCount');
  const drawerBody = document.getElementById('drawerBody');
  const drawerFoot = document.getElementById('drawerFoot');
  const drawerSubtotal = document.getElementById('drawerSubtotal');
  const drawerShipping = document.getElementById('drawerShipping');
  const drawerTotal = document.getElementById('drawerTotal');
  const overlay = document.getElementById('overlay');
  const drawer = document.getElementById('drawer');

  function money(n){ return '$' + n.toFixed(2); }

  function renderCart(){
    saveCartQty();
    cartCountEl.textContent = cartQty;
    if (cartQty === 0){
      drawerBody.innerHTML = '<div class="drawer-empty">Your cart is empty.<br>Add a deck and stay up with us.</div>';
      drawerFoot.style.display = 'none';
      return;
    }

    const subtotal = PRICE * cartQty;
    const shipping = SHIPPING;
    drawerBody.innerHTML = `
      <div class="drawer-item">
        <div class="thumb"><img src="cards/Dream Catcher.png" alt="" aria-hidden="true"></div>
        <div class="info">
          <h4>Survive 'til Sunrise</h4>
          <div class="meta">${cartQty} × ${money(PRICE)}</div>
          <div class="qty-control glass" style="width:fit-content;">
            <button id="drawerMinus" aria-label="Decrease quantity">−</button>
            <span class="qty-val">${cartQty}</span>
            <button id="drawerPlus" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>`;

    drawerFoot.style.display = 'block';
    drawerSubtotal.textContent = money(subtotal);
    drawerShipping.textContent = money(shipping);
    drawerTotal.textContent = money(subtotal + shipping);

    document.getElementById('drawerPlus').addEventListener('click', () => { cartQty++; renderCart(); });
    document.getElementById('drawerMinus').addEventListener('click', () => { cartQty = Math.max(0, cartQty - 1); renderCart(); });
  }

  function openDrawer(){
    overlay.classList.add('open');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
  }

  function closeDrawer(){
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');
  }

  document.getElementById('cartOpenBtn').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  let toastTimer;
  function showToast(msg){
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function addToCart(qty){
    cartQty += qty;
    renderCart();
    showToast(qty === 1 ? 'Survive \'til Sunrise added to cart' : `${qty} × Survive 'til Sunrise added to cart`);
    openDrawer();
  }

  const qtyVal = document.getElementById('qtyVal');
  document.getElementById('qtyPlus').addEventListener('click', () => {
    buyQty = Math.min(10, buyQty + 1);
    qtyVal.textContent = buyQty;
  });
  document.getElementById('qtyMinus').addEventListener('click', () => {
    buyQty = Math.max(1, buyQty - 1);
    qtyVal.textContent = buyQty;
  });

  document.getElementById('buyAddBtn').addEventListener('click', () => addToCart(buyQty));
  document.getElementById('buyNowBtn').addEventListener('click', () => {
    addToCart(buyQty);
    setTimeout(() => showToast('This is a demo store — no real checkout yet'), 500);
  });
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    showToast('Demo store — checkout is not wired to a payment processor');
  });

  renderCart();
})();
}


function init_products(){
(function(){
  const PRICE = 19.99;
  const SHIPPING = 5.99;
  const CART_STORAGE_KEY = 'sunriseCartQty';
  function loadCartQty(){
    const savedQty = Number.parseInt(localStorage.getItem(CART_STORAGE_KEY) || '0', 10);
    return Number.isFinite(savedQty) && savedQty > 0 ? savedQty : 0;
  }
  function saveCartQty(){
    if (cartQty > 0) localStorage.setItem(CART_STORAGE_KEY, String(cartQty));
    else localStorage.removeItem(CART_STORAGE_KEY);
  }
  let cartQty = loadCartQty();
  let buyQty = 1;

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

  const cartCountEl = document.getElementById('cartCount');
  const drawerBody = document.getElementById('drawerBody');
  const drawerFoot = document.getElementById('drawerFoot');
  const drawerSubtotal = document.getElementById('drawerSubtotal');
  const drawerShipping = document.getElementById('drawerShipping');
  const drawerTotal = document.getElementById('drawerTotal');
  const overlay = document.getElementById('overlay');
  const drawer = document.getElementById('drawer');

  function money(n){ return '$' + n.toFixed(2); }

  function renderCart(){
    saveCartQty();
    cartCountEl.textContent = cartQty;
    if (cartQty === 0){
      drawerBody.innerHTML = '<div class="drawer-empty">Your cart is empty.<br>Add a deck and stay up with us.</div>';
      drawerFoot.style.display = 'none';
      return;
    }

    const subtotal = PRICE * cartQty;
    const shipping = SHIPPING;
    drawerBody.innerHTML = `
      <div class="drawer-item">
        <div class="thumb"><img src="cards/Dream Catcher.png" alt="" aria-hidden="true"></div>
        <div class="info">
          <h4>Survive 'til Sunrise</h4>
          <div class="meta">${cartQty} × ${money(PRICE)}</div>
          <div class="qty-control glass" style="width:fit-content;">
            <button id="drawerMinus" aria-label="Decrease quantity">−</button>
            <span class="qty-val">${cartQty}</span>
            <button id="drawerPlus" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>`;

    drawerFoot.style.display = 'block';
    drawerSubtotal.textContent = money(subtotal);
    drawerShipping.textContent = money(shipping);
    drawerTotal.textContent = money(subtotal + shipping);

    document.getElementById('drawerPlus').addEventListener('click', () => { cartQty++; renderCart(); });
    document.getElementById('drawerMinus').addEventListener('click', () => { cartQty = Math.max(0, cartQty - 1); renderCart(); });
  }

  function openDrawer(){
    overlay.classList.add('open');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
  }

  function closeDrawer(){
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');
  }

  document.getElementById('cartOpenBtn').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  let toastTimer;
  function showToast(msg){
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function addToCart(qty){
    cartQty += qty;
    renderCart();
    showToast(qty === 1 ? 'Survive \'til Sunrise added to cart' : `${qty} × Survive 'til Sunrise added to cart`);
    openDrawer();
  }

  const qtyVal = document.getElementById('qtyVal');
  document.getElementById('qtyPlus').addEventListener('click', () => {
    buyQty = Math.min(10, buyQty + 1);
    qtyVal.textContent = buyQty;
  });
  document.getElementById('qtyMinus').addEventListener('click', () => {
    buyQty = Math.max(1, buyQty - 1);
    qtyVal.textContent = buyQty;
  });

  document.getElementById('buyAddBtn').addEventListener('click', () => addToCart(buyQty));
  document.getElementById('buyNowBtn').addEventListener('click', () => {
    addToCart(buyQty);
    setTimeout(() => showToast('This is a demo store — no real checkout yet'), 500);
  });
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    showToast('Demo store — checkout is not wired to a payment processor');
  });

  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  /* ---------- Cards showcase (expandable infinite carousel) ---------- */
  const cardsShowcase = document.getElementById('cardsShowcase');
  const cardsClose = document.getElementById('cardsClose');
  const cardsTrack = cardsShowcase.querySelector('.cards-track');
  const cardsHint = document.getElementById('cardsHint');
  const originalShowcaseCards = Array.from(cardsShowcase.querySelectorAll('.showcase-card'));
  let showcaseCards = [];
  let showcaseFrame = null;
  let loopFrame = null;
  let autoScrollFrame = null;
  let autoScrollLastTime = 0;
  let autoScrollRemainder = 0;
  let isAutoPausedByDrag = false;
  let isMomentumGliding = false;
  let suppressClickAfterDrag = false;

  function cardCenter(card){
    return card.offsetLeft + card.offsetWidth / 2;
  }

  function centerShowcaseCard(card, behavior = 'smooth'){
    cardsTrack.scrollTo({
      left:cardCenter(card) - cardsTrack.clientWidth / 2,
      behavior
    });
  }

  function getClosestCardToCenter(){
    const center = cardsTrack.scrollLeft + cardsTrack.clientWidth / 2;
    return showcaseCards.reduce((closest, card) => {
      const distance = Math.abs(cardCenter(card) - center);
      if (!closest || distance < closest.distance) return { card, distance };
      return closest;
    }, null)?.card || showcaseCards[0];
  }

  function getLoopMetrics(){
    const firstMiddle = cardsTrack.querySelector('.showcase-card[data-loop-set="middle"][data-card-index="0"]');
    const firstAfter = cardsTrack.querySelector('.showcase-card[data-loop-set="after"][data-card-index="0"]');
    if (!firstMiddle || !firstAfter) return null;
    const span = firstAfter.offsetLeft - firstMiddle.offsetLeft;
    if (span <= 0) return null;
    return {
      span,
      leftBoundary:firstMiddle.offsetLeft - cardsTrack.clientWidth / 2,
      rightBoundary:firstAfter.offsetLeft - cardsTrack.clientWidth / 2
    };
  }

  function applyLoopWrap(){
    const metrics = getLoopMetrics();
    if (!metrics) return 0;

    let scrollShift = 0;
    if (cardsTrack.scrollLeft < metrics.leftBoundary) {
      scrollShift = metrics.span;
    } else if (cardsTrack.scrollLeft >= metrics.rightBoundary) {
      scrollShift = -metrics.span;
    }

    if (scrollShift) {
      cardsTrack.scrollLeft += scrollShift;
      updateShowcaseDepth();
    }
    return scrollShift;
  }

  function wrapShowcaseScroll(){
    loopFrame = null;
    applyLoopWrap();
  }

  function requestLoopWrap(){
    if (!loopFrame) loopFrame = window.requestAnimationFrame(wrapShowcaseScroll);
  }

  function updateShowcaseDepth(){
    showcaseFrame = null;
    if (!cardsShowcase.classList.contains('expanded')) {
      showcaseCards.forEach(card => {
        card.classList.remove('is-active');
        card.style.removeProperty('--card-scale');
        card.style.removeProperty('--card-opacity');
        card.style.removeProperty('--card-lift');
        card.style.removeProperty('--card-saturation');
        card.style.removeProperty('z-index');
      });
      return;
    }

    const trackRect = cardsTrack.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let activeCard = null;
    let activeDistance = Number.POSITIVE_INFINITY;

    showcaseCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const thisCardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(thisCardCenter - trackCenter);
      const reach = Math.max(rect.width * 1.2, trackRect.width * 0.32);
      const focus = Math.max(0, 1 - distance / reach);
      const eased = focus * focus * (3 - 2 * focus);

      if (distance < activeDistance) {
        activeDistance = distance;
        activeCard = card;
      }

      card.style.setProperty('--card-scale', (0.68 + eased * 0.37).toFixed(3));
      card.style.setProperty('--card-opacity', (0.42 + eased * 0.58).toFixed(3));
      card.style.setProperty('--card-lift', `${(-8 * eased).toFixed(1)}px`);
      card.style.setProperty('--card-saturation', (0.68 + eased * 0.40).toFixed(3));
      card.style.zIndex = String(Math.round(10 + eased * 100));
      card.classList.remove('is-active');
    });

    if (activeCard) activeCard.classList.add('is-active');
  }

  function requestShowcaseDepth(){
    if (!showcaseFrame) showcaseFrame = window.requestAnimationFrame(updateShowcaseDepth);
  }

  function setShowcaseExpanded(isExpanded, focusCard){
    cardsShowcase.classList.toggle('expanded', isExpanded);
    document.body.classList.toggle('showcase-open', isExpanded);
    cardsShowcase.setAttribute('aria-expanded', String(isExpanded));
    cardsHint.textContent = isExpanded ? 'Swipe / drag through the deck' : 'Click to expand';

    window.requestAnimationFrame(() => {
      if (focusCard) centerShowcaseCard(focusCard, 'auto');
      requestLoopWrap();
      updateShowcaseDepth();
    });
  }

  function bindShowcaseCard(card){
    card.addEventListener('click', event => {
      event.stopPropagation();
      if (suppressClickAfterDrag) return;
      if (!cardsShowcase.classList.contains('expanded')) {
        setShowcaseExpanded(true, card);
        return;
      }
      centerShowcaseCard(card);
    });
  }

  function setupInfiniteShowcase(){
    originalShowcaseCards.forEach((card, index) => {
      card.dataset.cardIndex = String(index);
      card.dataset.loopSet = 'middle';
    });

    const beforeCards = originalShowcaseCards.map((card, index) => {
      const clone = card.cloneNode(true);
      clone.dataset.cardIndex = String(index);
      clone.dataset.loopSet = 'before';
      clone.setAttribute('aria-hidden', 'true');
      return clone;
    });

    const afterCards = originalShowcaseCards.map((card, index) => {
      const clone = card.cloneNode(true);
      clone.dataset.cardIndex = String(index);
      clone.dataset.loopSet = 'after';
      clone.setAttribute('aria-hidden', 'true');
      return clone;
    });

    cardsTrack.prepend(...beforeCards);
    cardsTrack.append(...afterCards);
    showcaseCards = Array.from(cardsTrack.querySelectorAll('.showcase-card'));
    showcaseCards.forEach(bindShowcaseCard);

    window.requestAnimationFrame(() => {
      const firstMiddle = cardsTrack.querySelector('.showcase-card[data-loop-set="middle"][data-card-index="0"]');
      if (firstMiddle) cardsTrack.scrollLeft = firstMiddle.offsetLeft;
      updateShowcaseDepth();
    });
  }

  function setupShowcaseAutoScroll(){
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const tick = now => {
      autoScrollFrame = window.requestAnimationFrame(tick);

      if (!autoScrollLastTime) {
        autoScrollLastTime = now;
        return;
      }

      const elapsed = Math.min(40, Math.max(1, now - autoScrollLastTime));
      autoScrollLastTime = now;

      const shouldAutoScroll = !document.hidden && !isAutoPausedByDrag && !isMomentumGliding;
      cardsTrack.classList.toggle('is-auto-scrolling', shouldAutoScroll);
      if (!shouldAutoScroll) {
        autoScrollRemainder = 0;
        return;
      }

      const isExpanded = cardsShowcase.classList.contains('expanded');
      const motionFactor = reducedMotion.matches ? 0.55 : 1;
      const basePxPerMs = 0.012;
      const sampleCard = getClosestCardToCenter();
      const trackStyles = window.getComputedStyle(cardsTrack);
      const gap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
      const currentStep = sampleCard ? sampleCard.offsetWidth + gap : 82;
      const smallStep = window.matchMedia('(max-width:680px)').matches ? 73 : 82;
      const sizeScale = isExpanded ? Math.max(1, currentStep / smallStep) : 1;
      const pxPerMs = basePxPerMs * sizeScale * motionFactor;
      const desiredMove = autoScrollRemainder + pxPerMs * elapsed;
      const wholePixels = desiredMove > 0 ? Math.floor(desiredMove) : Math.ceil(desiredMove);
      autoScrollRemainder = desiredMove - wholePixels;

      if (!wholePixels) return;

      cardsTrack.scrollLeft += wholePixels;
      applyLoopWrap();
      if (isExpanded) requestShowcaseDepth();
    };

    if (!autoScrollFrame) autoScrollFrame = window.requestAnimationFrame(tick);
  }

  function setupDragScroll(){
    let isPointerDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let lastX = 0;
    let lastMoveTime = 0;
    let releaseVelocity = 0;
    let dragged = false;
    let momentumFrame = null;
    let momentumVelocity = 0;
    let momentumLastTime = 0;

    function stopMomentum(){
      if (momentumFrame) window.cancelAnimationFrame(momentumFrame);
      momentumFrame = null;
      momentumVelocity = 0;
      isMomentumGliding = false;
      cardsTrack.classList.remove('is-momentum-gliding');
    }

    function startMomentum(initialVelocity){
      stopMomentum();

      const maxVelocity = 2.35;
      const minVelocity = 0.075;
      momentumVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, initialVelocity));
      if (Math.abs(momentumVelocity) < minVelocity) return;

      momentumLastTime = performance.now();
      isMomentumGliding = true;
      cardsTrack.classList.add('is-momentum-gliding');

      const glide = now => {
        if (isPointerDown) {
          stopMomentum();
          return;
        }

        const elapsed = Math.min(34, Math.max(1, now - momentumLastTime));
        momentumLastTime = now;

        cardsTrack.scrollLeft += momentumVelocity * elapsed;
        applyLoopWrap();
        if (cardsShowcase.classList.contains('expanded')) requestShowcaseDepth();

        momentumVelocity *= Math.pow(0.948, elapsed / 16.67);

        if (Math.abs(momentumVelocity) < 0.032) {
          momentumFrame = null;
          momentumVelocity = 0;
          isMomentumGliding = false;
          cardsTrack.classList.remove('is-momentum-gliding');
          requestLoopWrap();
          if (cardsShowcase.classList.contains('expanded')) requestShowcaseDepth();
          return;
        }

        momentumFrame = window.requestAnimationFrame(glide);
      };

      momentumFrame = window.requestAnimationFrame(glide);
    }

    cardsShowcase.addEventListener('pointerdown', event => {
      if (event.button !== undefined && event.button !== 0) return;
      if (cardsClose.contains(event.target)) return;
      const isExpanded = cardsShowcase.classList.contains('expanded');
      if (!isExpanded && !cardsTrack.contains(event.target)) return;

      stopMomentum();
      cardsTrack.classList.remove('is-auto-scrolling');
      isPointerDown = true;
      isAutoPausedByDrag = true;
      dragged = false;
      startX = event.clientX;
      lastX = event.clientX;
      lastMoveTime = performance.now();
      releaseVelocity = 0;
      startScrollLeft = cardsTrack.scrollLeft;
      cardsTrack.classList.add('is-dragging');
      cardsShowcase.classList.add('is-dragging');
      if (isExpanded) event.preventDefault();
      try { cardsShowcase.setPointerCapture?.(event.pointerId); } catch (_) {}
    });

    cardsShowcase.addEventListener('pointermove', event => {
      if (!isPointerDown) return;
      const isExpanded = cardsShowcase.classList.contains('expanded');
      const totalDelta = event.clientX - startX;
      const dragSpeed = isExpanded ? 1 : 1.18;
      const now = performance.now();
      const elapsed = Math.max(1, now - lastMoveTime);
      const moveDelta = event.clientX - lastX;

      if (Math.abs(totalDelta) > 2) {
        dragged = true;
        event.preventDefault();
      }

      cardsTrack.scrollLeft = startScrollLeft - totalDelta * dragSpeed;
      const loopShift = applyLoopWrap();
      if (loopShift) startScrollLeft += loopShift;

      const instantVelocity = -(moveDelta / elapsed) * dragSpeed;
      releaseVelocity = releaseVelocity * 0.55 + instantVelocity * 0.45;
      lastX = event.clientX;
      lastMoveTime = now;

      requestShowcaseDepth();
    }, { passive:false });

    const finishDrag = event => {
      if (!isPointerDown) return;
      const allowMomentum = event.type === 'pointerup';
      const timeSinceLastMove = performance.now() - lastMoveTime;

      isPointerDown = false;
      isAutoPausedByDrag = false;
      cardsTrack.classList.remove('is-dragging');
      cardsShowcase.classList.remove('is-dragging');
      try { cardsShowcase.releasePointerCapture?.(event.pointerId); } catch (_) {}
      if (dragged) {
        suppressClickAfterDrag = true;
        window.setTimeout(() => { suppressClickAfterDrag = false; }, 100);
      }

      if (timeSinceLastMove > 90) releaseVelocity *= 0.35;
      if (timeSinceLastMove > 160) releaseVelocity = 0;

      if (allowMomentum && Math.abs(releaseVelocity) > 0.075) {
        startMomentum(releaseVelocity);
      } else {
        requestLoopWrap();
        if (cardsShowcase.classList.contains('expanded')) requestShowcaseDepth();
      }
    };

    cardsShowcase.addEventListener('pointerup', finishDrag);
    cardsShowcase.addEventListener('pointercancel', finishDrag);
  }

  cardsShowcase.addEventListener('click', event => {
    if (suppressClickAfterDrag || event.target === cardsClose || cardsClose.contains(event.target)) return;
    if (!cardsShowcase.classList.contains('expanded')) setShowcaseExpanded(true, getClosestCardToCenter());
  });

  cardsTrack.addEventListener('scroll', () => {
    requestLoopWrap();
    requestShowcaseDepth();
  }, { passive:true });

  window.addEventListener('resize', () => {
    requestLoopWrap();
    requestShowcaseDepth();
  });

  cardsClose.addEventListener('click', event => {
    event.stopPropagation();
    setShowcaseExpanded(false);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setShowcaseExpanded(false);
  });

  setupInfiniteShowcase();
  setupShowcaseAutoScroll();
  setupDragScroll();

  renderCart();
})();
}


function init_how_to_play(){
(function(){
  const PRICE = 19.99;
  const SHIPPING = 5.99;
  const CART_STORAGE_KEY = 'sunriseCartQty';
  function loadCartQty(){
    const savedQty = Number.parseInt(localStorage.getItem(CART_STORAGE_KEY) || '0', 10);
    return Number.isFinite(savedQty) && savedQty > 0 ? savedQty : 0;
  }
  function saveCartQty(){
    if (cartQty > 0) localStorage.setItem(CART_STORAGE_KEY, String(cartQty));
    else localStorage.removeItem(CART_STORAGE_KEY);
  }
  let cartQty = loadCartQty();

  const cartCount = document.querySelector('.cart-count');
  const drawerBody = document.getElementById('drawerBody');
  const drawerFoot = document.getElementById('drawerFoot');
  const drawerSubtotal = document.getElementById('drawerSubtotal');
  const drawerShipping = document.getElementById('drawerShipping');
  const drawerTotal = document.getElementById('drawerTotal');
  const overlay = document.getElementById('overlay');
  const drawer = document.getElementById('drawer');

  function money(n){ return '$' + n.toFixed(2); }
  function renderCart(){
    saveCartQty();
    if (cartCount) cartCount.textContent = cartQty;
    if (cartQty === 0){
      drawerBody.innerHTML = '<div class="drawer-empty">Your cart is empty.<br>Add a deck and stay up with us.</div>';
      drawerFoot.style.display = 'none';
      return;
    }
    const subtotal = PRICE * cartQty;
    const shipping = SHIPPING;
    drawerBody.innerHTML = `
      <div class="drawer-item">
        <div class="thumb"><img src="cards/Dream Catcher.png" alt="" aria-hidden="true"></div>
        <div class="info">
          <h4>Survive 'til Sunrise</h4>
          <div class="meta">${cartQty} × ${money(PRICE)}</div>
          <div class="qty-control glass" style="width:fit-content;">
            <button id="drawerMinus" aria-label="Decrease quantity">−</button>
            <span class="qty-val">${cartQty}</span>
            <button id="drawerPlus" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>`;
    drawerFoot.style.display = 'block';
    drawerSubtotal.textContent = money(subtotal);
    drawerShipping.textContent = money(shipping);
    drawerTotal.textContent = money(subtotal + shipping);
    document.getElementById('drawerPlus').addEventListener('click', () => { cartQty++; renderCart(); });
    document.getElementById('drawerMinus').addEventListener('click', () => { cartQty = Math.max(0, cartQty - 1); renderCart(); });
  }
  function openDrawer(){
    overlay.classList.add('open');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
  }
  function closeDrawer(){
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');
  }

  document.getElementById('cartOpenBtn').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  document.getElementById('checkoutBtn').addEventListener('click', () => alert('Demo store — checkout is not wired to a payment processor'));
  overlay.addEventListener('click', closeDrawer);

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

  const rulesContent = document.getElementById('rulesContent');
  const categoryButtons = document.querySelectorAll('[data-target]');

  const setActiveCategory = targetId => {
    categoryButtons.forEach(item => item.classList.toggle('active', item.dataset.target === targetId));
  };

  const ruleSections = Array.from(document.querySelectorAll('.rule-section'));

  function getRulesScrollTarget(section){
    if (!section) return 0;
    return Math.max(0, section.offsetTop - 18);
  }

  function updateActiveCategory(){
    const maxScroll = rulesContent.scrollHeight - rulesContent.clientHeight;
    if (maxScroll > 0 && rulesContent.scrollTop >= maxScroll - 8) {
      setActiveCategory('winning');
      return;
    }

    const activeSection = ruleSections.reduce((current, section) => {
      const distance = Math.abs(section.offsetTop - rulesContent.scrollTop - 18);
      if (!current || distance < current.distance) return { id: section.id, distance };
      return current;
    }, null);

    if (activeSection) setActiveCategory(activeSection.id);
  }

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const section = document.getElementById(button.dataset.target);
      setActiveCategory(button.dataset.target);
      if (section) {
        const usesPageScroll = window.matchMedia('(max-width:900px)').matches;
        if (usesPageScroll) {
          section.scrollIntoView({ behavior:'smooth', block:'start' });
        } else {
          rulesContent.scrollTo({ top:getRulesScrollTarget(section), behavior:'smooth' });
        }
      }
    });
  });

  rulesContent.addEventListener('scroll', updateActiveCategory, { passive:true });
  window.addEventListener('scroll', () => {
    if (!window.matchMedia('(max-width:900px)').matches) return;
    const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    if (pageBottom) {
      setActiveCategory('winning');
      return;
    }

    const activeSection = ruleSections.reduce((current, section) => {
      const distance = Math.abs(section.getBoundingClientRect().top - 120);
      if (!current || distance < current.distance) return { id: section.id, distance };
      return current;
    }, null);
    if (activeSection) setActiveCategory(activeSection.id);
  }, { passive:true });

  const cardsShowcase = document.getElementById('cardsShowcase');
  const cardsClose = document.getElementById('cardsClose');
  const cardsTrack = cardsShowcase.querySelector('.cards-track');
  const cardsHint = document.getElementById('cardsHint');
  const originalShowcaseCards = Array.from(cardsShowcase.querySelectorAll('.showcase-card'));
  let showcaseCards = [];
  let showcaseFrame = null;
  let loopFrame = null;
  let autoScrollFrame = null;
  let autoScrollLastTime = 0;
  let autoScrollRemainder = 0;
  let isAutoPausedByDrag = false;
  let isMomentumGliding = false;
  let suppressClickAfterDrag = false;

  function cardCenter(card){
    return card.offsetLeft + card.offsetWidth / 2;
  }

  function centerShowcaseCard(card, behavior = 'smooth'){
    cardsTrack.scrollTo({
      left:cardCenter(card) - cardsTrack.clientWidth / 2,
      behavior
    });
  }

  function getClosestCardToCenter(){
    const center = cardsTrack.scrollLeft + cardsTrack.clientWidth / 2;
    return showcaseCards.reduce((closest, card) => {
      const distance = Math.abs(cardCenter(card) - center);
      if (!closest || distance < closest.distance) return { card, distance };
      return closest;
    }, null)?.card || showcaseCards[0];
  }

  function getLoopMetrics(){
    const firstMiddle = cardsTrack.querySelector('.showcase-card[data-loop-set="middle"][data-card-index="0"]');
    const firstAfter = cardsTrack.querySelector('.showcase-card[data-loop-set="after"][data-card-index="0"]');
    if (!firstMiddle || !firstAfter) return null;
    const span = firstAfter.offsetLeft - firstMiddle.offsetLeft;
    if (span <= 0) return null;
    return {
      span,
      leftBoundary:firstMiddle.offsetLeft - cardsTrack.clientWidth / 2,
      rightBoundary:firstAfter.offsetLeft - cardsTrack.clientWidth / 2
    };
  }

  function applyLoopWrap(){
    const metrics = getLoopMetrics();
    if (!metrics) return 0;

    let scrollShift = 0;
    if (cardsTrack.scrollLeft < metrics.leftBoundary) {
      scrollShift = metrics.span;
    } else if (cardsTrack.scrollLeft >= metrics.rightBoundary) {
      scrollShift = -metrics.span;
    }

    if (scrollShift) {
      cardsTrack.scrollLeft += scrollShift;
      updateShowcaseDepth();
    }
    return scrollShift;
  }

  function wrapShowcaseScroll(){
    loopFrame = null;
    applyLoopWrap();
  }

  function requestLoopWrap(){
    if (!loopFrame) loopFrame = window.requestAnimationFrame(wrapShowcaseScroll);
  }

  function updateShowcaseDepth(){
    showcaseFrame = null;
    if (!cardsShowcase.classList.contains('expanded')) {
      showcaseCards.forEach(card => {
        card.classList.remove('is-active');
        card.style.removeProperty('--card-scale');
        card.style.removeProperty('--card-opacity');
        card.style.removeProperty('--card-lift');
        card.style.removeProperty('--card-saturation');
        card.style.removeProperty('z-index');
      });
      return;
    }

    const trackRect = cardsTrack.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let activeCard = null;
    let activeDistance = Number.POSITIVE_INFINITY;

    showcaseCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const thisCardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(thisCardCenter - trackCenter);
      const reach = Math.max(rect.width * 1.2, trackRect.width * 0.32);
      const focus = Math.max(0, 1 - distance / reach);
      const eased = focus * focus * (3 - 2 * focus);

      if (distance < activeDistance) {
        activeDistance = distance;
        activeCard = card;
      }

      card.style.setProperty('--card-scale', (0.68 + eased * 0.37).toFixed(3));
      card.style.setProperty('--card-opacity', (0.42 + eased * 0.58).toFixed(3));
      card.style.setProperty('--card-lift', `${(-8 * eased).toFixed(1)}px`);
      card.style.setProperty('--card-saturation', (0.68 + eased * 0.40).toFixed(3));
      card.style.zIndex = String(Math.round(10 + eased * 100));
      card.classList.remove('is-active');
    });

    if (activeCard) activeCard.classList.add('is-active');
  }

  function requestShowcaseDepth(){
    if (!showcaseFrame) showcaseFrame = window.requestAnimationFrame(updateShowcaseDepth);
  }

  function setShowcaseExpanded(isExpanded, focusCard){
    cardsShowcase.classList.toggle('expanded', isExpanded);
    document.body.classList.toggle('showcase-open', isExpanded);
    cardsShowcase.setAttribute('aria-expanded', String(isExpanded));
    cardsHint.textContent = isExpanded ? 'Swipe / drag through the deck' : 'Click to expand';

    window.requestAnimationFrame(() => {
      if (focusCard) centerShowcaseCard(focusCard, 'auto');
      requestLoopWrap();
      updateShowcaseDepth();
    });
  }

  function bindShowcaseCard(card){
    card.addEventListener('click', event => {
      event.stopPropagation();
      if (suppressClickAfterDrag) return;
      if (!cardsShowcase.classList.contains('expanded')) {
        setShowcaseExpanded(true, card);
        return;
      }
      centerShowcaseCard(card);
    });
  }

  function setupInfiniteShowcase(){
    originalShowcaseCards.forEach((card, index) => {
      card.dataset.cardIndex = String(index);
      card.dataset.loopSet = 'middle';
    });

    const beforeCards = originalShowcaseCards.map((card, index) => {
      const clone = card.cloneNode(true);
      clone.dataset.cardIndex = String(index);
      clone.dataset.loopSet = 'before';
      clone.setAttribute('aria-hidden', 'true');
      return clone;
    });

    const afterCards = originalShowcaseCards.map((card, index) => {
      const clone = card.cloneNode(true);
      clone.dataset.cardIndex = String(index);
      clone.dataset.loopSet = 'after';
      clone.setAttribute('aria-hidden', 'true');
      return clone;
    });

    cardsTrack.prepend(...beforeCards);
    cardsTrack.append(...afterCards);
    showcaseCards = Array.from(cardsTrack.querySelectorAll('.showcase-card'));
    showcaseCards.forEach(bindShowcaseCard);

    window.requestAnimationFrame(() => {
      const firstMiddle = cardsTrack.querySelector('.showcase-card[data-loop-set="middle"][data-card-index="0"]');
      if (firstMiddle) cardsTrack.scrollLeft = firstMiddle.offsetLeft;
      updateShowcaseDepth();
    });
  }

  function setupShowcaseAutoScroll(){
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const tick = now => {
      autoScrollFrame = window.requestAnimationFrame(tick);

      if (!autoScrollLastTime) {
        autoScrollLastTime = now;
        return;
      }

      const elapsed = Math.min(40, Math.max(1, now - autoScrollLastTime));
      autoScrollLastTime = now;

      const shouldAutoScroll = !document.hidden && !isAutoPausedByDrag && !isMomentumGliding;
      cardsTrack.classList.toggle('is-auto-scrolling', shouldAutoScroll);
      if (!shouldAutoScroll) {
        autoScrollRemainder = 0;
        return;
      }

      const isExpanded = cardsShowcase.classList.contains('expanded');
      const motionFactor = reducedMotion.matches ? 0.55 : 1;
      const basePxPerMs = 0.012;
      const sampleCard = getClosestCardToCenter();
      const trackStyles = window.getComputedStyle(cardsTrack);
      const gap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
      const currentStep = sampleCard ? sampleCard.offsetWidth + gap : 82;
      const smallStep = window.matchMedia('(max-width:680px)').matches ? 73 : 82;
      const sizeScale = isExpanded ? Math.max(1, currentStep / smallStep) : 1;
      const pxPerMs = basePxPerMs * sizeScale * motionFactor;
      const desiredMove = autoScrollRemainder + pxPerMs * elapsed;
      const wholePixels = desiredMove > 0 ? Math.floor(desiredMove) : Math.ceil(desiredMove);
      autoScrollRemainder = desiredMove - wholePixels;

      if (!wholePixels) return;

      cardsTrack.scrollLeft += wholePixels;
      applyLoopWrap();
      if (isExpanded) requestShowcaseDepth();
    };

    if (!autoScrollFrame) autoScrollFrame = window.requestAnimationFrame(tick);
  }

  function setupDragScroll(){
    let isPointerDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let lastX = 0;
    let lastMoveTime = 0;
    let releaseVelocity = 0;
    let dragged = false;
    let momentumFrame = null;
    let momentumVelocity = 0;
    let momentumLastTime = 0;

    function stopMomentum(){
      if (momentumFrame) window.cancelAnimationFrame(momentumFrame);
      momentumFrame = null;
      momentumVelocity = 0;
      isMomentumGliding = false;
      cardsTrack.classList.remove('is-momentum-gliding');
    }

    function startMomentum(initialVelocity){
      stopMomentum();

      const maxVelocity = 2.35;
      const minVelocity = 0.075;
      momentumVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, initialVelocity));
      if (Math.abs(momentumVelocity) < minVelocity) return;

      momentumLastTime = performance.now();
      isMomentumGliding = true;
      cardsTrack.classList.add('is-momentum-gliding');

      const glide = now => {
        if (isPointerDown) {
          stopMomentum();
          return;
        }

        const elapsed = Math.min(34, Math.max(1, now - momentumLastTime));
        momentumLastTime = now;

        cardsTrack.scrollLeft += momentumVelocity * elapsed;
        applyLoopWrap();
        if (cardsShowcase.classList.contains('expanded')) requestShowcaseDepth();

        momentumVelocity *= Math.pow(0.948, elapsed / 16.67);

        if (Math.abs(momentumVelocity) < 0.032) {
          momentumFrame = null;
          momentumVelocity = 0;
          isMomentumGliding = false;
          cardsTrack.classList.remove('is-momentum-gliding');
          requestLoopWrap();
          if (cardsShowcase.classList.contains('expanded')) requestShowcaseDepth();
          return;
        }

        momentumFrame = window.requestAnimationFrame(glide);
      };

      momentumFrame = window.requestAnimationFrame(glide);
    }

    cardsShowcase.addEventListener('pointerdown', event => {
      if (event.button !== undefined && event.button !== 0) return;
      if (cardsClose.contains(event.target)) return;
      const isExpanded = cardsShowcase.classList.contains('expanded');
      if (!isExpanded && !cardsTrack.contains(event.target)) return;

      stopMomentum();
      cardsTrack.classList.remove('is-auto-scrolling');
      isPointerDown = true;
      isAutoPausedByDrag = true;
      dragged = false;
      startX = event.clientX;
      lastX = event.clientX;
      lastMoveTime = performance.now();
      releaseVelocity = 0;
      startScrollLeft = cardsTrack.scrollLeft;
      cardsTrack.classList.add('is-dragging');
      cardsShowcase.classList.add('is-dragging');
      if (isExpanded) event.preventDefault();
      try { cardsShowcase.setPointerCapture?.(event.pointerId); } catch (_) {}
    });

    cardsShowcase.addEventListener('pointermove', event => {
      if (!isPointerDown) return;
      const isExpanded = cardsShowcase.classList.contains('expanded');
      const totalDelta = event.clientX - startX;
      const dragSpeed = isExpanded ? 1 : 1.18;
      const now = performance.now();
      const elapsed = Math.max(1, now - lastMoveTime);
      const moveDelta = event.clientX - lastX;

      if (Math.abs(totalDelta) > 2) {
        dragged = true;
        event.preventDefault();
      }

      cardsTrack.scrollLeft = startScrollLeft - totalDelta * dragSpeed;
      const loopShift = applyLoopWrap();
      if (loopShift) startScrollLeft += loopShift;

      const instantVelocity = -(moveDelta / elapsed) * dragSpeed;
      releaseVelocity = releaseVelocity * 0.55 + instantVelocity * 0.45;
      lastX = event.clientX;
      lastMoveTime = now;

      requestShowcaseDepth();
    }, { passive:false });

    const finishDrag = event => {
      if (!isPointerDown) return;
      const allowMomentum = event.type === 'pointerup';
      const timeSinceLastMove = performance.now() - lastMoveTime;

      isPointerDown = false;
      isAutoPausedByDrag = false;
      cardsTrack.classList.remove('is-dragging');
      cardsShowcase.classList.remove('is-dragging');
      try { cardsShowcase.releasePointerCapture?.(event.pointerId); } catch (_) {}
      if (dragged) {
        suppressClickAfterDrag = true;
        window.setTimeout(() => { suppressClickAfterDrag = false; }, 100);
      }

      if (timeSinceLastMove > 90) releaseVelocity *= 0.35;
      if (timeSinceLastMove > 160) releaseVelocity = 0;

      if (allowMomentum && Math.abs(releaseVelocity) > 0.075) {
        startMomentum(releaseVelocity);
      } else {
        requestLoopWrap();
        if (cardsShowcase.classList.contains('expanded')) requestShowcaseDepth();
      }
    };

    cardsShowcase.addEventListener('pointerup', finishDrag);
    cardsShowcase.addEventListener('pointercancel', finishDrag);
  }

  cardsShowcase.addEventListener('click', event => {
    if (suppressClickAfterDrag || event.target === cardsClose || cardsClose.contains(event.target)) return;
    if (!cardsShowcase.classList.contains('expanded')) setShowcaseExpanded(true, getClosestCardToCenter());
  });

  cardsTrack.addEventListener('scroll', () => {
    requestLoopWrap();
    requestShowcaseDepth();
  }, { passive:true });

  window.addEventListener('resize', () => {
    requestLoopWrap();
    requestShowcaseDepth();
  });

  cardsClose.addEventListener('click', event => {
    event.stopPropagation();
    setShowcaseExpanded(false);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setShowcaseExpanded(false);
      closeDrawer();
    }
  });

  setupInfiniteShowcase();
  setupShowcaseAutoScroll();
  setupDragScroll();

  renderCart();
})();
}
