// 서비스 워커 등록
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

// showScreen 함수
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// ① DOMContentLoaded: 3초 뒤 로그인으로
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => showScreen('login-screen'), 3);
});

// ② 로그인 처리
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('user-id').value;
  const pw = document.getElementById('user-pw').value;
  if (id === 'test' && pw === '1234') {
    alert('로그인 성공!');
    showScreen('home-screen');
    history.pushState({screen:'home'}, '', '#home');
    // 위치 권한 요청 예시
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => console.log(pos.coords),
        err => console.warn(err)
      );
    }
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
});

// ③ 홈<->설정 화면 전환
document.getElementById('goto-settings').addEventListener('click', () => {
  showScreen('settings-screen');
  history.pushState({screen:'settings'}, '', '#settings');
});
document.getElementById('goto-home').addEventListener('click', () => {
  showScreen('home-screen');
  history.pushState({screen:'home'}, '', '#home');
});

// 뒤로가기 이벤트
window.addEventListener('popstate', e => {
  const s = e.state?.screen || 'login';
  showScreen(s + '-screen');
});
