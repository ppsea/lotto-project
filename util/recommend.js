import data from "../data.json";
function recommend(type, likeArray) {
  //어떤 배열을 보내도 6개 * 5개의 배열을 리턴
  //  [ [], [], [], [], [] ]
  let resultArray = [];
  if (type == "trend") {
    //최근 10개중 가장 많은 3개 숫자들을 배열로 리턴
    let currentArray = [
      ...data
        .sort((a, b) => b.drwNo - a.drwNo)
        .filter((i, index) => index < 10),
    ];
    for (let i = 0; i < 5; i++) {
      resultArray = [...resultArray, makeOneArray(make3Numbers(currentArray))];
    }
  } else if (type == "many") {
    //모든 데이터 중 가장 많은 3개 숫자들을 배열로 리턴
    let currentArray = [...data];
    for (let i = 0; i < 5; i++) {
      resultArray = [...resultArray, makeOneArray(make3Numbers(currentArray))];
    }
  } else if (type == "random") {
    //랜덤한 6개 숫자들의 배열
    for (let i = 0; i < 5; i++) {
      resultArray = [...resultArray, makeRandomArray()];
    }
  } else if (type == "like") {
    //좋아하는 숫자가 포함된 배열
    let currentArray = [...likeArray];
    for (let i = 0; i < 5; i++) {
      resultArray = [...resultArray, makeOneArray(currentArray)];
    }
  }
  return resultArray;
}
//로또 데이터를 활용해서 가장 많은 3개를 픽하자.
function make3Numbers(array) {
  let thisArray = [...array];
  let firstCountArray = thisArray.map((i) => i.drwtNo1);
  let secondCountArray = thisArray.map((i) => i.drwtNo2);
  let thirdCountArray = thisArray.map((i) => i.drwtNo3);
  let fourthCountArray = thisArray.map((i) => i.drwtNo4);
  let fifthCountArray = thisArray.map((i) => i.drwtNo5);
  let sixthCountArray = thisArray.map((i) => i.drwtNo6);
  let bonusCountArray = thisArray.map((i) => i.bnusNo);

  //전체배열
  let sumOfAllArray = [
    ...firstCountArray,
    ...secondCountArray,
    ...thirdCountArray,
    ...fourthCountArray,
    ...fifthCountArray,
    ...sixthCountArray,
    ...bonusCountArray,
  ];

  //개수 카운팅
  let counts = {};

  //object에 데이터 넣어주기
  // sumOfAllArray.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
  for (let i = 0; i < sumOfAllArray.length; i++) {
    if (counts[sumOfAllArray[i]] == undefined) {
      counts[sumOfAllArray[i]] = 1;
    } else {
      counts[sumOfAllArray[i]] = counts[sumOfAllArray[i]] + 1;
    }
  }
  let resultArray = [];
  //object에서 배열로 넣어주고
  //카운트가 높은 순서로 정렬
  resultArray = [
    ...Object.keys(counts).map((key) => ({
      number: Number.parseInt(key),
      count: counts[key],
    })),
  ].sort((a, b) => b.count - a.count);
  //높은 순위 20개 뽑아서 랜덤 3개 추리기
  resultArray = shuffleArray(resultArray.slice(0, 20));
  //결과값은 숫자만
  return [...resultArray].slice(0, 2).map((i) => i.number);
}

//주어진 배열값은 제외하고 6개의 숫자배열 리턴
function makeOneArray(array) {
  //1~45
  let totalNumbersArray = Array.from("x".repeat(45), (v, i) => i + 1);
  //현재 array에 포함된 숫자는 제거
  let filteredArray = totalNumbersArray.filter(
    (i) => array.find((j) => i == j) == undefined
  );
  filteredArray = shuffleArray(filteredArray).slice(0, 6 - array.length);
  return [...array, ...filteredArray].sort((a, b) => a - b);
}

function makeRandomArray() {
  //1~45
  let totalNumbersArray = Array.from("x".repeat(45), (v, i) => i + 1);
  totalNumbersArray = shuffleArray(totalNumbersArray);
  return totalNumbersArray.slice(0, 6).sort((a, b) => a - b);
}

function shuffleArray(array) {
  let currentArray = [...array];
  for (let i = currentArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
  }
  return currentArray;
}

export default recommend;
