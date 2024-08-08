/* 기존에는 util폴더에 get-emotion-image라는 js파일에다가 감정들의 변화에 따라 이미지가 바뀌는 데이터들을 만들어놨는데,
props를 하나하나 가져오지 않고, 이를 그냥 여기에 간단하게 다시 만들어서 map메소드로 돌릴 수 있도록 만들어준다.*/
/* 또한, 이미지들만 가져오는 get-emotion-image.js 와는 달리 감정의 번호를 정해주고 이에 맞는 감정의 이름을 데이터로 만들어준다. */
export const emotionList = [
    {
        emotionId: 1,
        emotionName: "완전 좋음"
    },
    {
        emotionId: 2,
        emotionName: "좋음"
    },
    {
        emotionId: 3,
        emotionName: "그럭저럭"
    },
    {
        emotionId: 4,
        emotionName: "나쁨"
    },
    {
        emotionId: 5,
        emotionName: "끔찍함"
    },
]
