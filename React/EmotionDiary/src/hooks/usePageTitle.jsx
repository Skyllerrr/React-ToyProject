import { useEffect } from "react";

const usePageTitle = (title) => {
    // 타이틀에 'title'문자가 입력되어 있는 페이지만 (현재 예시는 "new - 새 일기 쓰기" 페이지입니다.) 바꾼 제목을 적용시켜준다.
    // 관례상 &사인을 붙인다.
    useEffect(() => {
        const $title = document.getElementsByTagName('title')[0]
        $title.innerText = title;
    }, [title])
}

export default usePageTitle
