var request = require("request");
var iconv = require('iconv-lite');
var Promise = require("bluebird");
var arr=[];
var sql=require("./sql");
// sql.select("select * from iptable","ip").then(res=>{
//     console.log(res);
// });
function getProxyList() {
    var apiURL = '';

    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: apiURL,
            gzip: true,
            encoding: null,
            headers: {
               // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                //'Accept-Encoding': 'gzip, deflate',
                //'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
               // 'User-Agent': 'Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
               // 'referer': 'http://www.66ip.cn/',
//'cookie':'yd_cookie=05e6639e-848d-48585a8dd83b82f4a8c7d2cf196d74d83ee8; Hm_lvt_1761fabf3c988e7f04bec51acd4073f4=1549174243; Hm_lpvt_1761fabf3c988e7f04bec51acd4073f4=1549174380; _ydclearance=562d0b4456ca1cc873e260da-4915-47f9-9b27-ae7cecbbce3d-1549191147'
"Host": "www.66ip.cn",
"Connection": "keep-alive",
"Cache-Control": "max-age=0",
"Upgrade-Insecure-Requests": 1,
"User-Agent":" Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
"Accept-Encoding":" gzip, deflate",
"Accept-Language":" zh-CN,zh;q=0.9",
"Cookie": "__jsluid_h=59e286cd739f2918871fb535925e3d35; __jsl_clearance=1563286797.711|0|k5VKjZdl3Ed%2BoXz2EyC50exA4cs%3D",
"Referer":" http://www.66ip.cn/mo.php?sxb=&tqsl=40000&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D100%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1"
    
        },

        };

        request(options, function (error, response, body) {
            try {

                if (error) throw error;

                if (/meta.*charset=gb2312/.test(body)) {
                    body = iconv.decode(body, 'gb2312');
                }
                // console.log(response);
                var ret = body.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);


                resolve(ret);

            } catch (e) {
                return reject(e);
            }


        });
    })
}


getProxyList().then(function (proxyList) {
  
    var targetOptions = {
        method: 'GET',
        url: 'http://lininn.cn',
        timeout: 12000,
        encoding: null,
    };
// console.log(proxyList);
   var len=proxyList.length;
   var i=0;
    proxyList.forEach(function (proxyurl) {
       
        console.log(`testing ${proxyurl}`);

        targetOptions.proxy = 'http://' + proxyurl;
        request(targetOptions, function (error, response, body) {
            i++;
            try {
               
                if (error) throw error;
                arr.push(proxyurl)
              
                body = body.toString();
                var sqlStr='select * from iptable where ip="'+proxyurl+'"';
                sql.select(sqlStr,"ip").then(res=>{
                        if(res["data"].length==0){
                            var sqlStr1='insert into iptable(ip) values("'+proxyurl+'")'
                            sql.select(sqlStr1,'ip').then(result=>{
                                console.log("写入成功",result);
                            })
                        }
                });
                //console.log(body);

                eval(`var ret = ${body}`);

             
                if (ret) {
                   
                    console.log(` ${ret.address}`);
                }
            } catch (e) {
                 console.error('error-------'+e);
            }
            if(i>=len){
                console.log(arr);
            }

        });

    });
    console.log(okArr);
   
}).catch(e => {
    console.log(e);
})
