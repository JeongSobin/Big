document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('user-id').value.trim();
  const pw = document.getElementById('user-pw').value.trim();

  // TODO: 실제 인증 로직으로 교체하세요
  if (id === 'test' && pw === '1234') {
    alert('로그인 성공!');
    // 로그인 성공 후 처리 (페이지 이동, 토큰 저장 등)
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
});
