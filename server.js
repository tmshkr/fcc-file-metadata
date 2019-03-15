'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');

var app = express();

var storage = multer.memoryStorage();
var upload = multer({ storage });

app.use(cors());

app.use(express.static('public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/public/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
   res.json({
    'name' : req.file.originalname,
    'type' : req.file.mimetype,
    'size' : req.file.size
   });
});

app.use((req, res) => {
   res.status(404);
   res.type('txt').send('Not found');
 });


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
