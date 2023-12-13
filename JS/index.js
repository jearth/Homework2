// HTML에서 클래스가 "select"인 모든 요소를 선택하여 document.querySelectorAll에 저장
const selectBoxElements = document.querySelectorAll(".select");

    // 선택 상자 함수
    function toggleSelectBox(selectBox) {
    selectBox.classList.toggle("active");
    }

    // 옵션 선택 함수
    function selectOption(optionElement) {
    
    // 선택한 옵션이 속한... 선택 상자를 찾고
    const selectBox = optionElement.closest(".select");

    // 그리고 선택 상자 내부에서 현재 선택된 항목을 나타내는 요소 찾고
    const selectedElement = selectBox.querySelector(".selected-value");

    // 선택한 옵션의 텍스트 내용을 현재 선택된 항목에 표시하고
    selectedElement.textContent = optionElement.textContent;
    }

    // 각 선택 상자에 대한 이벤트 리스너
    selectBoxElements.forEach(selectBoxElement => {
    selectBoxElement.addEventListener("click", function (e) {
        const targetElement = e.target;
        const isOptionElement = targetElement.classList.contains("option");

        // 클릭된 요소가 옵션인 경우 해당 옵션 선택 함수 호출, 그렇지 않으면 선택 상자 토글
        if (isOptionElement) {
        selectOption(targetElement);
        }

        toggleSelectBox(selectBoxElement);
    });
    });

    // 문서 어느 곳이든 클릭할 때 발생하는 이벤트 리스너
    document.addEventListener("click", function (e) {
    const targetElement = e.target;

    // 클릭된 요소가 선택 상자인지 또는 선택 상자의 하위 요소인지 확인
    const isSelect = targetElement.classList.contains("select") || targetElement.closest(".select");

    if (isSelect) {
        return;
    }

    // 클릭된 요소가 선택 상자 또는 선택 상자의 하위 요소가 아닌 경우 모든 선택 상자 비활성화
    const allSelectBoxElements = document.querySelectorAll(".select");

    allSelectBoxElements.forEach(boxElement => {
        boxElement.classList.remove("active");
    });
});

// -------------------------------------------------------------------------------------------

function searchLeaderCode() {
    var inputText = $('#searchInput').val();
    var searchType = $('.select .selected-value').text();

    $.ajax({
        url: "https://jbeteacherstytem-dev.azurewebsites.net/api/leaders/list",
        type: "get",
        dataType: "json",
        data: {
            keyword: inputText,
            type: searchType
        },
        success: function (result) {
            // 필터링된 결과
            var filteredResult = result.filter(function (item) {
                return (
                    (searchType === '전체' && (item.leaderName.includes(inputText) || item.sportName.includes(inputText))) ||
                    (searchType === '이름' && item.leaderName.includes(inputText)) ||
                    (searchType === '종목' && item.sportName.includes(inputText))
                );
            });

            var str = '';

            $.each(filteredResult, function (i, item) {
                var number = i + 1;
                str += '<tr><td><input type="checkbox" class="checkbox">' + number + '</td><td>' + item.leaderNo + '</td><td>' + item.leaderName + '</td><td>' + item.sportName + '</td><td>' + item.schoolName + '</td><td><button class="detailsBtn">상세보기</button></td></tr>';
            });

            if (str !== '') {
                $('.leaderTable_body').html(str);
            } else {
                $('.leaderTable_body').html('<tr><td colspan="6">검색된 결과가 없습니다.</td></tr>');
            }

            // 클릭
            $('.leaderTable_body tr').on('click', function () {
                $('.leaderTable_body tr').css('background-color', '');
                $(this).css('background-color', '#F9F9F9');
            });
        },
        error: function (xhr, status, error) {
            console.log("통신에러");
        }
    });
}


// -------------------------------------------------------------------------------------------

// 페이지네이션
var pageSize = 10; // 페이지당 표시되는 아이템 수
var currentPage = 1; // 현재 페이지

// 페이지를 로딩하고 초기 데이터를 표시하는 함수
loadTableData();

// 전체 아이템 수를 계산하는 함수
function getTotalItems() {
    return $('.leaderTable_body tr').length;
}

// 이전 페이지 버튼에 대한 클릭 이벤트
$('#prevPage').click(function () {

    // 현재 페이지가 1보다 큰 경우에만 이전 페이지로 이동함
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
});

// 다음 페이지 버튼에 대한 클릭 이벤트
$('#nextPage').click(function () {

    // 전체 아이템 수와 페이지당 표시 아이템 수를 이용하여 전체 페이지 수 계산
    var totalItems = getTotalItems();
    var totalPages = Math.ceil(totalItems / pageSize);

    // 현재 페이지가 전체 페이지 수보다 작은 경우에만 다음 페이지로 이동
    if (currentPage < pageSize) {
        goToPage(currentPage + 1);
    }
});



// 페이지네이션 업데이트 함수
function updatePagination() {

    // 정체 아이템 수와 페이지당 표시 아이템 수를 이용하여 전체 페이지 수를 계산
    var totalItems = getTotalItems();
    var totalPages = Math.ceil(totalItems / pageSize);

    // 현재 페이지가 1인 경우 이전 페이지 버튼 비활성화
    if (currentPage === 1) {
        $('#prevPage').prop('disabled', true);
    } else {
        $('#prevPage').prop('disabled', false);
    }

    // 현재 페이지가 전체 페이지 수와 동일한 경우 다음 페이지 버튼 비활성화
    if (currentPage === totalPages) {
        $('#nextPage').prop('disabled', true);
    } else {
        $('#nextPage').prop('disabled', false);
    }

    // 현재 페이지로 이동
    $('#currentPage').click(function () {
        goToPage(1);
    });

    // 다음 페이지로 이동
    $('#secondPage').click(function () {
        goToPage(2);
    });

    // 첫 페이지로 이동
    $('#firstPage').off('click').on('click', function () {
        goToPage(1);
    });

    // 마지막 페이지로 이동
    $('#lastPage').off('click').on('click', function () {
        goToPage(2);
    });
}


// 페이지 이동 함수
function goToPage(page) {

    // 현재 페이지를 변경하고, 변경된 페이지에 해당하는 데이터를 로딩함
    currentPage = page;
    loadTableData();
}

// 테이블 데이터 로딩 함수
function loadTableData() {
    var url = "https://jbeteacherstytem-dev.azurewebsites.net/api/leaders/list";
    var data = {
        page: currentPage,
        pageSize: pageSize
    };

    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        data: data,
        success: function (result) {
            console.log(result);

            var str = '';
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize, result.length);

            for (var i = startIndex; i < endIndex; i++) {
                var number = i + 1;
                str += '<tr><td><input type="checkbox" class="checkbox">' + number + '</td><td>' + result[i].leaderNo + '</td><td>' + result[i].leaderName + '</td><td>' + result[i].sportName + '</td><td>' + result[i].schoolName + '</td><td><button class="detailsBtn">상세보기</button></td></tr>';
            }
            $('.leaderTable_body').html(str);

            var totalLeaders = result.length ;
            $('#totalleader').text('총 ' + totalLeaders + '명');

            updatePagination();

            // 전체 선택/해제 체크박스에 대한 이벤트
            $('#selectAll').change(function () {
                $('.leaderTable_body input[type="checkbox"]').prop('checked', $(this).prop('checked'));
            });

            // 개별 체크박스에 대한 이벤트
            $('.leaderTable_body').on('change', 'input[type="checkbox"]', function () {
                var allChecked = $('.leaderTable_body input[type="checkbox"]:checked').length === $('.leaderTable_body input[type="checkbox"]').length;
                $('#selectAll').prop('checked', allChecked);
            });
        },
        error: function (xhr, status, error) {
            console.log("통신에러");
        }
    });
}


// 삭제하기 버튼 클릭 시 팝업 창 표시
$('.button.delete').click(function () {
    var checkedItems = $('.leaderTable_body input[type="checkbox"]:checked');
    if (checkedItems.length > 0) {
        openDeletePopup(checkedItems);

        // 팝업 창 확인 버튼 클릭 시 삭제 동작
        $('#deletePopup .confirm').one('click', function () {
            checkedItems.closest('tr').remove();
            // 팝업창 닫기
            $('#deletePopup').hide();
            updatePagination();
        });
    } else {
        alert('선택된 항목이 없습니다.');
    }
});

// 팝업 창 열기
function openDeletePopup(checkedItems) {
    // 팝업 열기
    var popup = document.getElementById('deletePopup');
    popup.style.display = 'block';

    // 확인 버튼 클릭
    document.querySelector('#deletePopup .confirm').addEventListener('click', function () {
        // 팝업 닫기
        popup.style.display = 'none';
    });

    $('#deletePopup .popup-button-box .register').on('click', function () {
        // 팝업창 닫기
        $('#deletePopup').hide();
    });
}


// 페이지 로딩 시 실행되는 코드
$(document).ready(function () {

    // 클릭 이벤트
    $('.leaderTable_body').on('click', '.detailsBtn', function () {
        
        // 현재 클릭한 행에 있는 식별코드 가져오기
        var leaderNo = $(this).closest('tr').find('td:eq(1)').text();
        
        // 식별코드를 지도자 등록하기 페이지로 전달하여 이동
        window.location.href = 'detail.html?leaderNo=' + leaderNo;
    });

});