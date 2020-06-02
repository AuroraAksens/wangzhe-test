module.exports= app =>{
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/quanzhan',{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })


    //require-all模块  表示应用文件夹内的所有模块
    require('require-all')(__dirname + '/../models')
    
    
}