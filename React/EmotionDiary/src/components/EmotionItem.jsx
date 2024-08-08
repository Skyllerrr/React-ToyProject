import './EmotionItem.css'
import { getEmotionImage } from '../util/get-emotion-image'


// EmotionItem의 isSelected 될 때, EmotionItem_on_emotionId의 emotionId값이 Editor.jsx에서 return문 안에 변수로 예를 들어, 현재는 Id의 값을 '1'로 지정해두었지만
// 유동적으로 변경될 때 마다 background-color도 그에 맞게 변경되는 부분이다.
const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ''}`}>

            <img className='emotion_img' src={getEmotionImage(emotionId)}/>
            <div className='emotion_name'>{emotionName}</div>
        </div>
    )
}

export default EmotionItem
