module.exports = app => {
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    const Admin = require('../../models/Admin');
    const express = require('express');
    const router = express.Router({
        mergeParams: true 
    });


    // 添加
    router.post('/', async (req, res) => {
        const model = await req.modelset.create(req.body);
        res.send(model)
    })

    //查询
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.modelset.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const model = await req.modelset.find().setOptions(queryOptions).limit(100)
        res.send(model)
    })

    //根据id查询
    router.get('/:id', async (req, res) => {
        const model = await req.modelset.findById(req.params.id);
        res.send(model);
    })

    // 更新
    router.put('/:id', async (req, res) => {
        const model = await req.modelset.findByIdAndUpdate(req.params.id, req.body);
        res.send(model)
    })

    // 删除
    router.delete('/:id', async (req, res) => {
        await req.modelset.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        })
    })


    //处理登录
    const authLogin = async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        const { id } = jwt.verify(token, app.get('tk'))
        assert(id, 401, '请先登录')
        req.user = await Admin.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }

    //处理模型路径
    const resourceRouter = async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.modelset = require(`../../models/${modelName}`)
        next()
    }

    app.use('/admin/api/rest/:resource', authLogin, resourceRouter, router)

    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authLogin, upload.single('file'), async (req, res) => {
        const file = req.file
        // file.url = `http://localhost:3000/uploads/${file.filename}`
           file.url = `http://yaozehui.com:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body

        const user = await Admin.findOne({ name: username }).select('+password')  

        assert(user, 422, '用户不存在')

        // const isVal = require('bcrypt').compareSync(password, user.password)

        // assert(isVal, 422, '密码错误')
        const token = jwt.sign({ id: user._id }, app.get('tk'))
        res.send({ token })
    })

    //错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}