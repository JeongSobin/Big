// 화면 전환 헬퍼
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
 const welcomeScreen = document.getElementById('welcome-screen');

  // ① '시작' 버튼 클릭 → welcome-screen을 완전히 숨기고 로그인으로 전환
 document.getElementById('start-button').addEventListener('click', () => {
    // 웰컴 화면 자체를 display: none; 처리
    welcomeScreen.style.display = 'none';
    // 그리고 로그인 화면에 active 붙여서 표시
    showScreen('login-screen');
  });

  // ② '회원가입' 링크 클릭 → signup-screen으로 전환
  document.getElementById('signup-link').addEventListener('click', e => {
    e.preventDefault();
    showScreen('signup-screen');
  });

  // ③ 회원가입 이미지 클릭 → check → open → 로그인으로 전환
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

  // ④ 로그인 폼 제출 → 메인 화면 전환 + 위치 요청 + 하단 네비게이션 표시
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('user-id').value.trim();
    const pw = document.getElementById('user-pw').value.trim();

    if (id === 'test' && pw === '1234') {
      showScreen('main-screen');

      // ✅ 로그인 성공 시 하단 메뉴 보이기
      document.querySelector('.bottom-nav').classList.remove('hidden');

      // 위치 정보 요청
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

  // 메인 화면 정렬 버튼 클릭 시 active 상태 토글
document.querySelectorAll('.sort-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // 모든 버튼에서 active 해제
    document.querySelectorAll('.sort-btn').forEach(x => x.classList.remove('active'));
    // 클릭된 버튼에 active 추가
    btn.classList.add('active');

    // (여기에서 실제 정렬 기능을 추가할 수도 있음)
    // 예: if (btn.textContent === '거리순') { sortByDistance(); }
  });
});
  
  // ✅ 하단 네비게이션 버튼 클릭 시 해당 화면으로 전환
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) {
        showScreen(target);
      }
    });
  });
});


  // ========================================
  // ⑦ “내 상품 관리” 버튼 클릭 → my-products-screen 표시
  // ========================================
const manageBtn = document.getElementById('manage-products-btn');
 if (manageBtn) {
   manageBtn.addEventListener('click', () => {
     showScreen('my-products-screen');
    });
  }

  // ========================================
  // ⑧ “← 뒤로” 버튼 클릭 → mypage-screen으로 돌아가기
  // ========================================
const backBtn = document.getElementById('back-to-mypage');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    showScreen('mypage-screen');
  });
}


// ✅ 빠른 매칭 버튼 누르면 팝업 열기
document.querySelector('.quick-match-btn')?.addEventListener('click', () => {
  document.getElementById('matching-popup').classList.remove('hidden');
});

// ✅ 팝업 닫기 버튼
document.getElementById('close-popup-btn')?.addEventListener('click', () => {
  document.getElementById('matching-popup').classList.add('hidden');
});


