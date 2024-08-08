/******* Promise (비동기) *******/

function add10(num) {
    const promise = new Promise((resolve, reject) => {
        // 비동기 작업 실행하는 함수
        // executor
    
        setTimeout(() => {

    
            if (typeof num === 'number') {
                resolve(num + 10)
            } else {
                reject ('num이 숫자가 아닙니다')
            }
        }, 2000)
    })

    return promise;
}


add10(0)
    .then((result) => {
    console.log(result)

    return add10(result)
    // 결과값을 return하지 않으면, p함수의 promise가 출력이 되는데 
    // return하는 새로운 promise를 넣게 되면, 여기서 p함수를 newP이라는 이름의 promise 결과 값으로 출력이 됨. 
    })
    .then((result) => {
    console.log(result)

    return add10(result)
})
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })



// then 메서드
// -> 그 후에 (라는 뜻)
// promise
//     .then((value) => {
//         console.log(value)
//     })
//     .catch((error) => {
//         console.log(error)
//     })

// catch 메서드의 내용이 실행 => error가 없으니 결과적으로 20이 출력
