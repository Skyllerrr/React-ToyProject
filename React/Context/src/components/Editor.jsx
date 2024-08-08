import './Editor.css'
import { useState, useRef, useContext } from 'react'
import { TodoDispatchContext } from '../App'


// "추가" 버튼을 클릭하게 되면, onSubmit() 함수가 실행이 되고, App 컴포넌트에서 받은 onCreate() 함수를 호출하면서 인수로는 content를 사용하고,
// App 컴포넌트의 onCreate() 함수가 실행이 되면서, 새로운 Todo 아이템을 만드는 newTodo라는 객체 데이터를 만들고, 만든 객체 데이터를 setTodos() 함수를 통해 기존의 todos 배열 앞에 추가하게 되고,
// 최종적으로, 데이터 추가가 이루어진다.

const Editor = () => {
    // App.jsx에서 useContext()로 모든 props를 관리해줌으로서 각 컴포넌트에 필요한 props만 가져와서 useContext()에 저장
    // Editor와 TodoItem 컴포넌트에서는 props를 TodoDispatchContext에서 가져오는데 "변수"가 아닌 "객체 형식"으로 {}를 이용하여 가져온다. 여기선 { onCreate }
    // 그 이유는 App 컴포넌트에서 TodoDispatchContext를 이용하여 onCreate, onUpdate, onDelete를 "객체 형식"으로 정의했기 때문에 가져올 때도 {}를 이용한 객체 형식으로 가져와야 한다.
    const { onCreate } = useContext(TodoDispatchContext)

    const [content, setContent] = useState("")
    const inputRef = useRef() // useRef()를 이용하여 input칸이 비어있을 때, "추가" 버튼을 누르면 input칸에 focus가 가도록 만드는 기능

    // input에 쓸 수 있도록 만들어 줌
    const onChangeContent = (e) => {
        setContent(e.target.value)
    }

    // input에 마우스로 클릭하지 않고, enter 키만 눌러도 submit됨 (e.keyCode === 13)
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
