import "./App.css";
import { useRef, useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";


  // 임시의 TodoList 데이터
  const mockData = [
    {
      id: 0,
      isDone: false,
      content: "React 공부하기",
      date: new Date().getTime(),
    },

    {
      id: 1,
      isDone: false,
      content: "빨래하기",
      date: new Date().getTime(),
    },

    {
      id: 2,
      isDone: false,
      content: "노래 연습하기",
      date: new Date().getTime(),
    },
  ];


  function App() {
    const [todos, setTodos] = useState(mockData);
    const idRef = useRef(3); // id가 겹치지 않기 위해 현재 0, 1, 2번이 존재하니 3번으로 지정

    /////// 새로운 todolist를 추가해줄 때의 함수 ///////
    const onCreate = (content) => {
      const newTodo = {
        id: idRef.current++,
        // 기존에는 id의 값을 0으로 고정해두었는데, 현재는 useRef를 이용하여 idRef의 초기값을 3으로 지정해두고, idRef의 현재 값이 변화할 때 마다 1씩 추가된다.
        // 즉, 새롭게 만들 때 마다 id의 값이 1씩 증가한다.
        isDone: false,
        content: content,
        date: new Date().getTime(),
      };

      setTodos([newTodo, ...todos]);
    };


    /////// 기존의 todolist를 수정해줄 때의 함수 ///////
    const onUpdate = (targetId) => {
      // 해당 기능 : todos state의 값들 중에 targetId와 일치하는 Id를 갖는 todo Item의 isDone을 "변경"해야함 즉, 사용자가 todolist의 CheckBox를 클릭했을 때, 변경되어야 함

      // 인수 : todos 배열에서 targetId와 일치하는 Id를 갖는 요소와 데이터만 딱 바꾼 새로운 배열
      setTodos(
        todos.map((todo) => 
          todo.id === targetId
          ? {...todo, isDone: !todo.isDone} 
          : todo 
      )
    )
  }

    /////// 기존의 todolist를 삭제해줄 때의 함수 ///////
    const onDelete = (targetId) => {
      // 해당 기능 : todos state의 값들 중에 targetId와 일치하는 Id를 갖는 todo Item을 삭제해야함 즉, 사용자가 todolist의 CheckBox를 클릭하고 삭제 버튼을 눌렀을 때, 삭제되어야 함

      // 인수 : todos 배열에서 targetId와 일치하는 Id를 갖는 요소만 삭제한 새로운 배열
      setTodos(todos.filter((todo) => todo.id !== targetId))
    }


    return (
      <div className="App">
        <Header />
        <Editor onCreate={onCreate} />
        <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    );
  }
  
export default App;