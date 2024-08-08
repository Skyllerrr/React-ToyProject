import "./List.css";
import TodoItem from "./TodoItem";
import { useState, useMemo, useContext } from "react";
import { TodoStateContext } from "../App";

const List = () => {
  // App.jsx에서 useContext()로 모든 props를 관리해줌으로서 각 컴포넌트에 필요한 props만 가져와서 useContext()에 저장
  // List 컴포넌트에서는 props를 TodoStateContext에서 가져오는데 "객체 형식"이 아닌 "변수"로 {}를 이용하지 않고 그대로 가져온다. 여기선 그냥 todos
  // 그 이유는 App 컴포넌트에서 TodoDispatchContext의 onCreate, onUpdate, onDelete 처럼 "객체 형식"이 아닌
  // TodoStateContext를 이용하여 todos를 "변수"로 정의했기 때문에 가져올 때도 {}를 이용하지 않고 그대로 "변수"로 가져와야 한다.
  const todos = useContext(TodoStateContext)
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content
        .toLowerCase()
        .includes(search.toLowerCase())
        // 예를 들어, 현재 todo.content에 저장된 값의 이름이 "React로 공부하기"라면, includes(search) 즉, "React"라는 글자를 치게 될 때
        // "해당 글자가 있으면 True, 없으면 False를 반환하여 (filter) 걸러내라" 라는 뜻의 코드이다. 
        // 또한, toLowerCase()로 모두 소문자로 만들어서 소문자 및 대문자 구분 없이 검색해도 나오도록 만들어준다.
    );
  };


  const filteredTodos = getFilteredData();
  // 리렌더링 될 때 마다 getFilteredData() 함수를 실행하고, 이를 filteredTodos 변수에 넣어라 라는 의미이다.


  // const getAnalyzedData = () => {
  //   // console.log('getAnalyzedData 호출!')

  //   const totalCount = todos.length
  //   const doneCount = todos.filter((todo) => todo.isDone).length
  //   const notDoneCount = totalCount - doneCount

  //   return {
  //     totalCount,
  //     doneCount,
  //     notDoneCount
  //   }
  // }


  // 말 그대로 해당 내용을 기억하고 싶을 때, 사용 (현재 예시에서는 getAnalyzedData)
  // 의존성 배열 : deps
  const { totalCount, doneCount, notDoneCount } = 
    useMemo(() => {
      //console.log('getAnalyzedData 호출!')

      const totalCount = todos.length
      const doneCount = todos.filter((todo) => todo.isDone).length
      const notDoneCount = totalCount - doneCount

      return {
        totalCount,
        doneCount,
        notDoneCount
      }
    }, [todos])

  // const {totalCount, doneCount, notDoneCount} = getAnalyzedData()


  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDoneCount: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
          <TodoItem 
            key={todo.id} 
            {...todo} 
            // onUpdate={onUpdate} 
            // onDelete={onDelete} 
          />
        );
        })}
      </div>
    </div>
  );
};

export default List;