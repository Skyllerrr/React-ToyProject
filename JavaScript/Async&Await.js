// async
// 어떤 함수를 비동기 함수로 만들어주는 키워드
// 함수가 프로미스를 반환하도록 변환해주는 키워드

async function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: '한상헌',
                id: 'hing',
            })
        }, 3000)
    })
}



// await
// async 함수 내부에서만 사용이 가능한 키워드
// 비동기 함수가 다 처리되기를 기다리는 역할

async function printData() {
    const data = await getData()
    
    console.log(data)
}

printData()


// 따라서, 위의 함수처럼 복잡하게 비동기 함수를 불러오는 것 보다
// 아래처럼 Async/Await 메소드를 사용하여 간단하게 불러올 수 있다.
