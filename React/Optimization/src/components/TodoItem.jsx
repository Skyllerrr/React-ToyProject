import './TodoItem.css'
import { memo } from 'react'

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
    
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
            <div className="date">{new Date(date).toLocaleDateString}</div>
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
