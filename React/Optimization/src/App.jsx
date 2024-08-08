import "./App.css";
import { useRef, useState, useReducer, useCallback } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
//import Exam from "./components/Exam";

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


  // 현재 여러 개의 주석 처리가 되어있는 부분은 useState() -> useReducer() -> useCallback()로 최적화를 한 부분
  // 최적화는 기능 개발 구현이 다 끝난 후, 이루어지는 최종 마지막 작업이다.
  
  // useState() -> 이전 예시의 Counter App처럼 간단한 상태변화 구조는 보통 useState()를 사용
  // useReducer() -> 현재 예시의 todos처럼 배열안에 객체가 들어갈 때, 복잡한 구조는 보통 useReducer()를 사용
  // useCallback() -> 최적화를 위해 기존의 함수를 useCallback() 함수에 넣어 사용 [불필요한 리렌더링 방지 가능]
  
  // 기존은 useState()를 이용하여 만듦 -> onCreate(), onUpdate(), onDelete()함수의 주석 처리 된 부분이 useState()를 사용하여 만든 부분
  // useReducer()를 이용하여 객체가 생성, 수정, 삭제 될 때의 변화를 만들기
  function reducer(state, action) {
    if (action.type === 'CREATE') {
      return (
        [action.data, ...state]
      )
    }

    if (action.type === 'UPDATE') {
      return (
        state.map((item) => item.id === action.targetId? {...item, isDone: !item.isDone} : item)
      )
    }

    if (action.type === 'DELETE') {
      return (
        state.filter((item) => item.id !== action.targetId)
      )
    }
  }


  function App() {
    //const [todos, setTodos] = useState(mockData);
    const [todos, dispatch] = useReducer(reducer, mockData)
    const idRef = useRef(3);

    /////// 새로운 todolist를 추가해줄 때의 함수 ///////
    const onCreate = useCallback((content) => {
      dispatch({
        type: 'CREATE',
        data: {
          id  : idRef.current++,
          isDone: false,
          content: content,
          date : new Date().getTime(),
        }
      })

      // const newTodo = {
      //   id: idRef.current++,
      //   // 기존에는 id의 값을 0으로 고정해두었는데, 현재는 useRef를 이용하여 idRef의 초기값을 3으로 지정해두고, idRef의 현재 값이 변화할 때 마다 1씩 추가된다.
      //   // 즉, 새롭게 만들 때 마다 id의 값이 1씩 증가한다.
      //   isDone: false,
      //   content: content,
      //   date: new Date().getTime(),
      // };

      // setTodos([newTodo, ...todos]);
    }, []);


    /////// 기존의 todolist를 수정해줄 때의 함수 ///////
    const onUpdate = useCallback((targetId) => {
      dispatch({
        type: 'UPDATE',
        targetId: targetId
      })

    //   // 해당 기능 : todos state의 값들 중에 targetId와 일치하는 Id를 갖는 todo Item의 isDone을 "변경"해야함 즉, 사용자가 todolist의 CheckBox를 클릭했을 때, 변경되어야 함

    //   // 인수 : todos 배열에서 targetId와 일치하는 Id를 갖는 요소와 데이터만 딱 바꾼 새로운 배열
    //   setTodos(
    //     todos.map((todo) => 
    //       todo.id === targetId
    //       ? {...todo, isDone: !todo.isDone} 
    //       : todo 
    //   )
    // )
  }, []);

    // /////// 기존의 todolist를 삭제해줄 때의 함수 ///////
    // const onDelete = (targetId) => {
    //   dispatch({
    //     type: 'DELETE',
    //     targetId: targetId
    //   })

    //   // // 해당 기능 : todos state의 값들 중에 targetId와 일치하는 Id를 갖는 todo Item을 삭제해야함 즉, 사용자가 todolist의 CheckBox를 클릭하고 삭제 버튼을 눌렀을 때, 삭제되어야 함

    //   // // 인수 : todos 배열에서 targetId와 일치하는 Id를 갖는 요소만 삭제한 새로운 배열
    //   // setTodos(todos.filter((todo) => todo.id !== targetId))
    // }



    // useCallback() -> 첫 번째 인수로는 최적화 하고 싶은 함수, 두 번째 인수로는 deps (의존성 배열)
    // 현재 예시로는 onDelete() 함수를 가져온 상태
    const onDelete = useCallback((targetId) => {
      dispatch({
        type: 'DELETE',
        targetId: targetId
      })
    }, []);


    return (
      <div className="App">
        {/* <Exam />  */}
        <Header />
        <Editor onCreate={onCreate} />
        <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    );
  }
  
export default App;