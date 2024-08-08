import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos, onUpdate, onDelete }) => {
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

  const filteredTodos = getFilteredData(); // 리렌더링 될 때 마다 getFilteredData() 함수를 실행하고, 이를 filteredTodos 변수에 넣어라 라는 의미이다.

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
          <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete} />
        );
        })}
      </div>
    </div>
  );
};

export default List;