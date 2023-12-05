$(document).ready(function () {
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
                // 팝업창 표시 후 체크박스 초기화
                $('#selectAll').prop('checked', false);
                // 삭제 후 다시 버튼 상태 업데이트
                updateDeleteButtonState();
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

        // 취소 버튼 클릭
        document.querySelector('#deletePopup .close').addEventListener('click', function () {
            // 팝업 닫기
            popup.style.display = 'none';
        });

        // 오버레이 클릭 시 팝업 닫기
        $('#overlay').one('click', function () {
            popup.style.display = 'none';
        });
    }

    // Ajax 호출 및 테이블 생성 코드
    $.ajax({
        url: "https://jbeteacherstytem-dev.azurewebsites.net/api/leaders/list",
        type: "get",
        dataType: "json",
        success: function (result) {
            var str = '';
            $.each(result, function (i, item) {
                var number = i + 1;
                str += '<tr><td><input type="checkbox" class="checkbox">' + number + '</td><td>' + result[i].leaderNo + '</td><td>' + result[i].leaderName + '</td><td>' + result[i].sportName + '</td><td>' + result[i].schoolName + '</td><td><button class="detailsBtn">상세보기</button></td></tr>';
            });
            $('.leaderTable_body').append(str);

            var totalleaders = result.length;
            $('#totalleader').text('총 ' + totalleaders + '명');

            // 전체 선택/해제 체크박스에 대한 이벤트
            $('#selectAll').change(function () {
                $('.leaderTable_body input[type="checkbox"]').prop('checked', $(this).prop('checked'));
                updateDeleteButtonState();
            });

            // 개별 체크박스에 대한 이벤트
            $('.leaderTable_body').on('change', 'input[type="checkbox"]', function () {
                var allChecked = $('.leaderTable_body input[type="checkbox"]:checked').length === $('.leaderTable_body input[type="checkbox"]').length;
                $('#selectAll').prop('checked', allChecked);
                updateDeleteButtonState();
            });

            // 초기 상태에서는 삭제하기 버튼 비활성화
            updateDeleteButtonState();
        },
        error: function (xhr, status, error) {
            console.log("통신에러");
        }
    });

    // 삭제하기 버튼 상태 업데이트 함수
    function updateDeleteButtonState() {
        var anyChecked = $('.leaderTable_body input[type="checkbox"]:checked').length > 0;
        $('.button.delete').prop('disabled', !anyChecked);
    }
});



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