const mongoose = require('mongoose');

//定义模型字段只要是复数字段用数组包含对象形式
const schema = new mongoose.Schema({
    name:{ type: String},
    avatar:{ type: String}, //头像
    title:{ type:String},   //称号
    categories:[{ type: mongoose.SchemaTypes.ObjectId, ref:'Category'}], //关联分类模型
    scores: {                //评分
        difficult: { type:Number},  //难度
        skills:{ type:Number},   //技能
        attack:{ type:Number},   //攻击
        survive:{ type:Number},   //生存
    },
    skills:[{       //技能
        icon:{ type:String},  //技能图标
        name:{ type:String},  //技能名称
        description:{ type:String},  //技能描述
        tips:{type:String}  //技能小提示
    }],
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],  //顺风出装
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],  //逆风出装
    usageTips:{ type:String },  //使用技巧
    battleTips:{ type:String },  //对抗技巧
    teamTips:{ type:String },  //团战思路
    partners:[{   //最佳英雄搭档
        hero:{type:mongoose.SchemaTypes.ObjectId, ref:'Hero'},  //英雄选择
        description:{type:String},   //配合理由
    }]
})

module.exports = mongoose.model('Hero',schema)