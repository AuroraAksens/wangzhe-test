const mongoose = require('mongoose');

// 创建模型
const schema = new mongoose.Schema({
    // 模型字段
    name:{ type: String},
    // mongoose.SchemaTypes.ObjectId 表示查找mongndb里的ID ref 表示关联要查的表
    parent: { type: mongoose.SchemaTypes.ObjectId,ref:'Category' }
})

// 导出模型
module.exports = mongoose.model('Category',schema)