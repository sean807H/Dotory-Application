document.getElementById('loginBtn').addEventListener('click', async function() {
    // 사용자 입력값 가져오기
    const nickname = document.getElementById('myId').value;
    const member_pw = document.getElementById('myPw').value;
    
    // 메시지를 표시할 요소
    const messageElement = document.getElementById('message');
    
    try {
        // 로그인 API 호출
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: nickname,
                member_pw: member_pw
            })
        });

        // 응답 처리
        const data = await response.json();
        
        if (response.ok) {
            // 로그인 성공
            messageElement.textContent = '로그인 성공';
            messageElement.style.color = 'green';
            // 여기서 추가적인 작업 가능 (ex. 페이지 리디렉션)
        } else {
            // 로그인 실패
            messageElement.textContent = '로그인 실패: ' + data.error;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        // 서버와의 통신 오류
        messageElement.textContent = '서버 오류: 로그인할 수 없습니다.';
        messageElement.style.color = 'red';
    }
});
