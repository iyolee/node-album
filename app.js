const express = require('express');

const app = express();
const router = require('./controller/router');

app.set('view engine', 'ejs');

//静态页面
app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.get('/', router.showIndex);
app.get('/upload', router.showUpload);
app.get('/:albumname', router.showAlbum);
app.post('/upload', router.doPost);


app.use((req, res) => {
    res.render('error');
})

app.listen(8080, '127.0.0.1');