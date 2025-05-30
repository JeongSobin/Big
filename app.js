document.getElementById('login-form')
  .addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('user-id').value;
    const pw = document.getElementById('user-pw').value;
    // TODO: 실제 로그인 API 호출 로직
    alert(`로그인 시도\n아이디: ${id}\n비밀번호: ${'*'.repeat(pw.length)}`);
  });
