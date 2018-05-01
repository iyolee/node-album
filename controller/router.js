const file = require('../models/file');
const formidable = require('formidable');
const util = require('util');
const path = require('path');
const fs = require('fs');

exports.showIndex = (req, res) => {
    file.getAllAlbums((err, allAlbums) => {
        if (err) {
            res.render('error');
            return;
        }
        res.render('index', {
            'albums': allAlbums,
        });
    })
}

exports.showAlbum = (req, res) => {
    var albumname = req.params.albumname;
    file.getAllImagesByAlbumName(albumname, (err, allImages) => {
        if (err) {
            res.render('error');
            return;
        }
        res.render('album', {
            'albumname': albumname,
            'images': allImages
        });
    });
}

exports.showUpload = (req, res) => {
    file.getAllAlbums((err, allAlbums) => {
        res.render('upload', {
            'albums': allAlbums
        });
    })
}

exports.doPost = (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + '/../uploads/');

    form.parse(req, (err, fields, files, next) => {
        if (err) {
            next();
            return;
        }
        var file = files.images;
        var oldPath = files.images.path;
        var newPath = path.normalize(__dirname + '/../uploads/' + fields.dir + '/' + file.name);
        console.log(__dirname + '/../uploads/' + file.name);
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                res.send("改名失败");
                return;
            }
             res.send("成功");
        });
        
    });

    return;
}