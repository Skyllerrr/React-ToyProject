import { useReducer } from "react"

// reducer - 카운터 기능 만들기

// reducer 변환기
// 상태를 실제로 변화시키는 변환기 역할
function reducer(state, action) {
    console.log(state, action)
    
    if (action.type === 'INCREASE') {
        return (
            state + action.data
        )
    }
    else if (action.type === "DECREASE") {
        return (
            state - action.data
        )
    }
} 


const Exam = () => {
    // dispatch : 상태 변화 요청
    // 상태 변화가 있어야 한다는 사실을 알리는 발송하는 함수
    const [state, dispatch] = useReducer(reducer, 0)


    // 클릭 시, 숫자가 1씩 늘어나는 함수
    const onClickPlus = () => {
        // 인수 : 상태가 어떻게 변화되길 원하는지
        // 액션 객체
        dispatch({
            type: 'INCREASE',
            data: 1,
        })
    }


    // 클릭 시, 숫자가 1씩 내려나는 함수
    const onClickMinus = () => {
        dispatch({
            type: "DECREASE",
            data: 1,
        })
    }

    
    return (
        <div>
            <h1>{state}</h1>
            <button onClick={onClickPlus}>+</button>
            <button onClick={onClickMinus}>-</button>
        </div>
    )
}

export default Exam
