import './TodoItem.css'
import { memo, useContext } from 'react'
import { TodoDispatchContext } from '../App'

const TodoItem = ({ id, isDone, content, date }) => {
    // App.jsx에서 useContext()로 모든 props를 관리해줌으로서 각 컴포넌트에 필요한 props만 가져와서 useContext()에 저장
    // Editor와 TodoItem 컴포넌트에서는 props를 TodoDispatchContext에서 가져오는데 "변수"가 아닌 "객체 형식"으로 {}를 이용하여 가져온다. 여기선 { onUpdate, onDelete }
    // 그 이유는 App 컴포넌트에서 TodoDispatchContext를 이용하여 onCreate, onUpdate, onDelete를 "객체 형식"으로 정의했기 때문에 가져올 때도 {}를 이용한 객체 형식으로 가져와야 한다.
    const { onUpdate, onDelete } = useContext(TodoDispatchContext)
    
    // CheckBox를 클릭했을 때, 활성화가 되도록 하는 함수
    const onChangeCheckBox = () => {
        onUpdate(id)
    }

    // 삭제 버튼을 클릭했을 때, 삭제가 되도록 하는 함수
    const onClickDeleteButton = () => {
        onDelete(id)
    }


    // checkbox라서 onClick보다는 onChange 이벤트로 설정
    return (
        <div className="TodoItem">
            <input onChange={onChangeCheckBox} checked={isDone} type="checkbox" />
            <div className="content">{content}</div>
            <div className="date">{new Date(date).toDateString()}</div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    )
}


/////// 업데이트 = useCallback() 함수를 사용하면서 memo를 사용안해도 됨 ///////

// 불필요한 메모이징을 방지하기 위해 설정 (리렌더링이 여러 번 되지 않음)
// 메모이징이 정상적으로 이루어지게 하기 위해서 콜백함수를 생성
// export default memo(TodoItem, (prevProps, nextProps) => {
//     // 반환값에 따라, Props가 바뀌었는지 안바뀌었는지 판단
//     // True -> Props가 바뀌지 않음 -> 리렌더링 X
//     // False -> Props가 바뀜 -> 리렌더링 O

//     if (prevProps.id !== nextProps.id) return false
//     if (prevProps.isDones !== nextProps.isDones) return false
//     if (prevProps.content !== nextProps.content) return false
//     if (prevProps.date !== nextProps.v) return false

//     return true
// })

export default memo(TodoItem)
