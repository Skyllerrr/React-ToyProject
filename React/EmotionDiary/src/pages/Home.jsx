// import { useSearchParams } from "react-router-dom"
import { useState, useContext } from "react"
import { DiaryStateContext } from '../App'

import Header from "../components/Header"
import Button from '../components/Button'
import DiaryList from "../components/DiaryList"

import usePageTitle from "../hooks/usePageTitle"

const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth(),
        1, // 1일 0시 0분 0초의 데이터를 저장
        0,
        0,
        0
    ).getTime()

    const endTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() + 1, // 가장 마지막날을 계산해야하는데, 0일이라는 값은 없으므로 최소 1일부터는 저장이 되어야하기 때문에
        // getMonth()에 +1을 지정해주었다.
        0, // 0일 23시 59분 59초의 데이터를 저장
        23,
        59,
        59
    ).getTime()

    // mockData에 있는 데이터 중, 해당 달(월)에 쓰인 일기장들만 보여주고, 다른 달(월)로 넘어가면 전 달(월)에 쓴 일기는 안보이도록
    return data.filter((item) => (beginTime <= item.createdDate) && (item.createdDate <= endTime))
}

const Home = () => {
    // useSearchParams() -> useParams()     // 훅과 기본 기능은 동일하지만, QueryString기법으로 이용한 방법이다.
    // const [params, setParams] = useSearchParams()
    // console.log(params.get('value'))

    // 헤더의 날짜 데이터 상태관리
    const [pivotDate, setPivotDate] = useState(new Date())

    // useContext() - DiaryStateContext로 부터 data를 공급받을 수 있다.
    const data = useContext(DiaryStateContext)

    const monthlyData = getMonthlyData(pivotDate, data)
    //console.log(monthlyData)


    usePageTitle('감정 일기장')


    //오른쪽 버튼을 눌렀을 때, 년도는 그대로이며 월은 1씩 늘어남
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
    }

    //왼쪽 버튼을 눌렀을 때, 년도는 그대로이며 월은 1씩 줄어듬
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
    }

    return (
        <div>
            <Header 
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button onClick={onDecreaseMonth} text={"<"} /> }
                rightChild={<Button onClick={onIncreaseMonth} text={">"} /> }
            />
            <DiaryList data={monthlyData} />
        </div>
    )
}

export default Home
