document.addEventListener('DOMContentLoaded', () => {
  // (1) 스플래시를 2초 동안 보여주고
  setTimeout(() => {
    document.getElementById('splash-screen').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
  }, 2000);

  // (2) 로그인 폼 제출 이벤트 처리 (테스트용)
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('user-id').value;
    const pw = document.getElementById('user-pw').value;
    // 실제 로그인 로직은 여기에 추가
    alert(`로그인 시도: 아이디=${id}, 비밀번호=${pw}`);
  });
});
