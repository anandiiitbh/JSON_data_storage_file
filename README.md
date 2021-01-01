# JSON(Key-Value)_data_storage_system_(API)

>NodeJs(ExpressJs) API to storer Key-value pair that Supports the Basic CRD(Create, Read, Delete) Operations, Data is stored on local storage on User Define Path;

- Supports Following Functional Requirements:

> User Registration 
```Javascript
POST->  http://localhost:3000/api/register             //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "name":"UserName",                    //(required)
    "path" : "/Path/Of/Directory/"        // Path of directory is (Optional)
}
```

> Create And Store New Key-Value pair 
```Javascript
POST->  http://localhost:3000/api/storage/create       //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT`
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "id" : 1,                            //UserID (required)
    "key":"Key1",                        //Key (required)
    "data" :{                            //Value (required)
        "Name":"Anand",
        "Course" :" BTech"
    }
}
```

> Read Operation API call
```Javascript
POST->  http://localhost:3000/api/storage/read             //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT`
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "id":1,                             //UserID (required)
    "key":"Key1"                        //Key of the data to fetch (required)
}
```


> Delete Operation API call
```Javascript
POST->  http://localhost:3000/api/storage/remove             //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "id" : 1,                       //UserID (required)
    "key":"Key1"                    //Key of the data to be deleted (Required)
}
```


- Implemented Non Functional Requirement 

> The Size of File Storing data will never exceed `1GB`
```Javascript
//File Size Check Befor Data Storing 
function fileSize(fileName){
    var stats = fs.statSync(fileName)
    var fileSizeInBytes = stats.size;
    var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
    return  fileSizeInMegabytes<1024?true:false
}
```

> More than one client process cannot be allowed to use same file to write
```Javascript
//This is achieved by using synchronize methods to write and read data of nodeJs (File System)
fs.writeFileSync(dirPath+'user.json',JSON.stringify(users, null, 2));
fs.readFileSync(dirPath+'user.json')
```
