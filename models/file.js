const fs = require('fs');

exports.getAllAlbums = (callback) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            callback(err, null);
        }
        var allAlbums = [];
        (function iterator(i) {
            if (i === files.length) {
                callback(null, allAlbums);
                return;
            }
            fs.stat('./uploads/' + files[i], (err, stats) => {
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0);
    })
}

exports.getAllImagesByAlbumName = (albumname, callback) => {
    fs.readdir('./uploads/' + albumname, (err, files) => {
        if (err) {
            callback(err, null);
            return;
        }
        var allImages = [];
        (function iterator(i) {
            if (i === files.length) {
                callback(null, allImages);
                return;
            }
            fs.stat('./uploads/' + albumname + '/' + files[i], (err, stats) => {
                if (stats.isFile()) {
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0);
    })
}