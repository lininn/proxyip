
var request=require("request");
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


var headers={
'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
}
var page=0;
let timer=setInterval(()=>{
    page++;
    console.log(page);
    var thisOpts={
        url:"http://ip.ningli.win/?page="+page,
        headers:headers
        }
    reqAction(thisOpts).then(data=>{
        console.log(data);
    }).catch(err=>{
      console.log({"err":err});
    })
    if(page>=125){
        clearInterval(timer);
    }
},1000)



// try {
//     var targetOptions = {
//         method: 'GET',
//         url: 'http://ningli.win',
//         timeout: 22000
//     };
// // console.log(proxyList);
// var proxyList=arr;
//    var len=proxyList.length;
//    var i=0;
//     proxyList.forEach(function (obj) {
//        var proxyurl=obj.ip;
//         console.log(`testing ${proxyurl}`);

//         targetOptions.proxy = 'http://' + proxyurl;
//         request(targetOptions, function (error, response, body) {
//             i++;
//             console.log('body',body);
//             try {
               
//                 if (error) throw error;
//                 arr.push(proxyurl)
              
//                 body = body.toString();
//                 var sqlStr='select * from iptable where ip="'+proxyurl+'"';
//                 sql.select(sqlStr,"ips").then(res=>{
//                         if(res["data"].length==0){
//                             var sqlStr1='insert into iptable(ip) values("'+proxyurl+'")'
//                             sql.select(sqlStr1,'ips').then(result=>{
//                                 console.log("写入成功",proxyurl);
//                             })
//                         }
//                 });
                
//             } catch (e) {
//                  console.error('error-------'+e);
//             }
           

//         });

//     });
// } catch (error) {
//     console.log(error);
// }





  
        
     