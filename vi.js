var express=require("express");
var app=express();
var request=require("request");
var cheerio=require('cheerio');
var sql=require("./sql");
function reqAction(opts){
var pro=new Promise(function(resolve,reject){
request(opts,(err,res,body)=>{
if(body){
resolve(body);
}
})
});
return pro;
}


app.get("/",(req,res,err)=>{
var headers={
'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
}
var page=req.query.page?req.query.page:1;
var thisOpts={
url:"http://www.mtyvideo.com/meinv/qingchun/page/"+page+"/",
headers:headers
}

reqAction(thisOpts).then(data=>{
    var $=cheerio.load(data);//用cheerio解析页面数据
    var arr=[];

    $("article").each(function(index,element){//下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
       // console.log(element);
        var $eleItem=$(element).find('.thumbnail img').attr('src');
        arr.push(
            {
                'src':eleItem
            }
        );
    });
     
    /*测试*/

res.send(arr);
}).catch(err=>{
console.log({"err":err});
})

})








app.listen(3005,()=>{
console.log("port 3005");
})


  
        
     