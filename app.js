// 화면 전환 헬퍼
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcome-screen');

  // ① '시작' 버튼 클릭
  document.getElementById('start-button')?.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    showScreen('login-screen');
  });

  // ② '회원가입' 링크 클릭
  document.getElementById('signup-link')?.addEventListener('click', e => {
    e.preventDefault();
    showScreen('signup-screen');
  });

  // ③ 회원가입 이미지 클릭
  const signupImage = document.getElementById('signup-image');
  let clickCount = 0;
  signupImage?.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 1) {
      signupImage.src = 'check.jpg';
    } else if (clickCount === 2) {
      signupImage.src = 'open.jpg';
    } else {
      clickCount = 0;
      signupImage.src = 'signup.jpeg';
      showScreen('login-screen');
    }
  });

  // ④ 로그인 처리
  document.getElementById('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('user-id').value.trim();
    const pw = document.getElementById('user-pw').value.trim();

    if (id === 'test' && pw === '1234') {
      showScreen('main-screen');
      document.querySelector('.bottom-nav')?.classList.remove('hidden');

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          pos => console.log('위치 허용됨:', pos.coords),
          err => console.warn('위치 요청 에러:', err.message)
        );
      } else {
        alert('이 브라우저는 Geolocation을 지원하지 않습니다.');
      }
    } else {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  });

  // ⑤ 정렬 버튼 클릭
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ⑥ 하단 네비게이션
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) showScreen(target);
    });
  });

// ⑦ “내 상품 관리” 버튼 클릭 → my-products-screen 표시
const manageBtn = document.getElementById('manage-products-btn');
if (manageBtn) {
  manageBtn.addEventListener('click', () => {
    showScreen('my-products-screen');
  });
}

// ⑧ “← 뒤로” 버튼 클릭 → mypage-screen으로 돌아가기
const backBtn = document.getElementById('back-to-mypage');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    showScreen('mypage-screen');
  });
}

  // ✅ 빠른 매칭 팝업 열기
  document.querySelector('.quick-match-btn')?.addEventListener('click', () => {
    document.getElementById('matching-popup')?.classList.remove('hidden');
  });

  // ✅ 팝업 닫기
  document.getElementById('close-popup-btn')?.addEventListener('click', () => {
    document.getElementById('matching-popup')?.classList.add('hidden');
  });
});


// ─────────────────────────────────────────────────────────────────
// (이미 작성된 코드 맨 아래에 붙여주세요.)
// ─────────────────────────────────────────────────────────────────


// ⑨ “내 상품 관리” 화면이 활성화된 뒤, 각 상품을 클릭했을 때 상세화면으로 이동
document.querySelectorAll('#my-products-screen .product-item').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.getAttribute('data-product');
    showProductDetail(key);
  });
});

// ⑩ 상세 화면에 정보를 세팅하는 함수
function showProductDetail(key) {
  // ① 상세화면(product-detail-screen)을 맨 앞으로 띄움
  showScreen('product-detail-screen');

  // 세팅할 DOM 요소들
  const imgEl   = document.getElementById('detail-image');
  const nameEl  = document.getElementById('detail-name');
  const priceEl = document.getElementById('detail-price');
  const locEl   = document.getElementById('detail-loc');
  const descEl  = document.getElementById('detail-desc');

  // key에 따라 예시 데이터를 씁니다
  if (key === 'notebook') {
    imgEl.src      = 'notebook.png';
    imgEl.alt      = '노트북 이미지';
    nameEl.textContent  = '노트북';
    priceEl.textContent = '₩40,000(주)';
    locEl.textContent   = '대구 수성구';
    descEl.textContent  = 
      '▶ 16인치 고성능 노트북 (i7‐10750H / RAM 16GB / SSD 512GB)\n' +
      '▶ 외관 깔끔, 사용감 조금 있음\n' +
      '▶ 배터리 잔량 양호, 충전기 포함\n' +
      '▶ 직거래: 수성구 신매동 근처';
  }
  else if (key === 'washer') {
    imgEl.src      = 'washer.png';
    imgEl.alt      = '세탁기 이미지';
    nameEl.textContent  = '세탁기';
    priceEl.textContent = '₩100,000(월)';
    locEl.textContent   = '대구 중구';
    descEl.textContent  = 
      '▶ 7kg 전자동 세탁기\n' +
      '▶ 외관 깔끔, 정상 작동 확인\n' +
      '▶ 직거래: 중구 계산동 근처';
  }
  else {
    // 그 외 키가 잘못 들어왔을 땐 기본 메시지
    imgEl.src      = '';
    imgEl.alt      = '';
    nameEl.textContent  = '등록된 제품이 없습니다';
    priceEl.textContent = '';
    locEl.textContent   = '';
    descEl.textContent  = '상품 정보를 찾을 수 없습니다.';
  }
}

// ⑪ 상세 화면 “← 뒤로” 버튼 클릭 시, 다시 “내 상품 관리” 화면으로
document.getElementById('back-to-my-products')?.addEventListener('click', () => {
  showScreen('my-products-screen');
});
