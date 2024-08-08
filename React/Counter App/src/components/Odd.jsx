import { useEffect } from "react"

const Odd = () => {
    useEffect(() => {

        // 클린업, 정리함수
        return () => {
            console.log('unmount')
        };    
    }, [])
    
    return (
        <div>홀수입니다.</div>
    )
}

export default Odd
