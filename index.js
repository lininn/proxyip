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
'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
"Host":"www.89ip.cn"
}
var page=req.query.page?req.query.page:1;
var thisOpts={
url:"http://www.89ip.cn/index_"+page+".html",
headers:headers
}

reqAction(thisOpts).then(data=>{
    var $=cheerio.load(data);//用cheerio解析页面数据
    var arr=[];

    $("tbody tr").each(function(index,element){//下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
       // console.log(element);
        var $eleItem=$(element).find('td').eq(0).html().replace(/[\t\n]/g,"");
        var $eleItemSon=$(element).find('td').eq(1).html().replace(/[\t\n]/g,"");
        arr.push(
            {
                ip:$eleItem+":"+$eleItemSon
            }
        );
    });
     
    /*测试*/
    try {
        var targetOptions = {
            method: 'GET',
            url: 'http://ningli.win',
            timeout: 22000
        };
    // console.log(proxyList);
    var proxyList=arr;
       var len=proxyList.length;
       var i=0;
        proxyList.forEach(function (obj) {
           var proxyurl=obj.ip;
            console.log(`testing ${proxyurl}`);
    
            targetOptions.proxy = 'http://' + proxyurl;
            request(targetOptions, function (error, response, body) {
                i++;
                console.log('body',body);
                try {
                   
                    if (error) throw error;
                    arr.push(proxyurl)
                  
                    body = body.toString();
                    var sqlStr='select * from iptable where ip="'+proxyurl+'"';
                    sql.select(sqlStr,"ips").then(res=>{
                            if(res["data"].length==0){
                                var sqlStr1='insert into iptable(ip) values("'+proxyurl+'")'
                                sql.select(sqlStr1,'ips').then(result=>{
                                    console.log("写入成功",proxyurl);
                                })
                            }
                    });
                    
                } catch (e) {
                     console.error('error-------'+e);
                }
                if(i>=len){
                 //   console.log(arr);
                }
    
            });
    
        });
    } catch (error) {
        console.log(error);
    }
    
res.send({"arr":arr});
}).catch(err=>{
console.log({"err":err});
})

})








app.listen(3005,()=>{
console.log("port 3005");
})


  
        
     