const selectBoxElements = document.querySelectorAll(".select");

    function toggleSelectBox(selectBox) {
    selectBox.classList.toggle("active");
    }

    function selectOption(optionElement) {
    const selectBox = optionElement.closest(".select");
    const selectedElement = selectBox.querySelector(".selected-value");
    selectedElement.textContent = optionElement.textContent;
    }

    selectBoxElements.forEach(selectBoxElement => {
    selectBoxElement.addEventListener("click", function (e) {
        const targetElement = e.target;
        const isOptionElement = targetElement.classList.contains("option");

        if (isOptionElement) {
        selectOption(targetElement);
        }

        toggleSelectBox(selectBoxElement);
    });
    });

    document.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isSelect = targetElement.classList.contains("select") || targetElement.closest(".select");

    if (isSelect) {
        return;
    }

    const allSelectBoxElements = document.querySelectorAll(".select");

    allSelectBoxElements.forEach(boxElement => {
        boxElement.classList.remove("active");
    });
});

// -------------------------------------------------------------------------------------------

// 모달 검색 기능
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
            var str = '';

            $.each(result, function (i, item) {
                var number = i + 1;
                if (
                    (searchType === '이름' && result[i].leaderName === inputText) ||
                    (searchType === '종목' && result[i].sportName === inputText)
                ) {
                    str += '<tr><td><input type="checkbox" class="checkbox">' + number + '</td><td>' + result[i].leaderNo + '</td><td>' + result[i].leaderName + '</td><td>' + result[i].sportName + '</td><td>' + result[i].schoolName + '</td><td><button class="detailsBtn">상세보기</button></td></tr>';
                }
            });

            if (str !== '') {
                $('.leaderTable_body').html(str);
            } else {
                $('.leaderTable_body').html('<tr><td colspan="6">검색된 결과가 없습니다.</td></tr>');
            }

            // 클릭 이벤트
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
var pageSize = 8; // 페이지당 표시되는 아이템 수
var currentPage = 1; // 현재 페이지

// 테이블 초기 로딩
loadTableData();

// 이전 페이지로 이동
$('#prevPage').click(function () {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
});

// 다음 페이지로 이동
$('#nextPage').click(function () {
    var totalItems = getTotalItems();
    var totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
});

// 페이지네이션 업데이트 함수
function updatePagination() {
    var totalItems = getTotalItems();
    var totalPages = Math.ceil(totalItems / pageSize);

    $('#currentPage').text(currentPage);

    if (currentPage === 1) {
        $('#prevPage').prop('disabled', true);
    } else {
        $('#prevPage').prop('disabled', false);
    }

    if (currentPage === totalPages) {
        $('#nextPage').prop('disabled', true);
    } else {
        $('#nextPage').prop('disabled', false);
    }
}

// 페이지 이동 함수
function goToPage(page) {
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
            var str = '';
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize, result.length);

            for (var i = startIndex; i < endIndex; i++) {
                var number = i + 1;
                str += '<tr><td><input type="checkbox" class="checkbox">' + number + '</td><td>' + result[i].leaderNo + '</td><td>' + result[i].leaderName + '</td><td>' + result[i].sportName + '</td><td>' + result[i].schoolName + '</td><td><button class="detailsBtn">상세보기</button></td></tr>';
            }
            $('.leaderTable_body').html(str);

            var totalLeaders = result.length;
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

// 전체 아이템 수를 계산하는 함수
function getTotalItems() {
    return $('.leaderTable_body tr').length - 1;
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
}

// 페이지 로딩 시 실행되는 코드 (index.js)
$(document).ready(function () {

    // 클릭 이벤트
    $('.leaderTable_body').on('click', '.detailsBtn', function () {
        
        // 현재 클릭한 행에 있는 식별코드 가져오기
        var leaderNo = $(this).closest('tr').find('td:eq(1)').text();
        
        // 식별코드를 지도자 등록하기 페이지로 전달하여 이동
        window.location.href = 'detail.html?leaderNo=' + leaderNo;
    });

});
