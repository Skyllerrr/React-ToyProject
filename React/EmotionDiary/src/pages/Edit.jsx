import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Button from "../components/Button"
import Editor from "../components/Editor"
import { useContext, useEffect, useState } from "react"
import { DiaryDispatchContext, DiaryStateContext } from "../App"

import useDiary from "../hooks/useDiary"
import usePageTitle from "../hooks/usePageTitle"

const Edit = () => {
    // useParams() -> 현재 브라우저에 명시한 url 파라미터 값을 가져오는 기능을 가진 훅 [현재 App 컴포넌트 Edit의 경로가 /edit/:id로 되어있음]
    const params = useParams()
    //console.log(params) // 예를 들어, 브라우저의 경로가 localhost:5173/diary/100 이라고 가정하게 되면, params를 콘솔로 찍은 결과값은 {id: 100} 처럼 id의 값이 100인 상태로 객체안에 담긴다. 

    const navigate = useNavigate()
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext)

    const curDiaryItem = useDiary(params.id)


    usePageTitle(`${params.id}번 일기 수정`)


    // 수정 페이지에서 일기를 삭제하는 기능
    const onClickDelete = () => {
        // window.confirm() = 브라우저 내장 기능이 담긴 내용으로, 확인 or 취소 버튼이 존재하는 팝업창을 띄움
        if (window.confirm('일기를 정말 삭제할까요? 다시 복귀되지 않아요!')) {
            // 일기 삭제 로직
            onDelete(params.id)
            navigate('/', { replace: true }) // navigate() 함수는 모든 컴포넌트가 마운트(렌더링) 된 이후에 적용이 되고, 실행이 됨 [다만 여기는 함수가 아닌 이벤트 핸들러이기 때문에 작동이 됨]
    }
}


// const getCurrentDiaryItem = () => {
//     const currentDiaryItem = data.find((item) => String(item.id) === String(params.id))

//     // edit/qefeqfqgqr 처럼 오류 페이지에 들어간 경우
//     if (!currentDiaryItem) {
//         window.alert('존재하지 않는 일기입니다.')
//         navigate('/', {replace: true}) // navigate() 함수는 모든 컴포넌트가 마운트(렌더링) 된 이후에 적용이 되고, 실행이 됨 [그래서 여기는 이벤트 핸들러가 아닌 함수이기 때문에 작동이 됨]
//     }
//     return currentDiaryItem
// }

// const currentDiaryItem = getCurrentDiaryItem()


    // 메인에서 일기를 수정하고 싶을 때, "수정하기 버튼"을 누른 후 다른 선택지나 내용을 선택하고 "작성 완료"를 누르게 되면 메인으로 돌아가면서 정상적으로 수정된 일기를 보여준다.
    // 이 기능과 함수 코딩은 new 페이지에서도 똑같이 이루어진다.
    const onSubmit = (input) => {
        if (window.confirm('일기를 정말 수정할까요?'))

        {
        onUpdate(
            params.id, 
            input.createdDate.getTime(), 
            input.emotionId, 
            input.content)
        }
        navigate('/', { replace: true })
    }

    return (
        <div>
            <Header 
                title={'일기 수정하기'} 
                leftChild={<Button onClick={() => navigate('/')} text={'< 뒤로가기'} />}
                rightChild={<Button onClick={onClickDelete} text={'삭제하기'} type={'NEGATIVE'} />} 
            />
            <Editor initData={curDiaryItem} onSubmit={onSubmit} />
        </div>
    )
}

export default Edit
