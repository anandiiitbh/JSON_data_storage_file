# JSON_data_storage_file

>NodeJs(ExpressJs) API to storer Key-value pair that Supports the Basic CRD(Create, Read, Delete) Operations, Data is stored on local storage on User Define Path;

> Supports Following Functional Requirements:

- User Registration 
```Javascript
POST->  http://localhost:3000/api/register
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "name":"UserName",                    //required
    "path" : "/Path/Of/Directory/"       // Path of directory is Optional
}
```

- Create And Store New Key-Value pair 
```Javascript
POST->  http://localhost:3000/api/storage/create
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "id" : 1,  //UserID (required)
    "key":"rockln",
    "data" :{
        "key":"rock",
        "data" :" saver"
    }
}

Path of directory is Optional
```
