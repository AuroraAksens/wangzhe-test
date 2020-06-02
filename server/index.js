const express = require('express');
const http = require('http');
// const https =require('https');
// const fs = require('fs');

const app = express();

   //set表示在express中设置一个变量()前面为变量名，后面为值
app.set('tk','a8dh1idunasfdg')

app.use(require('cors')());
app.use(express.json());


// const options = {
//     cert:fs.readFileSync('3607773_www.yaozehui.com.pem'),
//     key:fs.readFileSync('3607773_www.yaozehui.com.key')
// }


app.use('/uploads', express.static( __dirname + '/uploads'));
app.use('/admin', express.static( __dirname + '/admin'));
app.use('/', express.static( __dirname + '/web'));


require('./plugins/db')(app)
require('./router/admin')(app)
require('./router/web')(app)


app.listen(3000,()=>{
    console.log('后端开启在：3000');
})

http.createServer(app).listen(8080);
// https.createServer(options,app).listen(8080)