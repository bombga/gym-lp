document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-item a');
  const body = document.body;

  if (!hamburger || !nav) return;

  // メニューの開閉をトグルする関数
  const toggleMenu = () => {
    const isOpen = hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    
    // アクセシビリティ属性の更新
    hamburger.setAttribute('aria-expanded', isOpen);

    // メニュー展開時に背面がスクロールしないように制御
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  };

  // メニューを確実に閉じる関数
  const closeMenu = () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  };

  // ハンバーガーボタンのクリックイベント
  hamburger.addEventListener('click', toggleMenu);

  // メニュー内リンクをクリックした時に自動で閉じる
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // スマホ幅（メニューが開いている時）のみ閉じる処理
      if (hamburger.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  // Escキーを押した時にもメニューを閉じる（PC/キーボード操作時の親切設計）
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
      closeMenu();
    }
  });
});