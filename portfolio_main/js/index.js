let elev_door = document.querySelectorAll(".door");
let head_display = document.querySelector(".head_display");
let o_or_c = document.querySelectorAll(".o_or_c");



/************************************************************** 페이지 로딩함수 ***************************************************************/
window.onload = () => {
    floor_btn.forEach( v => { // 모든층 버튼 잠금
        v.setAttribute('disabled','true');
    })

    o_or_c.forEach(v=>{ // 열고 닫음 버튼 잠금
        v.setAttribute('disabled','true');
    })


    setTimeout(open_door,4000);
    setTimeout(floor4_arrive,6000); // <-- 4층도착시 실행할 함수 호출

    let window_onload_welcome = () => {
        change_head_display("WELCOME BAEK'S BLOG!"); // <-- 얘가 setTimeout 함수가 안먹고 바로 진입해서 함수로 한번 감싼다음 딜레이 먹인거임
    }

    setTimeout(window_onload_welcome,3000); // 웰컴멘트 3초뒤 띄우기

    setTimeout(() => { // 문열리는 속도 고려해서 문 다 열리면 버튼 잠궈논거 풀어줌
        floor_btn.forEach( (v,i,a) => {
            v.removeAttribute('disabled');
            if(i == a.length-1) { // 4층 버튼 못누르게 막음
                v.setAttribute('disabled','true');
            }
        })
        o_or_c.forEach(v=>{
            v.removeAttribute('disabled');
        })
    },6500);
}
/*********************************************************************************************************************************************/



// 엘리베이터 문 닫기 함수
let close_door = () => { elev_door.forEach( v => v.classList.add('closed')) };

// 엘리베이터 문 열기 함수
let open_door = () => { elev_door.forEach( v => v.classList.remove('closed')) };

//헤드 디스플레이 텍스트 변경 함수
let change_head_display = any_text => head_display.innerHTML = any_text;

// 열림버튼 클릭시
o_or_c[0].addEventListener("click", () => open_door());

//닫힘버튼 클릭시
o_or_c[1].addEventListener("click", () => close_door());



let floor_btn = document.querySelectorAll(".floor_button");
let content_box = document.querySelector(".content_box");
let number_list = document.querySelector(".number_list");
let now_floor_index = 3;// 처음시작 4층이라 index 3
let move_persent = 0; // 처음시작 4층이라 translate 0%



/************************************************************** 층 버튼 클릭시 메인페이지&층 화면 이동 ***************************************************************/
floor_btn.forEach((v,i,a) => {

    v.addEventListener("click", () => { //현재층 버튼 클릭시

        for(let j=0; j<a.length; j++) { // 모든 층버튼 잠금
            a[j].setAttribute('disabled','true');
        }

        o_or_c.forEach(v=>{ // 열고 닫음 버튼 잠금
            v.setAttribute('disabled','true');
        })

        let end_persent = (4-(i+1)) * 25; //도착해야할 translateY % (1층이면 75, 2층이면 50, ...)
        v.style.color = '#B70000';

        let floor_arrive_array = [floor1_arrive,floor2_arrive,floor3_arrive,floor4_arrive]; // 각 층별 실행해야 될 함수를 배열에 담음( 현재층 인덱스랑 맞춰서 뿌림 )
        let floor_leave_array = [floor1_leave,floor2_leave,floor3_leave,floor4_leave]; // 각 층을 떠날때 리셋해줘야 할 함수를 배열에 담음( 현재층 인덱스랑 맞춤 )
        let now_door_class_name = elev_door[0].className; // 문이 열려있는지 닫혀있는지 확인하는 변수

        let move_elevator = () => { // 층 이동하는 함수
            let display_interval = setInterval(() => { // 25%움직이는데 1초걸림

                if(move_persent == end_persent) { // 도착지점 당도하면 실행

                    setTimeout(() => { // 문열리는 속도 고려해서 문 다 열리면 버튼 잠궈논거 풀어줌
                        for(let j=0; j<a.length; j++) {
                            a[j].removeAttribute('disabled');
                            v.setAttribute('disabled','true'); // 현재층은 층버튼 못누르게 막음
                        }
                        o_or_c.forEach(v=>{
                            v.removeAttribute('disabled');
                        })
                    },3500);

                    v.style.color = 'silver';
                    now_floor_index = i;

                    switch(now_floor_index) { // 각 층에 맞게 헤드 전광판 멘트 변경
                        case 3 : change_head_display("WELCOME BAEK'S BLOG!"); break;
                        case 2 : change_head_display("WHO IS IT?"); break;
                        case 1 : change_head_display("ON AIR"); break;
                        case 0 : change_head_display("Catch the bad guy!"); break;
                    }

                    setTimeout(floor_arrive_array[now_floor_index],3500); // 문열리는 시간에 맞춰서 각 층에 맞는 함수 실행!
                    
                    floor_leave_array.forEach((v,i) => { // 현재층 제외 모든층 리셋 함수 실행
                        if(i == now_floor_index) {
                            return; // 현재층은 리셋함수 실행 안함
                        } else {
                            v(); // 나머지 층들만 리셋
                        }
                    })

                    setTimeout(open_door,1000); // 도착끝나고 1초뒤 문열림
                    clearInterval(display_interval);
                };
                content_box.style.transform = `translateY(-${move_persent}%)`;
                number_list.style.transform = `translateY(-${move_persent}%)`;
                move_persent = now_floor_index > i ? ++move_persent: --move_persent; // 윗층에서 아래층갈땐 ++ , 아래층에서 윗층갈땐 --
            },40);
        }
        if(now_door_class_name == 'door left_door closed') { // 문닫혀있으면
            setTimeout(move_elevator,1000); // 엘리베이터 1초 뒤 실행

        } else { // 문열려있으면
            close_door(); // 문 닫아주고
            setTimeout(move_elevator,3000); // 엘리베이터 3초 뒤 실행
        }
    })
})
/*****************************************************************************************************************************************************************/



/********************************************************* 4층으로 진입하면 실행할 함수 **********************************************************/
let text_interval; // 인터벌 함수 담을 변수, 전역으로 빼줘야 다른층갈때 clearInterval로 꺼줄 수 있음

let floor4_arrive = () => {
    let first_text_box = document.querySelector(".first_text_box");
    let text_content = "이번층은 4층, 메인페이지 입니다. 각 층별로 다양하게 준비되어 있으니, 1층까지 느긋하게 구경하고 가시기 바랍니다.";
    let text_index = 0;

    let write_text = () => { // 타자치는 함수
        first_text_box.innerHTML += text_content[text_index];
        if(text_index == 18 || text_index == 39) first_text_box.innerHTML += '<br>';
        text_index++;
        if(text_index == text_content.length) {
            clearInterval(text_interval);
        }
    }
    return text_interval = setInterval(write_text,100); // 0.2초에 1타씩 뿌림
}
/***********************************************************************************************************************************************/



/**************************************************** 4층에서 떠나면 실행할 함수(컨텐츠 리셋) *****************************************************/
let floor4_leave = () => {
    clearInterval(text_interval); // 4층 인터벌함수 꺼버림
    let first_text_box = document.querySelector(".first_text_box");
    first_text_box.innerHTML = '';
    console.log(first_text_box.innerHTML)
}
/**********************************************************************************************************************************************/



/********************************************************* 3층으로 진입하면 실행할 함수 **********************************************************/
let profile_text_interval; // 인터벌 함수 담을 변수, 전역으로 빼줘야 다른층갈때 clearInterval로 꺼줄 수 있음

let floor3_arrive = () => {
    let profile_img = document.querySelector(".profile_img");
    let console_display = document.querySelector(".console_display");
    let flicker_count = 0 // 깜빡거림 카운트

    let flicker_img = () => { // 카운트 30배수일때만 오파시티 다운
        profile_img.style.opacity = flicker_count%30 ? '0.8' : '0.6';
        profile_text_box.style.opacity = flicker_count%30 ? '0.8' : '0.6';
        console_display.style.opacity = flicker_count%30 ? '0.8' : '0.6';
        flicker_count++;
    }

    setInterval(flicker_img,10); // 0.01초마다 카운트 검사

    profile_img.style.height = '200px'; // 이미지 내려가면서 보여짐

    let profile_text_box = document.querySelector(".profile_text");
    let profile_text = `let name = 백석민; let gender = male; let birth_day = new Date(1998, 03, 13); console.log(intro_myself());`;
    let profile_text_index = 0;

    let profile_write_text = () => { // 프로필 타자치는 함수

        profile_text_box.innerHTML += profile_text[profile_text_index];
        if(profile_text_index == 15 || profile_text_index == 34) profile_text_box.innerHTML += '<br>';
        if(profile_text_index == 74) profile_text_box.innerHTML += '<br><br>';
        profile_text_index++;
        if(profile_text_index == profile_text.length) {  // 타자 다쳐짐

            setTimeout(() => { // 타자 다치면 콘솔창에 소개글 출력
                let console_text = document.querySelector('.console_text');
                console_text.style.display = 'block';
            },500);

            clearInterval(profile_text_interval);
        }
    }
    return profile_text_interval = setInterval(profile_write_text,100); // 0.2초에 1타씩 뿌림
}
/***********************************************************************************************************************************************/



/**************************************************** 3층에서 떠나면 실행할 함수(컨텐츠 리셋) *****************************************************/
let floor3_leave = () => {
    clearInterval(profile_text_interval); // 3층 인터벌함수 꺼버림
    let profile_img = document.querySelector(".profile_img");
    profile_img.style.height = '0px';
    let profile_text_box = document.querySelector(".profile_text");
    profile_text_box.innerHTML = "";
    let console_text = document.querySelector('.console_text');
    console_text.style.display = 'none';
}
/**********************************************************************************************************************************************/



/********************************************************* 2층으로 진입하면 실행할 함수 **********************************************************/
let floor2_arrive = () => {
    let display_project = document.querySelector(".display_project");
    let project_text = document.querySelector(".project_text");
    let channel_move_btn = document.querySelectorAll(".channel_move_btn");
    let inner_btn = document.querySelector('.inner_btn');
    let project_link = document.querySelector(".project_link");
    let btn_opacity_count = 0;
    
    let project_background_array = [0,1,2,3,4,5,6]; //프로젝트 사진 인덱스
    let project_text_array = [ //프로젝트 소개 멘트
        '배달의 민족 공식 홈페이지를 클론코딩 하였습니다.',
        '경의선 책거리 축제에 대한 가상의 웹페이지를 만들었습니다.',
        '두 행렬에 대한 덧셈,뺄셈,곱셈을 연산 합니다.',
        '어떤 진수를 입력하여도, 모든 진수로 각각 변환해줍니다.',
        '상환방식에 따른 대출이자를 계산해줍니다.',
        '엘리베이터의 작동방식을 구현하였습니다.',
        '팀프로젝트로 폴바셋 카페의 가상 키오스크를 구현하였습니다.<br>자바스크립트를 담당했습니다.',
    ];
    let project_link_array = [
        'https://seokminbaek.github.io/2022project/%EB%B0%B0%EB%8B%AC%EC%9D%98%EB%AF%BC%EC%A1%B1/html/baemin.html', //배달의민족 클론코딩
        'https://seokminbaek.github.io/2022project/bookStreer_final_ver/bookStreet.html', // 경의선책거리 페이지
        'https://seokminbaek.github.io/2022project/matrix_calculator/matrix.html', // 행렬계산기
        'https://seokminbaek.github.io/2022project/base_converter_final_ver/base_converter.html', // 진수변환기
        'https://seokminbaek.github.io/2022project/interest_calcurator_final/interest.html', // 대출이자 계산기
        'https://seokminbaek.github.io/2022project/Elevator/elevator.html', // 엘리베이터 구현
        'http://pager.kr:3000' // 팀프로젝트 폴바셋 키오스크 (안되면 깃허브 파일 업로드해서 npm run start:dev / localhost:3000으로 들어가주세요!)
    ]
    
    display_project.style.width = '100%';
    display_project.style.backgroundImage = `url('https://raw.githubusercontent.com/SEOKMINBAEK/portfolio/main/portfolio_main/img/project_${project_background_array[0]}.PNG')`;
    project_text.style.visibility = 'visible';
    project_text.innerHTML = project_text_array[0];
    project_link.setAttribute('href',`${project_link_array[0]}`);
    
    
    setInterval(() => { // view 버튼 깜빡거리기
        inner_btn.style.opacity = btn_opacity_count%2 ? 1 : 0.7;
        btn_opacity_count++;
    },500);
    
    let show_project = () => { //프로젝트 출력하는 함수
        display_project.style.backgroundImage = `url('https://raw.githubusercontent.com/SEOKMINBAEK/portfolio/main/portfolio_main/img/project_${project_background_array[0]}.PNG')`; // 사진은 항상 배열[0]만 보여줌
        display_project.style.backgroundSize = 'cover';
        display_project.style.backgroundPosition = 'center';
        project_text.innerHTML = project_text_array[0]; // 프로젝트 맨트는 항상 배열[0]만 보여줌
        project_link.setAttribute('href',`${project_link_array[0]}`); // 프로젝트 링크는 항상 배열[0]만 보여줌
    }
    
    channel_move_btn[0].addEventListener("click", () => { // 뒤로가기 버튼 클릭시 하나씩 뒤로밀림
        project_background_array.unshift(project_background_array.pop());
        project_text_array.unshift(project_text_array.pop());
        project_link_array.unshift(project_link_array.pop());
        show_project();
    })
    
    channel_move_btn[1].addEventListener("click", () => { // 앞으로가기 버튼 클릭시 하나씩 앞으로 밀림
        project_background_array.push(project_background_array.shift());
        project_text_array.push(project_text_array.shift());
        project_link_array.push(project_link_array.shift());
        show_project();
    })
}
/***********************************************************************************************************************************************/



/**************************************************** 2층에서 떠나면 실행할 함수(컨텐츠 리셋) *****************************************************/
let floor2_leave = () => {
    let display_project = document.querySelector(".display_project");
    let project_text = document.querySelector(".project_text");
    project_text.style.visibility = 'hidden';
    display_project.style.width = '0%';
}
/**********************************************************************************************************************************************/



/********************************************************* 1층으로 진입하면 실행할 함수 **********************************************************/
let floor1_start_interval; // 인터벌 함수 담을 변수, 전역으로 빼줘야 다른층갈때 clearInterval로 꺼줄 수 있음
let floor1_end_interval; // 인터벌 함수 담을 변수, 전역으로 빼줘야 다른층갈때 clearInterval로 꺼줄 수 있음
let floor1_arrive = () => {
    let floor1_text = document.querySelector(".floor1_text");

    let start_text_array = `어서오게...
자네를 기다리고 있었네...
이번에 내가 찾고있는 녀석이 있다네...
자네가 그녀석의 흔적을 찾아줬으면 좋겠어.
그녀석의 이름은 백석민.
그녀석의 이메일, 전화번호, 카카오톡 아이디가 필요하다네...
자네같은 실력자라면 두말할 필요 없겠지...
그녀석의 방으로 보내주겠네.
그럼 성공을 빌겠네...`;
    let i = 0;
    let floor1_exit_room = document.querySelector('.floor1_exit_room');
    let news_img = document.querySelector('.news_img');
    
    let floor1_text_start = () => { // 1층 미니게임 시작멘트 치는 함수
        floor1_text.innerHTML += start_text_array[i];
        if( i == 7 || i == 22 || i == 45 || i == 118 || i == 143) floor1_text.innerHTML += '<br>';
        if( i == 69 || i == 83 ||  i == 159) floor1_text.innerHTML += '<br><br>';
        i++;
    
        if(i == start_text_array.length) {
            setTimeout(() => {
                floor1_exit_room.style.opacity = '1'; // 타자 다치면 방 화면 출력
                news_img.style.display = 'block';
            },1000);
            clearInterval(floor1_start_interval);
        }
    };

    floor1_start_interval = setInterval(floor1_text_start,100);

    $(".news_img").on('click', () => {  // 신문 클릭하면
        $(".news_img").off('click');    // 중복클릭과 1층 재진입시 이벤트 중복실행을 방지 ( 그래서 jquery 사용함 )
        news_img.style.display = 'none';
        let news_open_box = document.querySelector(".news_open_box");
        news_open_box.style.width = '700px'; // 신문 펼침
        floor1_text.innerHTML = '';
        setTimeout(() => { // 1초후 다시 펭귄 멘트 화면 출력
            floor1_exit_room.style.opacity = '0';
        },1000)

        setTimeout(() => { // 1층 미니게임 마무리멘트 치는 함수
            let i=0;
            let end_text_array = `역시 명성에 걸맞는 실력이군...
드디어 녀석을 잡을 수 있겠어...
한가지만 더 부탁해도 되겠나?
자네가 녀석을 불러줬으면 좋겠군.
녀석의 연락처는 010-9197-5275,
gatsby3130@gmail.com,
카카오톡아이디 gatsby3130이야.

녀석을 꼭 잡을 수 있도록 도와주게나...`;

            let floor1_text_end = () => {
                floor1_text.innerHTML += end_text_array[i];
                if( i == 18 || i == 54 || i == 98 || i == 119) floor1_text.innerHTML += '<br>';
                if( i == 37 || i == 73 || i == 141) floor1_text.innerHTML += '<br><br>';
                i++;
            
                if(i == end_text_array.length) {
                    clearInterval(floor1_end_interval);
                }
            };
            floor1_end_interval = setInterval(floor1_text_end,100);
        },5000);
    })
}
/***********************************************************************************************************************************************/



/**************************************************** 1층에서 떠나면 실행할 함수(컨텐츠 리셋) *************************************************/
let floor1_leave = () => {
    clearInterval(floor1_start_interval); // 1층 인터벌함수 꺼버림
    clearInterval(floor1_end_interval); // 1층 인터벌함수 꺼버림
    let floor1_text = document.querySelector(".floor1_text");
    let floor1_exit_room = document.querySelector('.floor1_exit_room');
    let news_open_box = document.querySelector(".news_open_box");

    floor1_text.innerHTML = '';
    floor1_exit_room.style.opacity = '0';
    news_open_box.style.width = '0px';
}
/**********************************************************************************************************************************************/
