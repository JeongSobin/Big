// 화면 전환 헬퍼
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ① 로그인 처리
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form')
    .addEventListener('submit', e => {
      e.preventDefault();
      const id = document.getElementById('user-id').value.trim();
      const pw = document.getElementById('user-pw').value.trim();

      if (id === 'test' && pw === '1234') {
        // 홈(메인) 화면으로 전환
        showScreen('main-screen');

        // 위치 권한 요청
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            pos => {
              // 요청 성공했을 때, 위도/경도 화면에 표시
              document.getElementById('user-location').textContent =
                `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            },
            err => {
              document.getElementById('user-location').textContent =
                '위치 권한 거부됨';
            }
          );
        } else {
          document.getElementById('user-location').textContent =
            'GPS 지원 안 함';
        }
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    });
});
