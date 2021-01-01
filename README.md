# JSON_data_storage_file

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
