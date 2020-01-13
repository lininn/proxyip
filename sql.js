function select(sql,database) {
    var promise = new Promise(function(resolve,reject) {
        var result = null;
        var mysql = require('mysql');
        var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Aa979611181!'
        });

        connection.connect();
        connection.query("USE "+database);//使用php数据库
        connection.query(sql, function (err, results, fields) { 
            if (err) { 
                console.log("err");
                reject(err); 
            }else {
                data=[];
                if(results.length > 0) {
                    for(var i=0;i<results.length;i++){
                        data.push(results[i]);
                    };
                    //res.write(data);
                    resolve({status:"200",data:data});
                }else {
                    resolve({status:"200",data:[]});
                }           
            } 
        } 
        );
        connection.end(); 
    })

    return promise; 
}
module.exports={
    select
}
// select("select * from iptable").then(function(data){
//     console.log(data);
// }).catch(function(){
// console.log({err:"数据库连接错误!"});
// });
