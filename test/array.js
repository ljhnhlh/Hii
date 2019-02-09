// // var temp = [];
// // temp['ads'] = new Array();
// // temp['ads'].push('da');
// // temp['ads'].push('ddd');
// // temp['ads'].push([{ 'a': 'a', 'b': 'b' }, { 'c': 'c', 'd': 'd' }])
// //     //     // var a = temp['abs'].shift();
// //     // var a = new Array('a', 'b', 'c', 'd');
// //     // a.push([{ 'a': 'a', 'b': 'b' }, { 'c': 'c', 'd': 'd' }])
// //     //     // temp = a.slice();
// //     //     // temp = a.slice(1, 3)
// // temp['ads']['ads'] = 'aaaaaaaaaa';
// // temp['ads'].push('as');
// // temp['ads']['bbs'] = 'asdfaskldjf';
// // temp['ads'].push('asdfjksd');
// // console.log(temp);


// // // console.log(a);
// var temp = [];
// temp['ads'] = new Array();
// temp['ads'].push('da');
// temp['ads'].push('ddd');
// temp['ads'].push([{ 'a': 'a', 'b': 'b' }, { 'c': 'c', 'd': 'd' }])
// temp['ads']['ads'] = 'aaaaaaaaaa';
// console.log(temp)


// temp['ads'].push('as');
// console.log(temp)
// temp['ads']['bbs'] = 'asdfaskldjf';
// console.log(temp)
// temp['ads'].push('asdfjksd');
// console.log(temp);
// temp['ads'][5] = 'sldkjfkl';
// console.log(temp);

var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.push({ 'a': 'a', 'b': 'b' })
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false
console.log(arr);
arr['abs'] = [];
arr['abs']['ad'] = 'sadf'
arr['abs']['ada'] = 'sadf'
arr['abs']['ada'] = 'sadf'
arr['abs'].push({ 'a': 'a', 'b': 'b' })
console.log(arr['abs'].splice(0, 1));
console.log(arr['abs'].indexOf('sadf'));