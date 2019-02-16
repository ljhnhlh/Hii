var p1 = new Promise(function(resolve, reject) {
    p1 = [5, 6, 7]
    resolve(p1)
});
var p2 = new Promise(function(resolve, reject) {
    p2 = [1, 2, 3, 4]
    resolve(p2)
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function(results) {
    console.log(results[1][1]); // 获得一个Array: ['P1', 'P2']
});