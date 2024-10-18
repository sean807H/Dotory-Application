document.getElementById('registerBtn').addEventListener('click', async function (event) {
    event.preventDefault();  // 기본 제출 동작 방지
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 입력값이 비어있는지 확인
    if (username === "" || password === "" || confirmPassword === "") {
        alert("모든 필드를 입력해주세요.");
        return;
    }

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    alert("회원가입이 완료되었습니다.");
    window.location.href = "login.html";  // login.html로 리디렉션

//     // 회원가입 API 호출
//     try {
//         const response = await fetch('http://localhost:3000/api/register/api/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: username,
//                 password: password
//             })
//         });

//         // 응답이 JSON 형식일 경우만 파싱 시도
//         let result;
//         if (response.headers.get('content-type')?.includes('application/json')) {
//             try {
//                 result = await response.json();
//             } catch (e) {
//                 console.error("응답을 JSON으로 파싱하는 중 오류가 발생했습니다:", e);
//                 alert("서버로부터 예상하지 못한 응답이 왔습니다.");
//                 return;
//             }
//         } else {
//             alert("서버 응답이 올바르지 않습니다.");
//             return;
//         }

//         if (response.ok) {
//             alert(result.message || "회원가입에 성공했습니다.");
//             // 회원가입 성공 후 로그인 페이지로 이동
//             window.location.href = "login.html";
//         } else {
//             alert(result.message || "회원가입에 실패했습니다.");
//         }
//     } catch (error) {
//         console.error("회원가입 중 오류 발생:", error);
//         alert("회원가입 중 오류가 발생했습니다.");
//     }
});
