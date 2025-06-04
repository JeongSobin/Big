// 화면 전환 헬퍼
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
  // ① '시작' 버튼 → 로그인 화면으로 전환
  document.getElementById('start-button').addEventListener('click', () => {
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
  signupImage.addEventListener('click', () => {
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

  // ④ 로그인 폼 제출 → 메인 화면으로 전환 + 위치 요청
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('user-id').value.trim();
    const pw = document.getElementById('user-pw').value.trim();

    if (id === 'test' && pw === '1234') {
      showScreen('main-screen');

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



    // 마이페이지 버튼 클릭 시 전환
  document.querySelector('.bottom-nav .nav-btn:last-child').addEventListener('click', () => {
    showScreen('mypage-screen');
  });


