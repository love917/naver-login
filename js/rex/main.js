let id = document.querySelector('#id')
let error = document.querySelectorAll('.error_next_box')

let pw1 = document.querySelector('#psw1')
let pwImg1 = document.querySelector('#psw1_img1')
let pwMsg = document.querySelector('#alerTxt')

let pw2 = document.querySelector('#pswd2')
let pwImg2 = document.querySelector('#pswd2_img1')

let username = document.querySelector('#name')

let yy = document.querySelector("#yy")
let mm = document.querySelector("#mm")
let dd = document.querySelector("#dd")

let gender = document.querySelector("#gender")

let email = document.querySelector("#email")

let mobile = document.querySelector("#phoneNo")
console.log(error)
//id.addEventListener('focusout',function(){
//    checkId();
//})
id.addEventListener('focusout',checkId)
pw1.addEventListener('focusout', checkPw)
pw2.addEventListener('focusout', comparePw)
username.addEventListener('focusout',checkName)

yy.addEventListener('focusout',isBirthCompleted)
mm.addEventListener('focusout',isBirthCompleted)
dd.addEventListener('focusout',isBirthCompleted)
gender.addEventListener('focusout',function(){
    if(gender.value === "성별"){
        error[5].style.display = "block";
    }else{
        error[5].style.display = "none";

    }
})
email.addEventListener('focusout',isEmailCorrect)
mobile.addEventListener('focusout',checkPhoneNumber)

function checkId(){
    //✨정규식을 만들겠다는 약속 ==> //;
    let idPattern = /^[a-zA-Z0-9_-]{5,20}$/;
    if(id.value === ""){//만약 id가 비어있다면
        error[0].innerHTML="필수 정보입니다."
        error[0].style.display="block";
        error[0].style.color="#f00";
        
    }else if(!idPattern.test(id.value)){//사용자가 만약 잘못 적었다면 
        error[0].innerHTML="5~20자의 영문 소문자, 대문자, 숫자와 특수기호(_),(-)만 사용가능합니다"
        error[0].style.display="block";
        error[0].style.color="#f00";
    }else{
        error[0].innerHTML="멋진 아이디입니다."
        error[0].style.display="block";
        error[0].style.color="#80a600";
    }
}

function checkPw(){
    let pwPattern = /^[a-zA-Z0-9~!@#$%^&*()_+\|><?:{}]{8,16}$/; //--> 정규식

    if(pw1.value === ""){
        error[1].innerHTML = `필수 정보입니다.`;
        error[1].style.display = "block";
        pwMsg.style.display = "none";
        pwImg1.src = "./images/m_icon_not_use.png"//HTML에서 이미지를 호출한다고 생각해야함
    }else if(!pwPattern.test(pw1.value)){//사용자가 정규식대로 적지 않았다면(false)~
        error[1].innerHTML = `8~16자 영문, 대소문자, 숫자, 특수문자를 사용하세요.`;
        error[1].style.display = "block";
        pwMsg.style.display = "block";
        pwMsg.innerHTML = "사용불가";
        pwMsg.style.color = "#f00";//제대로 적고나서 오류가 뜨면 사용불가가 초록색이라서 바꾸는것임
        pwImg1.src = "./images/m_icon_not_use.png"
    }else{
        error[1].style.display = "none";
        pwMsg.innerHTML = "안전";
        pwMsg.style.color = "#03c75a"
        pwMsg.style.display = "block";
        pwImg1.src = "./images/m_icon_safe.png"
    }
    //console.log(pwPattern.test(pw1.value)) --> false, true가 뜸
}

function comparePw(){
    console.log(pw1.value)
    console.log(pw2.value)

    if(pw1.value === pw2.value && pw2.value !== ""){//&& --> or 🍒 ! =="" --> 비어있지 않다면
        pwImg2.src="./img/m_icon_check_enable.png"
        error[2].style.display="none"
       // "../../img/m_icon_check_enable.png"
    }else if(pw1.value !== pw2.value){//달라야 참이다.
        pwImg2.src ="./img/m_icon_check_enable.png"
        error[2].style.display="block";
        error[2].innerHTML="비밀번호가 일치하지 않습니다.";
    }

    if(pw2.value === ""){
        error[2].style.display="block";
        error[2].innerHTML="필수 정보입니다.";
    }
}

function checkName(){
    let namePattern = /[a-zA-Z가-힣]*$/ // *--> 있거나 없거나 많거나
    console.log(namePattern.test(username.value))
    if(username.value === ""){//비어있지 않게 함(indexOf를 이용)
        error[3].style.display="block";
        error[3].innerHTML="필수 정보입니다.";
    }else if(!namePattern.test(username.value) ||
            username.value.indexOf(" ")>-1){
        error[3].style.display="block";
        error[3].innerHTML="한글과 영문 대소문자를 이용하세요(특수기호, 공백 사용 불가)";
    }else{
        error[3].style.display="none";
    }
}

function isBirthCompleted(){
    let yearPttern=/[0-9]{4}/;
    if(!yearPttern.test(yy.value)){//사용자가 잘못 적었다면~
        error[4].style.display = "block";
        error[4].innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
}else{
    error[4].style.display = "none";
    //년도가 맞다면 월 체크 함수
    isMonthCompleted();
}


    function isMonthCompleted(){
        if(mm.value === "월"){
            error[4].style.display = "block";
            error[4].innerHTML = "태어난 월을 선택하세요.";
        }else{
            //년도와 월을 제대로 선택했다면 생일을 체크하는 함수
            isDateCompleted();
        }
    }

    function isDateCompleted(){
        if(dd.value === ""){
            error[4].style.display = "block";
            error[4].innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요.";
        }else{
            //생일 날짜를 1~31사이에 오도록 체크하는 함수
            isBirthRight()
        }
    } 

    function isBirthRight(){
        let datePattern = /\d{1,2}/

        if(!datePattern.test(dd.value) || Number(dd.value) < 1 || Number(dd.value) > 31){
            error[4].style.display = "block";
            error[4].innerHTML = "생년월일을 다시 확인해 주세요.";
        }else{
            //미성년자 구분, 나이체크 함수
            checkAge();
        }
    }

    function checkAge(){
        if(Number(yy.value) < 1910){
            error[4].style.display = "block";
            error[4].innerHTML = "년도를 다시입력하세요.";
        }else if(Number(yy.value)>2024){
            error[4].style.display = "block";
            error[4].innerHTML = "년도를 다시입력하세요.";
        }else{
            error[4].style.display = "none";
        }

        if(Number(yy.value) > 2011 && Number(yy.value) <= 2024){
            error[4].style.display = "block";
            error[4].innerHTML = "만 14세 미만의 어린이는 보호자 동의가 필요합니다.";
        }
    }
}

function isEmailCorrect(){
    //momomimi232@gmail.com
    //donguri@naver.com
    let emailPattern = /[a-zA-Z0-9_]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/;
    if(email.value === ""){
        error[6].style.display = "none"; 
    }else if(!emailPattern.test(email.value)){
        error[6].style.display = "block";
        email.value = null;
        email.focus();
    }else{
        error[6].style.display = "none"; 
    }
    
}

function checkPhoneNumber(){
    //010-5656-7878
    let isPhoneNum = /^([01]{2})[01679]{1}([0-9]){3}/;
    if(mobile.value === ""){
        error[7].style.display = "block";
        error[7].innerHTML = "필수정보입니다.";
    }else if(!isPhoneNum.test(mobile.value)){
        error[7].style.display = "block";
        error[7].innerHTML = "형식에 맞지 않는 번호입니다.";
    }else{
        error[6].style.display = "none"; 
    }
}