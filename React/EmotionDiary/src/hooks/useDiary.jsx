import { useContext, useState, useEffect } from "react"
import { DiaryStateContext } from "../App"
import { useNavigate } from "react-router-dom"


// useDiary라는 이름의 custom hook(커스텀 훅)
// 매개변수로 현재 id를 전달받아서 data state로 부터 find 메소드를 통해 해당하는 id를 갖는 일기 item을 찾아서 currentDiaryItem이라는 state에 저장하는 기능
const useDiary = (id) => {
    const data = useContext(DiaryStateContext)
    const [curDiaryItem, setCurDiaryItem] = useState()

    const navigate = useNavigate()

    // useEffect()에 하단에 주석처리를 한 getCurrentDiaryItem() 함수 기능을 넣어, 컴포넌트가 마운트 되거나 혹은 params의 id나 data가 바뀌었을 때, 일기 데이터로서 find 메소드를 통해
    // 수정하려고 하는 일기 데이터를 꺼내와서 setCurDiaryItem() 함수를 통해 useState()에 보관한다. [이는 navigate()가 정상적으로 실행되기 위한 과정임!, 아래의 노란 오류 밑줄은 신경 X]
    useEffect(() => {
        const currentDiaryItem = data.find((item) => String(item.id) === String(id))

        // edit/qefeqfqgqr 처럼 오류 페이지에 들어간 경우
        if (!currentDiaryItem) {
            window.alert('존재하지 않는 일기입니다.')
            navigate('/', {replace: true}) // navigate() 함수는 모든 컴포넌트가 마운트(렌더링) 된 이후에 적용이 되고, 실행이 됨 [그래서 여기는 이벤트 핸들러가 아닌 함수이기 때문에 작동이 됨]
        }

        setCurDiaryItem(currentDiaryItem)
    }, [id, data])

    return curDiaryItem
}

export default useDiary
