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
function showProductDetail(key) {
  // 상세 화면 띄우기
  showScreen('product-detail-screen');

  // 요소 가져오기
  const imgEl   = document.getElementById('detail-image');
  const nameEl  = document.getElementById('detail-name');
  const priceEl = document.getElementById('detail-price');
  const locEl   = document.getElementById('detail-loc');
  const descEl  = document.getElementById('detail-desc');

  // key에 따라 정보 세팅
  if (key === 'notebook') {
    imgEl.src      = 'notebook.png';
    imgEl.alt      = '노트북 이미지';
    nameEl.textContent  = '노트북';
    priceEl.textContent = '₩40,000(주)';
    locEl.textContent   = '대구 수성구';
    descEl.textContent  =
      '▶ 16인치 고성능 노트북 (i7-10750H / RAM 16GB / SSD 512GB)\n' +
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
    // 이외의 key일 때
    imgEl.src      = '';
    imgEl.alt      = '';
    nameEl.textContent  = '알 수 없는 제품';
    priceEl.textContent = '';
    locEl.textContent   = '';
    descEl.textContent  = '등록된 정보가 없습니다.';
  }
}

// … 중략 …

// 클릭 시 키를 넘겨주는 부분
document.querySelectorAll('#my-products-screen .product-item').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.getAttribute('data-product');
    showProductDetail(key);
  });
});

