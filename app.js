// 1) 스플래시 화면 띄우기 & 3초 뒤에 로그인 화면으로 전환
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const login = document.getElementById('login-screen');

  // 3초 뒤에 스플래시 숨기고 로그인 보이기
  setTimeout(() => {
    splash.classList.add('hidden');
    login.classList.remove('hidden');
  }, 3000);
});

// 2) 로그인 폼 처리 (여기서는 단순 예시)
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('user-id').value;
  const pw = document.getElementById('user-pw').value;

  // TODO: 실제 인증 로직 필요 (예: 서버 요청)
  if (id === 'test' && pw === '1234') {
    alert('로그인 성공!');
    // 로그인 후 다음 화면으로 이동하거나 토큰 저장 등 처리
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
});
