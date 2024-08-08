// App 컴포넌트에서 만든 onClickButton함수를 props로 받아와서 button에 onClick 이벤트 안에 함수를 넣어주면 정상적으로 카운트가 작동이 된다.

const Controller = ({onClickButton}) => {
    return (
        <div>
            <button 
                onClick={() => {
                    onClickButton(-1)
            }}>-1</button>
            <button onClick={() => {
                    onClickButton(-10)
            }}>-10</button>
            <button onClick={() => {
                    onClickButton(-100)
            }}>-100</button>
            <button onClick={() => {
                    onClickButton(+100)
            }}>+100</button>
            <button onClick={() => {
                    onClickButton(+10)
            }}>+10</button>
            <button onClick={() => {
                    onClickButton(+1)
            }}>+1</button>
        </div>
    )
}

export default Controller
