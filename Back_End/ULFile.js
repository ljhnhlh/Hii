var app = require('express')();
var bodyParser = require('body-parser');
var formidable = require('formidable')
var fs = require('fs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ULFile', function(req, res) {
    // console.log(req);
    //formidable 确实可以
    console.log(req.body);
    // req.addListener('data',function (data) {
    //     console.log(data.toString());
        
    //   })
    var form = formidable.IncomingForm()
//     form.on('file', function(name, file) {
//         // console.log(1);
//         // console.log(fi);
//     });
    form.parse(req,function (err,fields,files) {

        console.log(files);
      })
// form.onPart = function(part) {
//     part.addListener('data', function(data) {
//       console.log(data);
      
//     });
//   }
//     var str;
//     req.on('data',function (data) {
//         str += data;
//       })
//       req.on('end',function () {
          
//           fs.writeFile('./static/img/img.png',new Buffer(str,'utf-8'),function () {
//               console.log('success');
              
//             });
//         })
        
    res.end('success');
});


app.listen(8000);
console.log('listen on 8000');