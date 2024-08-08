import './Header.css'
import { memo } from 'react'

const Header = () => {
    return (
        <div className="Header">
            <h3>오늘은 📆</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    )
}


// 불필요한 메모이징을 방지하기 위해 설정 (리렌더링이 여러 번 되지 않음)
export default memo(Header)
