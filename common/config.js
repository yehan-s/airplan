let url_config = ""
 
if(process.env.NODE_ENV === 'development'){
    // 开发环境 配置ip地址端口号
     url_config = 'http://~~~~~:8080'
}else{
    // 生产环境
    url_config = 'http://~~~~~~:8080'
}
 
export default url_config