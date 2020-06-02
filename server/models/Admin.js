const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name:{ type: String},
    password:{type : String, 
        // select: false,表示默认查询数据的时候不要带有这个字段
        select: false,
        // set为自定义函数保存
        set(val){
            // bcrypt引入加密中间件
            return require('bcrypt').hashSync(val,10)
        }}
})

module.exports = mongoose.model('Admin', Schema)