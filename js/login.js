document.getElementById('loginBtn').addEventListener('click', async function (event) {
    event.preventDefault();  // 기본 제출 동작 방지
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 입력값이 비어있는지 확인
    if (username === "" || password === "") {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }

    alert("로그인이 성공했습니다.");
    window.location.href = "home.html";  // home.html로 리디렉션

    // // 로그인 API 호출
    // try {
    //     const response = await fetch('/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: username,
    //             password: password
    //         })
    //     });

    //     const result = await response.json();

    //     if (response.ok) {
    //         alert("로그인이 성공했습니다.");
    //         // home.html로 이동
    //         window.location.href = "home.html";
    //     } else {
    //         alert(result.message || "로그인에 실패했습니다.");
    //     }
    // } catch (error) {
    //     console.error("로그인 중 오류 발생:", error);
    //     alert("로그인 중 오류가 발생했습니다.");
    // }
});