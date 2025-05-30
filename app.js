// 로그인 폼 제출 처리
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form')
    .addEventListener('submit', e => {
      e.preventDefault();
      const id = document.getElementById('user-id').value;
      const pw = document.getElementById('user-pw').value;
      // TODO: 실제 로그인 API 연동
      alert(`로그인 시도: 아이디=${id}, 비밀번호=${pw}`);
    });
});
