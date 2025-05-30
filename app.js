// 화면 전환 유틸
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(id)
    .classList.add('active');
}

// ① DOM 로드 완료 시: 로그인 화면(기본)
//    (login-screen div에 이미 class="screen active" 이므로 따로 호출 필요 없음)

// ② 로그인 처리 & 홈 화면 전환 + 위치 동의 요청
document.getElementById('login-form')
  .addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('user-id').value.trim();
    const pw = document.getElementById('user-pw').value.trim();

    if (id === 'test' && pw === '1234') {
      // 로그인 성공
      showScreen('home-screen');

      // 위치 권한 요청
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
