import './Editor.css'
import EmotionItem from './EmotionItem'
import Button from './Button'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { emotionList } from '../util/constants'

import { getStringedDate } from '../util/get-stringed-date'

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate()

    const [input, setInput] = useState({
        createdDate : new Date(), 
        emotionId : 1, // 감정 초기값
        content : ""
    })


    {/* 업로드 된 일기의 수정하기 버튼을 클릭했을 때, 날짜 및 감정 및 컨텐츠가 초기화 되지않고 그대로 보여주도록 */}
    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                createdDate : new Date(Number(initData.createdDate))
            })
        }
    }, [initData])


    // "오늘의 날짜" 부분을 바꿀 때, 정상적으로 바뀌는 함수
    const onChangeInput = (e) => {
        //console.log(e.target.name) // 어떤 요소에 입력이 들어온건지 확인
        //console.log(e.target.value) // 입력된 값이 무엇인지 확인

        let name = e.target.name
        let value = e.target.value

        if (name === 'createdDate') {
            value = new Date(value)
        }

        setInput({
            ...input,
            [name]: value,
        })
    } 


    const onClickSubmitButton = () => {
        onSubmit(input)
    }

    //const emotionId = 1
    

    return (
        <div className='Editor'>
            <section className='date_section'>
                <h4>오늘의 날짜</h4>
                {/* value값 - 업로드 된 일기의 수정하기 버튼을 클릭했을 때, 날짜 및 감정 및 컨텐츠가 초기화 되지않고 그대로 보여주도록 */}
                <input name='createdDate' onChange={onChangeInput} value={getStringedDate(input.createdDate)} type="date" />
            </section>
            <section className='emotion_section'>
                <h4>오늘의 감정</h4>
                <div className='emotion_list_wrapper'>
                    {emotionList.map((item) => 
                    <EmotionItem
                     onClick={() => onChangeInput({
                        target : {
                            name : 'emotionId',
                            value : item.emotionId
                        }
                     })}
                     key={item.emotionId} {...item} 
                     isSelected={item.emotionId === input.emotionId} />)}

                    {/* props를 하나하나 보내주는 대신, 위 처럼 emotionList라는 객체를 새로 만들어서 데이터를 넣어주고 map 메소드를 통해 EmotionItem 컴포넌트안에 돌려주는게 더 효율적 */}

                    {/* <EmotionItem emotionId={1} emotionName={'완전 좋음'} />
                    <EmotionItem emotionId={2} emotionName={'좋음'} />
                    <EmotionItem  />
                    <EmotionItem  />
                    <EmotionItem  /> */}
                </div>
            </section>
            <section className='content_section'>
                <h4>오늘의 일기</h4>
                <textarea 
                name='content'
                value={input.content}
                onChange={onChangeInput}
                placeholder='오늘은 어땠나요?'></textarea>
            </section>
            <section className='button_section'>
                <Button onClick={() => navigate('/')} text={"취소하기"} />

                {/* "작성완료" 버튼을 클릭했을 때의 과정 - 즉, 새로운 일기를 썼을 때 작성된 일기가 나와있는 메인 화면에 들어가는 과정 및 결과 (중요!)
                1. 먼저, Editor 컴포넌트에 사용자가 입력하는 내용은 상단의 useState로 만든 input에 보관
                2. 컴포넌트 하단 즉, 여기 바로 밑에있는 onClickSubmitButton() 함수를 실행
                3. onClickSubmitButton() 함수는 상단에 보면, 부모 컴포넌트로 props를 받은 onSubmit()이라는 함수를 호출하면서 인수로는 현재 "input" state값을 전달 
                4. 이 onSubmit() 함수는 new 컴포넌트에 정의가 되어있는데, 함수의 호출 과정은 useContext() 훅을 사용하여 App 컴포넌트에서 공급받은 onCreate() 함수가 호출이 되면서 
                실제로 일기 데이터가 정상적으로 추가가 됨 */}
                <Button onClick={onClickSubmitButton} text={"작성완료"} type={'POSITIVE'} />
            </section>
        </div>
    )
}

export default Editor
