const express = require('express');
const fs = require('fs');
const app =express();

const dirPath = './storage/';

app.use(express.json());


//Register Check
app.post('/api/register', (req, res) => {
    let users= JSON.parse(fs.readFileSync(dirPath+'user.json'));
    var user = users.find(c => c.name ===req.body.name);
    if(!user) {
        if (fs.existsSync(req.body.path)) {
            let t_data = {"id": users.length+1 , "name" : req.body.name , "file" : req.body.path};
            users.push(t_data);
            fs.writeFileSync(dirPath+'user.json',JSON.stringify(users, null, 2));
            fs.appendFile(t_data.file, '[]', function (err) {
                if (err) throw err;
            });
            res.status(200).send(t_data);
        }
        else{
            let t_data = {"id": users.length+1 , "name" : req.body.name , "file" : dirPath+"User"+(users.length+1)+".json"};
            users.push(t_data);
            fs.writeFileSync(dirPath+'user.json',JSON.stringify(users, null, 2));
            fs.appendFile(t_data.file, '[]', function (err) {
                if (err) throw err;
            });
            res.status(200).send({"Status":"Your wished Directory is not present or Required Permission is not Satisfied","User Details":t_data});
        }
    }
    else res.status(400).send(user);
});

//File Size Check
function fileSize(fileName){
    var stats = fs.statSync(fileName)
    var fileSizeInBytes = stats.size;
    var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
    return  fileSizeInMegabytes<1024?true:false
}

//Create Item
app.post('/api/storage/create', (req, res) =>{
    let users= JSON.parse(fs.readFileSync(dirPath+'user.json'));
    var user = users.find(c => c.id ===req.body.id);
    if(!user) {
        res.status(404).send('User Not Found !!!');
    }
    if(!fileSize(user.file)) res.status(400).send('File Size Exceeds 1GB');
    else{
        const data = {
            key : req.body.key,
            data : req.body.data
        }
        let prevData = JSON.parse(fs.readFileSync(user.file));
        var keey = prevData.find(c => c.key ===data.key);
        if(!keey) {
            prevData.push(data);        
            fs.writeFileSync(user.file,JSON.stringify(prevData, null, 2));
            res.status(200).send(data);
        }
        else res.status(400).send('Element with same key present : key -> '+data.key);
    }

    
});


//Read Item
app.post('/api/storage/read', (req, res) =>{
    let users= JSON.parse(fs.readFileSync(dirPath+'user.json'));
    var user = users.find(c => c.id ===req.body.id);
    if(!user) {
        res.status(404).send('User Not Found !!!');
    }
    let prevData = JSON.parse(fs.readFileSync(user.file));
    var keey = prevData.find(c => c.key ===req.body.key);
    if(!keey) {
        res.status(404).send('No data found with this Key -> '+req.body.key);
    }
    res.status(200).send(keey);    
});


//Remove Item
app.post('/api/storage/remove', (req, res) =>{
    let users= JSON.parse(fs.readFileSync(dirPath+'user.json'));
    var user = users.find(c => c.id ===req.body.id);
    if(!user) {
        res.status(404).send('User Not Found !!!');
    }
    let prevData = JSON.parse(fs.readFileSync(user.file));
    var keey = prevData.find(c => c.key ===req.body.key);
    if(!keey) {
        res.status(404).send('No data found with this Key -> '+req.body.key+'. So no item Deleted ..');
    }
    let index = prevData.indexOf(keey); 
    if(index > -1) prevData.splice(index,1);
    fs.writeFileSync(user.file,JSON.stringify(prevData, null, 2));
    res.status(200).send({'status' : "successfully removed", "Item" :keey});

    
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`)); 
