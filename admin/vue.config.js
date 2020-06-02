module.exports={
    devServer:{
        port:'9999',
        host:'localhost',
        open:true,
    },
    outputDir:__dirname + '/../server/admin',
        publicPath: process.env.NODE_ENV === 'production'
          ? '/admin/'
          : '/',
}