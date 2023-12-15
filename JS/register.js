// $.ajax({ //jquery ajax
//     type:"get", //get방식으로 가져오기
//     url:"data.json", //값을 가져올 경로
//     data: "전송할 데이터", //전송할 데이터 입력
//     dataType:"json", //html, xml, text, script, json, jsonp 등 다양하게 쓸 수 있음
//     success: function(data){   //요청 성공시 실행될 메서드
//         console.log("통신성공");
//     },
//     error:function(){		 //요청 실패시 에러 확인을 위함
//         console.log("통신에러");
//     }
// })


// 모달 창
var modal = document.getElementById('myModal1');

// 모달을 열기 위한 버튼
var button = document.getElementById('button-addon2');

// 모달을 닫기 위한 닫기 버튼
var closeBtn = document.getElementsByClassName('close')[0];

// "식별코드검색" 버튼 클릭 시 모달 열기
button.onclick = function() {
    modal.style.display = 'block';
};

// 모달 닫기 버튼 클릭 시 모달 닫기
closeBtn.onclick = function() {
    modal.style.display = 'none';
};

// 취소하기 버튼 클릭 시 모달 닫기
cancelleaders.onclick = function() {
    modal.style.display = 'none';
};

$.ajax({
    url: "https://jbeteacherstytem-dev.azurewebsites.net/api/leaders",
    type: "get",
    dataType: "json",
    success: function(result) {
        var str = '';
        $.each(result, function(i, item) {
            var number = i + 1;
            str += '<tr><td>' + number + '</td><td>' + result[i].leaderName + '</td><td>' + result[i].leaderNO + '</td></tr>';
        });
        $('.leaderTable_body').append(str);

        // 총 지도자 수를 가져와서 표시
        var totalLeaders = result.length;
        $('#totalLeaders').text('총 ' + totalLeaders + '명');

        // 선택된 리더의 식별코드
        var selectedLeaderCode = null;

        // 클릭 이벤트
        $('.leaderTable_body tr').on('click', function() {
            $('.leaderTable_body tr').css('background-color', '');
            $(this).css('background-color', '#F9F9F9');

            // 선택된 리더의 식별코드 가져오기
            selectedLeaderName = $(this).find('td:eq(1)').text();
            selectedLeaderCode = $(this).find('td:eq(2)').text();
        });

        // 등록하기 버튼 클릭 이벤트
        $('#registerleaders').on('click', function() {
            if (selectedLeaderCode) {
                // 가져온 식별코드를 입력란에 넣기
                $('#code-heading input').val(selectedLeaderCode);
                $('#name-heading input').val(selectedLeaderName);
                modal.style.display = 'none';
            } else {
                openregisterPopup1();
            }
        });

        // 팝업 창 열기
        function openregisterPopup1() {

            // 팝업 열기
            var popup = document.getElementById('registerPopup1');
            popup.style.display = 'block';

            // 확인 버튼 클릭
            document.querySelector('#registerPopup1 .confirm').addEventListener('click', function() {
                
                popup.style.display = 'none';
            });
        }
    },
    error: function(xhr, status, error) {
        console.log("통신에러");
    }
});


// 모달 검색 기능
function searchLeaderCode() {
    var inputText = $('#leaderCodeInput').val(); // #leaderCodeInput ID를 가진 입력란에서 값을 가져와 inputText 변수에 저장

    $.ajax({
        url: "https://jbeteacherstytem-dev.azurewebsites.net/api/leaders",
        type: "get",
        dataType: "json",
        data: { keyword: inputText }, // keyword이라는 키에 inputText라는 변수의 값을 할당
        success: function(result) {

            // 필터링된 결과
            var LeaderfilteredResult = result.filter(function (item) {
                return item.leaderName.includes(inputText);
            });

            var str = '';

            $.each(LeaderfilteredResult, function(i, item) {
                var number = i + 1;
                str += '<tr><td>' + number + '</td><td>' + item.leaderName + '</td><td>' + item.leaderNO + '</td></tr>';
            });

            if (str !== '') {
                $('.leaderTable_body').html(str); // 선택된 요소의 내용을 지정된 문자열 str로 설정
            } else {
                $('.leaderTable_body').html('<tr><td colspan="3">검색된 결과가 없습니다.</td></tr>');
            }

            // 업데이트된 지도자 수
            var totalLeaders = LeaderfilteredResult.length;
            $('#totalLeaders').text('총 ' + totalLeaders + '명');

            // 클릭 이벤트
            $('.leaderTable_body tr').on('click', function() {
                $('.leaderTable_body tr').css('background-color', '');
                $(this).css('background-color', '#F9F9F9');

                 // 선택된 리더의 식별코드, 이름 가져오기
                selectedLeaderCode = $(this).find('td:eq(2)').text(); 
                selectedLeaderName = $(this).find('td:eq(1)').text();  
            });

            // 등록하기 버튼 클릭 이벤트
            $('#registerleaders').on('click', function() {
                if (selectedLeaderCode) {
                    // 가져온 식별코드를 입력란에 넣기
                    $('#code-heading input').val(selectedLeaderCode);
                    $('#name-heading input').val(selectedLeaderName);

                    modal.style.display = 'none';
                } else {
                    openregisterPopup1();
                }
            });
        },
        error: function(xhr, status, error) {
            console.log("통신에러");
        }
    });
}


// -------------------------------------------------

// 모달 창
var modal2 = document.getElementById('myModal2');

// 모달을 열기 위한 버튼
var button2 = document.getElementById('button-addon3');

// 모달을 닫기 위한 닫기 버튼
var closeBtn2 = modal2.querySelector('.close');

// "학교 식별코드검색" 버튼 클릭 시 모달 열기
button2.onclick = function() {
    modal2.style.display = 'block';
};

// 모달 닫기 버튼 클릭 시 모달 닫기
closeBtn2.onclick = function() {
    modal2.style.display = 'none';
};

// 취소 버튼 클릭 시 모달 닫기
cancelSchool.onclick = function() {
    modal2.style.display = 'none';
};

// 학교 식별코드를 검색하는 함수
function searchSchoolCode() {
    var schoolCode = document.getElementById('schoolCodeInput').value;
    if (schoolCode.trim() !== '') {
        alert('검색 로직을 수행 학교명: ' + schoolCode);
        modal2.style.display = 'none';
    } else {
        alert('학교명을 입력해주세요.');
    }
}

// 모달 검색 기능
function searchSchoolCode() {
    var inputText = $('#schoolCodeInput').val(); // #schoolCodeInput ID를 가진 입력란에서 값을 가져와 inputText 변수에 저장
    
    $.ajax({
        url: "https://jbeteacherstytem-dev.azurewebsites.net/api/schools",
        type: "get",
        dataType: "json",
        data: { keyword: inputText }, // keyword이라는 키에 inputText라는 변수의 값을 할당
        success: function(result) {

            // 필터링된 결과
            var SchoolfilteredResult = result.filter(function (item) {
                return item.schoolName.includes(inputText);
            });

            var str = '';

            $.each(SchoolfilteredResult, function(i, item) {
                var number = i + 1;
                str += '<tr><td>' + number + '</td><td>' + item.schoolName + '</td></tr>';
            });

            if (str !== '') {
                $('.schoolTable_body').html(str); // 선택된 요소의 내용을 지정된 문자열 str로 설정
            } else {
                $('.schoolTable_body').html('<tr><td colspan="3">검색된 결과가 없습니다.</td></tr>');
            }

            // 총 학교 수를 가져와서 표시
            var totalSchools = SchoolfilteredResult.length;
            $('#totalSchool').text('총 ' + totalSchools + '개');

            // 클릭 이벤트
            $('.schoolTable_body tr').on('click', function() {
                $('.schoolTable_body tr').css('background-color', '');
                $(this).css('background-color', '#F9F9F9'); 

                // 선택된 학교의 식별코드 가져오기
                selectedSchoolCode = $(this).find('td:eq(1)').text();
            });

            // 등록하기 버튼 클릭 이벤트
            $('#registerSchool').on('click', function() {
                if (selectedSchoolCode) {
                    // 가져온 식별코드를 입력란에 넣기
                    $('#school-heading input').val(selectedSchoolCode);
                    modal2.style.display = 'none';
                } else {
                    // 클릭하지 않고 등록하기 버튼을 누른 경우
                    openregisterPopup2();
                }
            });
        },
        error: function(xhr, status, error) {
            console.log("통신에러");
        }
    });
}

$.ajax({
    url: "https://jbeteacherstytem-dev.azurewebsites.net/api/schools",
    type: "get",
    dataType: "json",
    success: function(result) {
        var str = '';
        $.each(result, function(i, item) {
            var number = i + 1;
            str += '<tr><td>' + number + '</td><td>' + result[i].schoolName + '</td></tr>';
        });
        $('.schoolTable_body').append(str);

        // 총 학교 수를 가져와서 표시
        var totalSchools = result.length;
        $('#totalSchool').text('총 ' + totalSchools + '개');

        // 선택된 학교의 식별코드
        var selectedSchoolCode = null;

        // 학교 행 클릭 이벤트
        $('.schoolTable_body tr').on('click', function() {
            $('.schoolTable_body tr').css('background-color', '');
            $(this).css('background-color', '#F9F9F9');

            // 선택된 학교의 식별코드 가져오기
            selectedSchoolCode = $(this).find('td:eq(1)').text();
        });

        // 등록하기 버튼 클릭 이벤트
        $('#registerSchool').on('click', function() {
            if (selectedSchoolCode) {
                // 가져온 식별코드를 입력란에 넣기
                $('#school-heading input').val(selectedSchoolCode);
                modal2.style.display = 'none';
            } else {
                // 클릭하지 않고 등록하기 버튼을 누른 경우
                openregisterPopup2();
            }
        });
        // 팝업 창 열기
        function openregisterPopup2() {

            // 팝업 열기
            var popup = document.getElementById('registerPopup2');
            popup.style.display = 'block';

            // 확인 버튼 클릭
            document.querySelector('#registerPopup2 .confirm').addEventListener('click', function() {
                
                popup.style.display = 'none';
            });
        }
    },
    error: function(xhr, status, error) {
        console.log("통신에러");
    }
});


// -------------------------------------

// 파일 입력의 변화를 감지하는 이벤트 리스너
document.getElementById("file-input").addEventListener("change", function () {

    // 파일 입력
    const fileInput = this;

    // 이미지를 표시할 엘리먼트와 선택된 이미지를 표시할 엘리먼트를 가져오기
    const imagePlaceholder = document.getElementById("image-placeholder");
    const selectedImage = document.getElementById("selected-image");

    // 만약 파일 입력에 파일이 선택되었다면
    if (fileInput.files && fileInput.files[0]) {

        // FileReader 객체를 생성하기
        const reader = new FileReader();

        // 파일 읽기 작업이 완료되면 실행됨
        reader.onload = function (e) {
            // 선택된 이미지 엘리먼트의 src 속성을 읽어온 데이터 URL로 설정함
            selectedImage.src = e.target.result;
            
            // 선택된 이미지를 표시하고 이미지 플레이스홀더를 감춤
            selectedImage.style.display = "block";
            imagePlaceholder.style.display = "none";
        };

        // 파일을 Data URL로 변환하여 읽어옴......
        reader.readAsDataURL(fileInput.files[0]);
    }
});


// ---------------------------------------------------------

$(document).ready(function () {
    // AJAX 호출
    $.ajax({
        url: "https://jbeteacherstytem-dev.azurewebsites.net/api/sports", 
        type: "get",
        dataType: "json",
        success: function (data) {

            // DB 이용하여 옵션 동적으로 추가
            var optionsHtml = '';
            $.each(data, function (index, item) {
                optionsHtml += '<option value="' + item.sportsNo + '">' + item.sportsName + '</option>';
            });

            // 옵션 추가
            $('#sport-select-container1').append(optionsHtml);
            $('#sport-select-container2').append(optionsHtml);
        },
        error: function (xhr, status, error) {
            console.log("통신에러");
        }
    });
});

// ---------------------------------------------------------

function addRow1(button) {
    var table = document.getElementById("Employment-History-Table");
    var row = button.parentNode.parentNode; // 현재 행 가져오기
    var newRow = row.cloneNode(true); // 행 복제

    // 유효성 검사 함수
    function validateRow(row) {
        // 각 입력 필드에 대한 유효성 검사
        var schoolName = row.querySelector('input[type="text"]').value;
        var startDate = row.querySelector('input[type="date"][name="start-date"]').value;

        // 유효성 검사
        if (schoolName === "" || startDate === "") {
            alert("필수 입력값을 모두 입력해주세요.");
            return false;
        }
        return true;
    }

    // 새로운 행 추가 전에 유효성 검사
    if (validateRow(newRow)) {
        // 입력값 초기화
        var inputs = newRow.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.value = '';
        });

        // 추가 버튼을 삭제 버튼으로 변경
        var buttons = newRow.querySelectorAll('button');
        buttons.forEach(function (button) {
            if (button.textContent === '추가') {
                button.textContent = '삭제';
                button.onclick = function () {
                    deleteRow1(this);
                };
                button.classList.add('delete'); // 삭제 버튼에 delete 추가
            }
        });

        // 새로운 행을 테이블의 자식으로 추가
        table.appendChild(newRow);
    }
}

// 삭제 함수
function deleteRow1(button) {
    var row = button.parentNode.parentNode; 
    row.parentNode.removeChild(row); 
}

// --------------------------------------

function addRow2(button) {
    var table = document.getElementById("Certificate-Table");
    var row = button.parentNode.parentNode; 
    var newRow = row.cloneNode(true);

    // 유효성 검사 함수
    function validateRow(row) {
        var qualification = row.querySelector('input[type="text"]').value;
        var qualificationNumber = row.querySelector('input[type="text"]').value;
        var getDate = row.querySelector('input[type="date"][name="get-date"]').value;
        var issuingAuthority = row.querySelector('input[type="text"]').value;

        if (qualification === "" || qualificationNumber === "" || getDate === "" || issuingAuthority === "") {
            alert("필수 입력값을 모두 입력해주세요.");
            return false;
        }
        return true;
    }

    // 새로운 행 추가 전에 유효성 검사 실행
    if (validateRow(newRow)) {
        var inputs = newRow.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.value = '';
        });

        // 추가 버튼을 삭제 버튼으로 변경
        var buttons = newRow.querySelectorAll('button');
        buttons.forEach(function (button) {
            if (button.textContent === '추가') {
                button.textContent = '삭제';
                button.onclick = function () {
                    deleteRow2(this);
                };
                button.classList.add('delete');
            }
        });

        table.appendChild(newRow);
    }
}

// 삭제 함수
function deleteRow2(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// --------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // 등록하기 버튼 클릭 시 처리
    document.querySelector('.register').addEventListener('click', function () {
        // 필수 입력값 체크
        var requiredInputs = document.querySelectorAll('[required]');
        var requiredInputsFilled = Array.from(requiredInputs).every(function (input) {
            return input.value.trim() !== ''; // 값이 비어있는지 확인
                                              // 비어있으면 true, 비어있지 않으면 false 반환
        });

        // 이미지 유효성 검사
        var fileInput = document.getElementById('file-input');
        var selectedImage = document.getElementById('selected-image');
        var fileValid = fileInput.files.length > 0;
        var maxFileSizeKB = 1; // 최대 허용 파일 크기 (MB)
        
        // 식별코드 유효성 검사
        var codeInput = document.querySelector('#code-heading input');
        var codeValid = codeInput.value.trim() !== '';

        // 학교명 유효성 검사
        var schoolInput = document.querySelector('#school-heading input');
        var schoolValid = schoolInput.value.trim() !== '';

        // 성명 유효성 검사
        var nameInput = document.querySelector('#name-heading input');
        var nameValid = nameInput.value.trim() !== '';

        // 생년월일 유효성 검사
        var dobInput = document.querySelector('#dob-heading input');
        var dobValid = dobInput.value.trim() !== '';

        // 종목 유효성 검사
        var sportSelect = document.querySelector('#sport-select-container1');
        var sportValid = sportSelect.value !== '';

        // 근무지 전화번호 유효성 검사
        var telInputs = document.querySelectorAll('#phone-heading input');
        var telValid = Array.from(telInputs).every(function (telInput) {
            return /^\d+$/.test(telInput.value.trim());
        });

        // 최초채용 유효성 검사
        var hireInput = document.querySelector('#hire-date-heading input');
        var hireValid = hireInput.value.trim() !== '';

        // 근무 이력 테이블 필수 입력값 체크
        var workTable = document.getElementById('Employment-History-Table');
        var workTableInputs = workTable.querySelectorAll('input[required]');
        var workTableFilled = Array.from(workTableInputs).every(function (input) {
            return input.value.trim() !== '';
        });

        // 자격사항 테이블 필수 입력값 체크
        var qualTable = document.getElementById('Certificate-Table');
        var qualTableInputs = qualTable.querySelectorAll('input[required]');
        var qualTableFilled = Array.from(qualTableInputs).every(function (input) {
            return input.value.trim() !== '';
        });

        // 이미지 파일 크기 유효성 검사
        if (!telValid) {
            console.log('근무지 전화번호가 숫자로 입력되지 않았습니다!');
            alert('근무지 전화번호는 숫자로만 입력해주세요!');
            return; // 근무지 전화번호를 숫자로 입력하지 않으면 함수 종료
        } else if (!fileValid || (fileInput.files[0].size / (1024 * 1024) > maxFileSizeKB)) {
            alert('파일 크기는 ' + maxFileSizeKB + 'MB 이하로 등록해주세요!');
            return; // 이미지 파일 크기가 초과하면 함수 종료
        }

        // 필수 입력값이 모두 채워져 있을 때 등록 모달창 띄우기
        if (
            requiredInputsFilled &&
            codeValid &&
            schoolValid &&
            nameValid &&
            dobValid &&
            sportValid &&
            hireValid &&
            workTableFilled &&
            qualTableFilled
        ) {
            document.getElementById('button-register-success').style.display = 'block';
        } else {
            // 필수 입력값이 비어있어간 조건을 만족하지 못할 때 오류 모달창 띄우기
            document.getElementById('button-register-error').style.display = 'block';
        }

    });

    // 등록 모달창에서 확인 버튼 클릭 시 서버에 저장되도록 하는 함수
    document.querySelector('#button-register-success .confirm').addEventListener('click', function () {
        alert('서버에 저장되었습니다.');
        // 모달창 닫기
        document.getElementById('button-register-success').style.display = 'none';
    });

    // 등록 모달창에서 취소 버튼 클릭 시 모달창 닫기
    document.querySelector('#button-register-success .cancel').addEventListener('click', function () {
        document.getElementById('button-register-success').style.display = 'none';
    });

    // 오류 모달창에서 확인 버튼 클릭 시 모달창 닫기
    document.querySelector('#button-register-error .confirm').addEventListener('click', function () {
        document.getElementById('button-register-error').style.display = 'none';
    });
});

  
  
// --------------------------------------------------

// 취소하기 버튼 클릭 시 팝업 띄우기
document.querySelector('.button.delete').addEventListener('click', function () {
    openCancelPopup();
});

// 팝업에서 취소 또는 확인 버튼 클릭 시 동작 정의
function openCancelPopup() {
// 팝업 열기
    var popup = document.getElementById('cancelPopup');
    popup.style.display = 'block';

    // 취소 버튼 클릭 시
    document.querySelector('#cancelPopup .cancel').addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // 확인 버튼 클릭 시
    document.querySelector('#cancelPopup .confirm').addEventListener('click', function () {
        window.location.href = './index.html';
    });
}

function openSuccessPopup(message) {
    // 성공 팝업에 확인 버튼 클릭 시
    document.querySelector('#successPopup .confirm').addEventListener('click', function () {
        window.location.href = '#';
    });
}