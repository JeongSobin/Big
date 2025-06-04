document.addEventListener('DOMContentLoaded', () => {
  alert("JS 연결 성공!");

  const btn = document.getElementById('start-button');
  if (btn) {
    btn.addEventListener('click', () => {
      alert("시작 버튼 클릭됨!");
    });
  } else {
    alert("start-button 요소를 찾을 수 없음");
  }
});
