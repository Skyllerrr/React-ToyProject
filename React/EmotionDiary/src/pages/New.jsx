import Header from "../components/Header"
import Button from "../components/Button"
import Editor from "../components/Editor"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { DiaryDispatchContext } from "../App"
import usePageTitle from "../hooks/usePageTitle"

const New = () => {
    const navigate = useNavigate()

    const { onCreate } = useContext(DiaryDispatchContext)


    // 1. hooks 폴더의 usePageTitle 참고
    // 2. 원하는 문구를 적으면 해당 페이지에 원하는 (프로젝트 제목)문구가 화면에 나옴
    usePageTitle('새 일기장 만들기')


    // 이 기능과 함수 코딩은 Edit 페이지에서도 똑같이 이루어진다.
    const onSubmit = (input) => {
        onCreate(
            input.createdDate.getTime(),
            input.emotionId,
            input.content
        )
        // 새 일기를 작성하고 작성완료 버튼을 눌렀을 때, 제출이 되면 자동으로 뒷 페이지로 넘어가고 넘어간 상태에서도 웹에서 뒤로가기를 못하도록 replace로 방지 
        navigate('/', { replace: true })
    }

    return (
        <div>
            <Header 
                title={"새 일기 쓰기"}
                leftChild={<Button onClick={() => navigate('/')} text={'< 뒤로 가기'} />}
            />
            <Editor onSubmit={onSubmit} />
        </div>
    )
}

export default New
