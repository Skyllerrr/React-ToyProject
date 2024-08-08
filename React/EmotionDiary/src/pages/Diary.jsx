import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Button from "../components/Button"
import Viewer from "../components/Viewer"

import useDiary from "../hooks/useDiary"
import usePageTitle from "../hooks/usePageTitle"

import { getStringedDate } from "../util/get-stringed-date"

const Diary = () => {
    // useParams() -> 현재 브라우저에 명시한 url 파라미터 값을 가져오는 기능을 가진 훅 [현재 App 컴포넌트 Diary의 경로가 /diary/:id로 되어있음]
    const params = useParams()
    //console.log(params) // 예를 들어, 브라우저의 경로가 localhost:5173/diary/100 이라고 가정하게 되면, params를 콘솔로 찍은 결과값은 {id: 100} 처럼 id의 값이 100인 상태로 객체안에 담긴다. 
    const navigate = useNavigate()


    const curDiaryItem = useDiary(params.id)
    console.log(curDiaryItem)

    usePageTitle(`${params.id}번 일기`)

    // 위의 curDiaryItem을 console에 찍은 값이 undefined가 나올 경우를 대비
    if (!curDiaryItem) {
        return (
            <div>데이터 로딩중...!</div>
        )
    }

    const { createdDate, emotionId, content } = curDiaryItem
    const title = getStringedDate(new Date(createdDate))


    return (
        <div>
            <Header title={`${title} 기록`}
                leftChild={<Button onClick={() => navigate('/')} text={'< 뒤로가기'} />}
                rightChild={<Button onClick={() => navigate(`/edit/${params.id}`)} text={'수정하기'} />}
            />
            <Viewer emotionId={emotionId} content={content} />
        </div>
    )
}

export default Diary
