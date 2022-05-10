function getShuffledArr(arr) {
    return arr.reduce(
        (newArr, _, i) => {
            var rand = i + (Math.floor(Math.random() * (newArr.length - i)));
            [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]]
            return newArr
        }, [...arr]
    );
};

module.exports = getShuffledArr;