// 화면 전환 헬퍼 함수: id에 해당하는 스크린만 active로 만들고, 나머지는 모두 숨김
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
  // ① '시작' 버튼 클릭 → 로그인 화면 전환
  document.getElementById('start-button').addEventListener('click', () => {
    showScreen('login-screen');
  });

  // ② '회원가입' 링크 클릭 → signup-screen으로 전환
  document.getElementById('signup-link').addEventListener('click', e => {
    e.preventDefault();          // a태그 기본 동작 막기
    showScreen('signup-screen');
  });

  // ③ '회원가입 이미지' 클릭 → 다시 로그인 화면으로 전환
  document.getElementById('signup-image').addEventListener('click', () => {
    showScreen('login-screen');
  });

  // ④ 로그인 폼 제출 → main-screen으로 전환 + 위치 권한 요청
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();   // 폼 기본 제출 동작 막기

    const id = document.getElementById('user-id').value.trim();
    const pw = document.getElementById('user-pw').value.trim();

    if (id === 'test' && pw === '1234') {
      showScreen('main-screen');

      // 위치 권한 요청 (예시)
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
});
