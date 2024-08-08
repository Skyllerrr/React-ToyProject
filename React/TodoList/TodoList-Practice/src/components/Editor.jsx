import './Editor.css'
import { useState, useRef } from 'react'


// "추가" 버튼을 클릭하게 되면, onSubmit() 함수가 실행이 되고, App 컴포넌트에서 받은 onCreate() 함수를 호출하면서 인수로는 content를 사용하고,
// App 컴포넌트의 onCreate() 함수가 실행이 되면서, 새로운 Todo 아이템을 만드는 newTodo라는 객체 데이터를 만들고, 만든 객체 데이터를 setTodos() 함수를 통해 기존의 todos 배열 앞에 추가하게 되고,
// 최종적으로, 데이터 추가가 이루어진다.

const Editor = ({ onCreate }) => {
    const [content, setContent] = useState("")
    const inputRef = useRef() // useRef()를 이용하여 input칸이 비어있을 때, "추가" 버튼을 누르면 input칸에 focus가 가도록 만드는 기능

    const onChangeContent = (e) => {
        setContent(e.target.value)
    }

    const onKeydown = (e) => {
        if (e.keyCode === 13) {
            onSubmit()
        }
    }

    const onSubmit = () => {
        if (content === "") {
            inputRef.current.focus() // useRef()를 이용하여 input칸이 비어있을 때, "추가" 버튼을 누르면 input칸에 focus가 가도록 만드는 기능
            return;
        }

        onCreate(content)
        setContent("") // 새로운 Todo를 추가했을 때, 자동으로 input칸이 빈칸이 되도록 만드는 기능
    }

    return (
        <div className="Editor">
            <input
                ref={inputRef} // useRef()를 이용하여 input칸이 비어있을 때, "추가" 버튼을 누르면 input칸에 focus가 가도록 만드는 기능
                value={content}
                onKeyDown={onKeydown}
                onChange={onChangeContent}
                placeholder="새로운 Todo..." />
            <button onClick={onSubmit}>추가</button>
        </div>
    )
}

export default Editor
