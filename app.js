// 화면 전환 헬퍼
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

// ↓↓↓ 여기에 doLoginSuccess() 함수를 추가합니다.
function doLoginSuccess() {
  // 메인 화면으로 전환 + 하단 네비게이션 보이기 + 위치 요청
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
}

function showProductDetail(key) {
  showScreen('product-detail-screen');

  const imgEl   = document.getElementById('detail-image');
  const nameEl  = document.getElementById('detail-name');
  const priceEl = document.getElementById('detail-price');
  const locEl   = document.getElementById('detail-loc');
  const descEl  = document.getElementById('detail-desc');

  if (key === 'notebook') {
    imgEl.src = 'notebook.png';
    imgEl.alt = '노트북 이미지';
    nameEl.textContent  = '노트북';
    priceEl.textContent = '₩40,000(주)';
    locEl.textContent   = '대구 수성구';
    descEl.textContent  =
      '▶ 16인치 고성능 노트북 (i7-10750H / RAM 16GB / SSD 512GB)\n' +
      '▶ 외관 깔끔, 사용감 조금 있음\n' +
      '▶ 배터리 성능 양호, 충전기 포함, RAM 16GB\n' +
      '▶ 직거래: 수성구 범어동 근처';
  } else if (key === 'camping') {
    imgEl.src = 'camping.png';
    imgEl.alt = '캠핑용품 이미지';
    nameEl.textContent  = '캠핑용품';
    priceEl.textContent = '₩60,000';
    locEl.textContent   = '대구 중구';
    descEl.textContent  =
      '▶ 최신식 풀세트 캠핑용품\n' +
      '▶ 외관 깔끔, 최대 6인 텐트, 테이블 오염 주의 부탁드려요~!\n' +
      '▶ 직거래: 중구 계산동 근처';
  } else {
    imgEl.src = '';
    imgEl.alt = '';
    nameEl.textContent  = '알 수 없는 제품';
    priceEl.textContent = '';
    locEl.textContent   = '';
    descEl.textContent  = '등록된 정보가 없습니다.';
  }
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

  // ③ 회원가입 이미지 클릭 → check → open → 자동로그인
  const signupImage = document.getElementById('signup-image');
  let clickCount = 0;
  signupImage?.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 1) {
      signupImage.src = 'check.jpg';
    } else if (clickCount === 2) {
      signupImage.src = 'open.jpg';
    } else {
      // 3회 클릭된 시점에 자동로그인 처리
      clickCount = 0;
      signupImage.src = 'signup.jpeg';
      doLoginSuccess();
    }
  });

  // ④ 로그인 처리
  document.getElementById('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('user-id').value.trim();
    const pw = document.getElementById('user-pw').value.trim();

    if (id === 'test' && pw === '1234') {
      doLoginSuccess();
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

  // ⑦ 내 상품 관리 버튼 클릭
  const manageBtn = document.getElementById('manage-products-btn');
  manageBtn?.addEventListener('click', () => {
    showScreen('my-products-screen');
  });

  // ⑧ “← 뒤로” 버튼 클릭 → mypage-screen으로
  const backBtn = document.getElementById('back-to-mypage');
  backBtn?.addEventListener('click', () => {
    showScreen('mypage-screen');
  });

  // ✅ 빠른 매칭 팝업 열기
  document.querySelector('.quick-match-btn')?.addEventListener('click', () => {
    document.getElementById('matching-popup')?.classList.remove('hidden');
  });

  // ✅ 팝업 닫기
  document.getElementById('close-popup-btn')?.addEventListener('click', () => {
    document.getElementById('matching-popup')?.classList.add('hidden');
  });

  // ⑨ 내 상품 목록에서 아이템 클릭 → 상세화면
  document.querySelectorAll('#my-products-screen .product-item').forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-product');
      showProductDetail(key);
    });
  });

  // 🔙 상세 화면 → 내 상품 관리로 돌아가기
  document.getElementById('back-to-my-products')?.addEventListener('click', () => {
    showScreen('my-products-screen');
  });
});

// 현재 선택된 제품 종류
let currentProductType = "노트북"; // 기본값: 노트북

// QR 이미지 요소
const qrImage = document.getElementById("qr-image");

// "QR코드 보기" 버튼 클릭 시
document.getElementById("show-qr").addEventListener("click", () => {
  if (currentProductType === "노트북") {
    qrImage.src = "send.png"; // 노트북은 send.png
  } else if (currentProductType === "캠핑용품") {
    qrImage.src = "Camp.png"; // 캠핑용품은 Camp.png
  } else {
    qrImage.src = "send.png"; // 기본 이미지
  }

  qrImage.style.display = "block"; // 이미지 보여주기
});

// 이미지 클릭 시 실제 QR로 바꾸기
qrImage.addEventListener("click", () => {
  if (currentProductType === "노트북") {
    qrImage.src = "noteqr.png";
  } else if (currentProductType === "캠핑용품") {
    qrImage.src = "campqr.png";
  } 
});


