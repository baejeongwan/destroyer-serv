
//Function to shorten code
function getId(id) {
    return document.getElementById(id);
}

async function loadFile() {
    getId('alertBox').classList.remove('show');
    let file = getId('fileBox').files[0];
    let fileContent = await file.text();
    let JSONFile;
    try {
        JSONFile = JSON.parse(fileContent);
    } catch (error) {
        getId('alertBox').innerText = "파일 오류: 이 파일은 면접 파일이 아닌것 같습니다. (JSON 포맷 에러)";
        getId('alertBox').classList.add('show');
    }
    console.log(JSONFile);
    if (JSONFile.question1 != null || JSONFile.question2 != null || JSONFile.question3 != null || JSONFile.question4 != null || JSONFile.question5 != null) {
        getId('viewBox').innerHTML = `
        ===표시 시작===
        시도 횟수 (브라우저 기준): ${JSONFile.try}<br>
        총점수: ${JSONFile.totalScore}<br>
        전하고 싶은 말: ${JSONFile.question6}<br>
        안내: true는 정답, false는 오답을 의미합니다<br>
        1번: ${JSONFile.question1},<br>
        2번: ${JSONFile.question2},<br>
        3번: ${JSONFile.question3},<br>
        4번: ${JSONFile.question4},<br>
        안내: none은 오답, yes는 예 선택지, no는 아니요 선택지를 의미합니다<br>
        5번: ${JSONFile.question5}<br>
        ===표시 종료===`
    } else {
        getId('alertBox').innerText = "파일 오류: 이 파일은 면접 파일이 아닌것 같습니다. (필요한 정보 누락)";
        getId('alertBox').classList.add('show');
    }
}