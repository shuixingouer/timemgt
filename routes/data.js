
function readName(){
    console.log('读取文件名称');

    var allArr= fs.readdirSync('./data/detail/');
    //console.log(allArr);
    var allArr=fileEach(allArr);
    //console.log(aaArrno);
    return allArr;
}

function fileEach(files){
    var str=[];
    var type;
    files.forEach(function (file) {
        var filePath = path.normalize('./data/detail/' + file);
        str+=","+JSON.stringify(readFile(file));
        return str;
    });
    var allArr=[];
    allArr=eval("["+str.substr(1)+"]");
    allArr.sort(function(a,b){
        return b.id- a.id;
    });
    //console.log(allArr);
    return allArr;
}

function readFile(file){
    //console.log('读取文件内容');
    var json_data;
    json_data = JSON.parse(fs.readFileSync('./data/detail/'+ file, {flag: 'r+', encoding: 'utf8'}).toString());
    return {
        "id": json_data.data.id,
        //"images": json_data.data.images,
        "title": json_data.data.title,
        "desc": json_data.data.desc,
        "time": json_data.data.time,
        "type": json_data.data.type
    };
}


