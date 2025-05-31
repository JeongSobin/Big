// 화면 전환 헬퍼
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}


// DOMContentLoaded 시점에 이벤트 바인딩
window.addEventListener('DOMContentLoaded', () => {
  // ① '시작' 버튼 → 로그인 화면 전환
  document.getElementById('start-button').addEventListener('click', () => {
    showScreen('login-screen');
  });

  // ② '회원가입' 링크 클릭 → 회원가입 화면(signup-screen) 전환
  document.getElementById('signup-link').addEventListener('click', e => {
    e.preventDefault();
    showScreen('signup-screen');
  });

  // ③ '회원가입 이미지' 클릭 → 로그인 화면으로 돌아가기
  document.getElementById('signup-image').addEventListener('click', () => {
    showScreen('login-screen');
  });
    .addEventListener('submit', e => {
      e.preventDefault();
      const id = document.getElementById('user-id').value.trim();
      const pw = document.getElementById('user-pw').value.trim();

      if (id === 'test' && pw === '1234') {
        // 홈(메인) 화면으로 전환
        showScreen('main-screen');

        // 위치 권한 요청
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
});
