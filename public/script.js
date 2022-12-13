
const postViewModal = new bootstrap.Modal(getId('postViewModal'));
const newsListModal = new bootstrap.Modal(getId('newsListModal'));
let newsList;

init()


async function init() {
    await loadLang()
    //파괴자의 날 표시
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    let stDate = new Date(2022, 06, 30);
    let endDate = new Date(year, month, day);
    let btMs = endDate.getTime() - stDate.getTime();
    let btDay = Math.abs(btMs / (1000*60*60*24))
    console.log(btDay)
    getId('dayAfterMade').innerText = i18next.t("contentTextBeforeDayCount") + btDay.toString() + i18next.t("contentTextAfterDayCount")
    //파괴자의 날 계산
    if (btDay % 100 == 0) {
        getId('destroyerDayNotice').classList.remove('d-none');
        getId('destroyerDayNotice').classList.add('show');
        let allElement = document.querySelectorAll("*");
        allElement.forEach((element) => {
            blowUpUI();
        })
    }

    //뉴스 로드

    //파일 읽기
    fetch('./newslist.json')
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        newsList = jsondata;
        newsLoadComplete();
    });
}

function newsLoadComplete() {

    //파일 출력
    if (newsList.length > 0) {
        loadNewsOnCard(0);
        if (newsList.length > 1) {
            loadNewsOnCard(1);
            if (newsList.length > 2) {
                loadNewsOnCard(2);
            }
        }
    }
}

function loadNewsOnCard(num) {
    getId('card-title-' + num).innerText = newsList[num].newsTitle;
    getId('card-text-' + num).innerText = newsList[num].description;
    getId('card-date-' + num).innerText = newsList[num].date;
    getId('viewbutton-' + num).classList.remove('d-none');
}

//Function to shorten code
function getId(id) {
    return document.getElementById(id);
}

function setCookie(cookie_name, value) {
    var cookieValue = cookie_name + "=" + value;
    document.cookie = cookieValue;
}

function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        item = item.replace(' ', '');
        var dic = item.split('=');
        if (key === dic[0]) {
            result = dic[1];
            return true;
        }
    })
    return result;
}

function deleteCookie(key) {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var willCookie = "";
    willCookie = key + "=a;";
    willCookie += "Expires=" + date.toUTCString();
    document.cookie = willCookie;
}

function viewPost(num) {
    getId('postViewModalLabel').innerText = newsList[num].newsTitle;
    getId('postViewModalIframe').src = newsList[num].newsFile;
    postViewModal.show();
}

function loadNewsList() {
    getId('newsListGroup').innerHTML = ""
    newsList.forEach((element, index, array) => {
        getId('newsListGroup').innerHTML += `
        <a class="list-group-item list-group-item-action" onclick="launchPostFromList(${index})">${element.newsTitle}</a>`
    });
    newsListModal.show()
}

function launchPostFromList(num) {
    newsListModal.hide()
    viewPost(num)
}
//Fix

function blowUpUI() {
    let allElement = document.querySelectorAll("*");
    allElement.forEach((element) => {
        element.style.animationDuration = "10s";
        element.style.animationName = "fallui";
        element.style.animationIterationCount = "infinite";
        element.style.animationDelay = "0s";
    })

    setTimeout(() => {
        document.querySelector('body').innerHTML = "<h1>파괴되었습니다</h1>"
    }, 10000);
}

async function loadLang() {
    let koLangData;
    let enLangData;
    //언어를 로드
    await fetch('./languages/ko.json').then(response => {
        return response.json()
    }).then(data => {
        koLangData = data
    })
    await fetch('./languages/en.json').then(response => {
        return response.json()
    }).then(data => {
        enLangData = data
    })
    await i18next.use(i18nextBrowserLanguageDetector).init({
        fallbackLng: 'en',
        debug: true,
        resources: {
            en: {
                translation: enLangData.resource
            },
            ko: {
                translation: koLangData.resource
            }
        }
    })
    //적용
    document.title = i18next.t("webpageTitle")
    getId("headerTitle").innerText = i18next.t("headerTitle")
    getId("headerAboutUs").innerText = i18next.t("headerAbout")
    getId("headerOurHistory").innerText = i18next.t("headerOurHistory")
    getId("headerViewExam").innerText = i18next.t("headerViewExam")
    getId("headerSoftware").innerText = i18next.t("headerSoftware")
    getId("headerSomethingInteresting").innerText = i18next.t("headerSomethingInteresting")
    getId("contentTheDestroyers").innerText = i18next.t("contentTheDestroyers")
    getId("destroyerDayNotice").innerText = i18next.t("contentDayOfTheDestroyers")
    getId("contentRecordOfTheDestroyers").innerText = i18next.t("contentRecordOfTheDestroyers")
    getId("contentShowRecordInList").innerText = i18next.t("contentShowRecordInList")
    getId("viewbutton-0").innerText = i18next.t("contentViewBtn")
    getId("viewbutton-1").innerText = i18next.t("contentViewBtn")
    getId("viewbutton-2").innerText = i18next.t("contentViewBtn")
    getId("examInfo").innerText = i18next.t("contentBecomeAMember")
    getId("contentResultTo").innerHTML = i18next.t("contentResultFileTo")
    getId("contentAdminBtn").innerText = i18next.t("contentAdminBtn")
    getId("contentParticipantBtn").innerText = i18next.t("contentParticipantBtn")
    getId("footerTitle").innerText = i18next.t("webpageTitle")
}

function setLang(langName) {
    setCookie("i18next", langName);
    location.reload();
}

function resetLang() {
    deleteCookie("i18next");
    location.reload();
}


//Blow up - eraser

let blinkInterval;
let cursorStat = false;

function blowUpEraser() {
    getId("blowing").classList.remove('d-none')
    getId("blowing").requestFullscreen()
    getId("cursorLine").focus()
    blinkInterval = setInterval(() => {
        if (cursorStat) {
            getId("cursorLine").innerHTML = "C:\\Windows\\System32>"
            cursorStat = false;
        } else {
            getId("cursorLine").innerHTML = "C:\\Windows\\System32> _"
            cursorStat = true;
        }
    }, 500);
    document.onkeydown = function (e) {
        console.log(e.key)
        if (e.key == "Enter") {
            clearInterval(blinkInterval)
            getId("cursorLine").innerHTML = "<br>C:\\Windows\\System32>"
            document.onkeydown = undefined
            getId("blowerLines").innerHTML += "<tr><td>모든 데이터 삭제를 시작합니다.</td></tr>"
            setTimeout(() => {
                getId("blowerLines").innerHTML += "<tr><td>모든 애플리케이션을 삭제하였습니다.</td></tr>"
                setTimeout(() => {
                    getId("blowerLines").innerHTML += "<tr><td>모든 사용자 데이터를 삭제하였습니다.</td></tr>"
                    
                    setTimeout(() => {
                        getId("blowerLines").innerHTML += "<tr><td>5초뒤 자폭을 하겠습니다.</td></tr>"
                        setTimeout(() => {
                            getId("blowerLines").innerHTML += "<tr><td>시스템 자폭 진행중...</td></tr>"
                            getId("blowImage").classList.remove('d-none')
                            setTimeout(() => {
                                location.href = "/justafun"
                            }, 10000);
                        }, 5000);
                    }, 500);
                }, 500);
            }, 500);
            
        }
    }
}

function somethingFunAtall() {
    let result = confirm("무언가 재미있는것. [확인]을 누르면 1번이 실행되고 [취소]를 누르면 2번이 실행됩니다.")
    if (result) {
        blowUpUI()
    } else {
        blowUpEraser()
    }
}