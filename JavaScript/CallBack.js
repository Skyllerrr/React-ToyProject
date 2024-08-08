/******* CallBack 함수 *******/

/* callback이라는 이름의 콜백 함수를 설정한 후, 아래에 value라는
변수를 통해 callback이라는 이름의 콜백 함수를 실행해준다. */
// function add(a, b, callback) {
//     setTimeout(() => {
//         const sum = a + b;
//         callback(sum)
//     }, 3000)
// }

// add(1, 2, (value) => {
//     console.log(value)
// });



// 연습) 음식을 주문하는 상황
// 3초 동안은 음식이 나오고, 그 이후 2초 동안은 음식을 식히고,
// 또 다시 그 이후, 1.5초 동안은 음식을 얼린다는 가정

// 콜백 지옥에 빠지는 단점!
function orderFood(callback) {
    setTimeout(() => {
        const food = '떡볶이';
        callback(food)
    }, 3000)
}

function cooldownFood(food, callback) {
    setTimeout(() => {
        const cooldownedFood = `식은 ${food}`
        callback(cooldownedFood)
    }, 2000)
}

function freezeFood(food, callback) {
    setTimeout(() => {
        const freezedFood = `냉동된 ${food}`
        callback(freezedFood)
    }, 1500)
}

orderFood((food) => {
    console.log(food)

    cooldownFood(food, (cooldownedFood) => {
        console.log(cooldownedFood)

        freezeFood(cooldownedFood, (freezedFood) => {
            console.log(freezedFood)
        })
    })
})

