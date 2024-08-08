import './App.css'
import Viewer from './components/Viewer'
import Controller from './components/Controller'
import { useState } from 'react'

// 기능을 구현하기에 앞서, 현재 이 카운터앱은 숫자의 +버튼이나 -버튼을 클릭했을 때, 숫자가 실시간으로 리렌더링해서 변화해야하는데
// 그럼 이 리렌더링으로 변화하는 숫자를 어떤 컴포넌트에 state를 적용해야할지 찾아본다면, 후보는 3가지 컴포넌트가 있다. 
// [1. 최상위 부모인 App 컴포넌트, 2. 숫자가 직접적으로 변경되는 부분이 확인되는 Viewer 컴포넌트, 3. 숫자를 직접 카운트하는 Controller 컴포넌트]
// 여기서 state는 1번인 App 컴포넌트에 적용을 시켜줘야하는데, 그 이유는 현재 Viewer와 Controller 컴포넌트는 둘 다 App 컴포넌트의 자식 관계(서로는 형제 관계)이므로 
// 서로를 공유할 수 있는 수단이 없기 때문에, 부모 컴포넌트인 App 컴포넌트에서 state를 적용시켜 변화를 줘야 한다.

// 앞서 말한 이유에서 더 상세하게 설명하자면, React에서 다른 요소를 가져오거나 state를 가져오기 위해서는 "props"를 이용해야 하는데 이 props는 "부모에서 자식으로"만 가져올 수 있기 때문에
// 부모 컴포넌트인 App 컴포넌트에서 props로 가져와 Viewer 혹은 Controller 컴포넌트에 적용을 시킬 수 있다.


function App() {
  const [count, setCount] = useState(0)

  // Controller 컴포넌트에는 버튼 클릭 시, 변경을 조작해야 할 setCount state와 클릭 시, 변경이 되어야 할 count props, 둘 다 필요하기 때문에
  // 이 처럼 onClickButton이라는 이름으로 value라는 매개변수에 버튼에 있는 count를 값이 바뀔때마다 + 혹은 - 되는 value값(현재, Controller 컴포넌트에 onClickButton()의 ()안 숫자가 인수가 된다. 지금 현재, 버튼 마다 -1, -10 ...)을 더해주는 함수를 만든다.
  // 이를 아래에서 Controller 컴포넌트에 props로 넘겨준다.

  // value, index 등 자신이 원하는 값의 이름을 지정
  const onClickButton = (value) => {
    setCount(count + value)
  }
  
  return (
    <div className='App'>
      <h1>Simple Counter</h1>
      <section>
        <Viewer count={count}/>
      </section>
      <section>
        <Controller onClickButton={onClickButton}/>
      </section>
    </div>
  )
}

export default App
