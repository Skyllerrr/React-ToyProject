import './DiaryList.css'
import Button from "./Button"
import DiaryItem from './DiaryItem'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const DiaryList = ({ data }) => {
    const navigate = useNavigate()
    const [sortType, setSortType] = useState('latest')

    // select박스의 최신 순 및 오래된 순을 눌렀을 때, 일기장이 정렬되는 함수
    const onChangeSortType = (e) => {
        setSortType(e.target.value)
    }

    // select박스의 최신 순 및 오래된 순을 눌렀을 때, 일기장이 정렬되는 함수
    const getSortedData = () => {
        // toSorted() - 원본 배열을 그대로 냅두고, 정렬된 새로운 배열을 반환
        return data.toSorted((a, b) => {
            if (sortType === 'oldest') {
                return Number(a.createdDate) - Number(b.createdDate)
            } else {
                return Number(b.createdDate) - Number(a.createdDate)
            }
        })
    }

    // 결과값을 sortedData에 담은 후, 아래를 보면 list_wrapper에 데이터를 뿌려줌
    const sortedData = getSortedData()


    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button onClick={() => navigate('/new')} text={"새 일기 쓰기"} type={"POSITIVE"} />
            </div>
            <div className="list_wrapper">
                {sortedData.map((item) => (
                    <DiaryItem key={item.id} {...item} /> // React에서는 이렇게 List 형태로 컴포넌트를 렌더링할 때, 각각의 모든 아이템에 반드시 고유한 "key값"이 들어가야함
                ))}
            </div>
        </div>
    )
}

export default DiaryList
