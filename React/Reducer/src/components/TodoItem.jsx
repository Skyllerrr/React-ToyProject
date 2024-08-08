import './TodoItem.css'

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

export default TodoItem
