import './App.css'
import { useReducer, useRef, createContext, useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'

//import Button from './components/Button'
//import Header from './components/Header'

//import { getEmotionImage } from './util/get-emotion-image'



// 임시의 일기 데이터 -> localStorage를 이용하게 되면 데이터들이 삽입, 수정, 삭제 될 때 마다, 데이터의 기록이 저장되어있기 때문에 이 부분(mockData)이 없어도 된다.
// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date("2024-02-19").getTime(),
//     emotionId: 1,
//     content: '1번 일기 내용'
//   },
//   {
//     id: 2,
//     createdDate: new Date("2024-02-18").getTime(),
//     emotionId: 2,
//     content: '2번 일기 내용'
//   },
//   {
//     id: 3,
//     createdDate: new Date("2024-01-01").getTime(),
//     emotionId: 3,
//     content: '3번 일기 내용'
//   },
//   {
//     id: 4,
//     createdDate: new Date("2024-08-08").getTime(),
//     emotionId: 4,
//     content: '4번 일기 내용'
//   },
//   {
//     id: 5,
//     createdDate: new Date("2024-08-09").getTime(),
//     emotionId: 5,
//     content: '5번 일기 내용'
//   }
// ]


function reducer(state, action) {
  let nextState;

  switch(action.type) {
    case 'INIT' : {
      return action.data
    }

    case 'CREATE' : {
      nextState = [action.data, ...state]
      break; // return문 대신에 nextState를 넣은 상황
    }

    // UPDATE = 현재의 state 배열에서 dispatch() 함수로 호출할 때, 
    // action 객체로 전달 된 dispatch()함수 하위인 data 객체의 id값과 일치하는 요소만 수정이 이루어져야 함
    // (혹시 모를 String형으로 변환)
    case 'UPDATE' : 
      {nextState = state.map((item) => 
        String(item.id) === String(action.data.id)
          ? action.data
          : item
      )
      break;
    }
    
    // DELETE = item의 id가 같지 않는 요소들만 return 해줘라 라는 뜻으로 
    // action객체의 아이디와 기존의 item객체의 아이디가 같지 않는 요소들은 제거가 이루어짐
    // (혹시 모를 String형으로 변환)
    case 'DELETE' :
      {nextState = state.filter((item) => 
        String(item.id) !== String(action.id)
    )
    break;
  }
    default:
      return state
  }

  // 일기가 생성 or 수정 or 삭제가 될 때 마다, diary라는 key값의 이름으로 일기의 현재 데이터를 localStorage에 저장 [개발자 도구의 Application탭에 가보면 나옴]
  localStorage.setItem('diary', JSON.stringify(nextState))
  return nextState
}


// Context()를 이용하여 아래의 data의 state요소를 모든 페이지에 공급할 수 있도록 만들어준다.
// App 컴포넌트 아래에 <DiaryStateContext.Provider>로 Routes 전체를 감싸준다.
export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()



/********************  APP Components 시작 ********************/

// 1. '/' : 모든 일기를 조회하는 Home 페이지
// 2. '/new' : 새로운 일기를 작성하는 new 페이지
// 3. '/diray' : 일기를 상세히 조회하는 Diary 페이지
function App() {
  // const nav = useNavigate()

  // const onClickButton = () => {
  //   nav('/new')
  // }
  

  // 여기에 있는 data는 일기 데이터들을 저장해놓음 (New, Diary, Edit 등)
  // localStorage를 이용하게 되면 데이터들이 삽입, 수정, 삭제 될 때 마다, 데이터의 기록이 저장되어있기 때문에 이 부분(mockData)이 없어도 된다.
  // 현재 reducer뒤의 빈 배열과 useRef의 3번 아이디 대신 0으로 변경한 상태
  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0) // id가 겹치지 않기 위해 현재 0, 1, 2번이 존재하니 3번으로 지정

  const [isloading, setIsLoading] = useState(true)

  // localStorage를 통해 diray라는 이름의 데이터 값을 모두
  useEffect(() => {
    const storedData = localStorage.getItem('diary')
    if (!storedData) {
      return;
    }

    const parsedData = JSON.parse(storedData)
    
    if (!Array.isArray(parsedData)) {

      setIsLoading(false)

      return;
    } 

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id)
      }
    })

    //console.log(maxId)

    idRef.current = maxId + 1;

    dispatch({
      type: 'INIT',
      data: parsedData,
    })

    setIsLoading(false)
  }, [])


  /********** localStorage로 저장 예시! **********/

  /********** localStorage.setItem - 값을 저장, localStorage.getItem - 값을 꺼냄 **********/
  /********** localStorage.setItem(key값, value값), localStorge.getItem(key값) **********/
  // key값은 원시타입밖에 들어가지 못해서, 무조건 문자열 or 숫자로만 넣어줘야함
  // localStorage.setItem('test', 'hello') // test라는 key값과 hello라는 value값
  
  /******* localStorage.setItem() *******/
  // localStorage.setItem('person',  JSON.stringify({name: '한상헌'})) // 이런식으로 "객체" 유형으로는 실제 localStorage에 담을 수 없다.
  // 이럴때는 "문자열"로 바꿔주면 좋다. JSON.stringlify()를 이용하여 "문자열"로 변환 시켜줌
  // 이에 대해 저장된 값은 개발자 도구에서 Aplication에 들어가면 확인해볼 수 있다.

  /******* localStorage.getItem() *******/
  // console.log(localStorage.getItem('test'))
  // console.log(localStorage.getItem('person'))
  // 이는 setItem으로 저장된 값을 getItem으로 불러오게 된다.
  // console로 출력값을 확인해보면 test였던 key값은 value값인 'hello'가 출력이 되고 person이었던 key값은 value값인 '{name: '한상헌'}'가 출력이 된다.


  /******* 추가 1 *******/
  // console.log(localStorage.getItem('test'))
  // console.log(JSON.parse(localStorage.getItem('person'))) // JSON.stringify와는 반대로 문자열을 다시 "파싱(parse)"시켜 원래대로인 "객체" 유형으로 반환시켜준다는 의미이다. 
  // 출력값은 객체 형태의 {name: 한상헌}이 출력된다.
  // JSON.parse(undefined 혹은 null)이면 오류가 뜬다!
  
  /******* 추가 2 *******/
  // localStorage.removeItem('test') // test라는 key값을 가진 데이터를 제거 or 직접 들어가서 키보드의 "<-Backspace"뒤로가기 키를 눌러도 없어짐 [확인 시, 없어져있음]



  // 새로운 일기 추가 [일기를 추가하기 위해선 날짜, 감정의 종류(id값으로 나눠짐), 문구 등이 있어야 함]
  const onCreate = (createdDate, emotionId, content) => {
    // 새로운 일기를 추가하는 기능
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    })
  }


  // 기존 일기 수정 [일기를 수정하기 위해선 id값, 날짜, 감정의 종류(id값으로 나눠짐), 문구 등 "모두" 있어야 함]
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  
  // 기존 일기 삭제 [일기를 삭제하기 위해선 id만 받아오면 되므로, 매개변수를 id만 설정]
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    })
  }


  // 새로고침 시, useDiary 커스텀 훅이 먼저 실행되서 "존재하지 않는 일기입니다."라는 문구가 뜨는 문제가 생겨서
  // 페이지가 loading하는 state를 만들어, 로딩 시 데이터가 로딩중인 div태그를 만들어줌 (문제 해결)
  if (isloading) {
    return <div>데이터 로딩중입니다...</div>
  }


  return (
    <>
      {/* <Header 
        title={'Header'}
        leftChild={<Button text={'Left'} />}
        rightChild={<Button text={'Right'} />}
      />


      <Button 
        text={'123'}
        type={'DEFAULT'}
        onClick={() => {
        console.log('123번 버튼 클릭!')
      }} 
      />

      <Button 
        text={'123'}
        type={'POSITIVE'}
        onClick={() => {
        console.log('123번 버튼 클릭!')
      }} 
      />

      <Button 
        text={'123'}
        type={'NEGATIVE'}
        onClick={() => {
        console.log('123번 버튼 클릭!')
      }} 
      /> */}


      {/* 이미지를 불러올 때, 기존 처럼 경로를 직접 써서 가져오지 말고, 이런식으로 데이터 형식으로 가져와야 한다. [최적화 우선] */}
      {/* DATA URI [이미지와 같은 외부 데이터들을 문자열 형태로 브라우저 메모리에 캐싱(저장)하기 위해 사용되는 포맷] */}
      {/* 개발자 도구 -> 네트워크 -> Img 클릭 및 상단의 로그 보존 클릭 -> 새로고침을 하게 되면 이미지 렌더링에 대한 정보를 확인할 수 있음 */}
      {/* 이는 "최적화"를 위해서 사용하기 때문에 이렇게 쓸 것 */}
      {/* <div>
        <img src={getEmotionImage(1)} />
        <img src={getEmotionImage(2)} />
        <img src={getEmotionImage(3)} />
        <img src={getEmotionImage(4)} />
        <img src={getEmotionImage(5)} />
      </div>

      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/new'}>New</Link>
        <Link to={'/diary'}>Diary</Link>
        <Link to={'*'}>Notfound</Link>
      </div>

      <button onClick={onClickButton}>
        // New 페이지로 이동
      </button> */}


      {/* <button onClick={() => {
          onCreate(new Date().getTime(), 1, '생성된 일기 입니다.')
        }}
      >
        일기 추가 테스트
      </button>

      <button onClick={() => {
        onUpdate(1, new Date().getTime(), 3, '수정된 일기 입니다.')
        }}
      >
        일기 수정 테스트
      </button>

      <button onClick={() => {
        onDelete(1) // id가 1번인 일기가 삭제됨
      }}
      >
        일기 삭제 테스트
      </button> */}



      {/* :id -> 동적 경로인 url 파라미터 */}
      
      {/* Context()를 이용하여 아래의 data의 state요소를 모든 페이지에 공급할 수 있도록 만들어준다.
      App 컴포넌트 아래에 "data"를 보내주는 <DiaryStateContext.Provider>와 
      각각의 기능이 들어간 "onCreate(), onUpdate(), onDelete()"를 보내주는 <DiaryDispatchContext.Provider>를 "Routes 전체를 감싸"준다.
      
      Context()를 사용하는 이유는 props로 일일히 컴포넌트를 연결하면, props drilling 현상이 발생하기 때문에 효율적이지 않다. 따라서, Context()를 사용

      이는 개발자 도구 -> Components 도구로 가서 직접 확인가능 */}
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{
          onCreate,
          onUpdate,
          onDelete,
        }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
