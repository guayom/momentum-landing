var sass = require('node-sass');
var fs = require('fs')

// Process HTML
fs.createReadStream('src/index.html').pipe(fs.createWriteStream('build/index.html'));


// Process CSS
const cssFilePath = "build/styles.css";
sass.render({
        file: "src/styles.scss",
        outFile: cssFilePath,
        outputStyle: 'compressed'
    }, function(error, result) {
    if(!error){
        fs.writeFile(cssFilePath, result.css, function(err){
            if(!err){
                console.log("CSS ready!");
            }
        });
    }
});

// Process images
var compress_images = require('compress-images'), INPUT_path_to_your_images, OUTPUT_path;

INPUT_path_to_your_images = 'src/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}';
OUTPUT_path = 'build/img/';

compress_images(INPUT_path_to_your_images, OUTPUT_path, {compress_force: false, statistic: true, autoupdate: true}, false,
                                            {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
                                            {png: {engine: 'pngquant', command: ['--quality=20-50']}},
                                            {svg: {engine: 'svgo', command: '--multipass'}},
                                            {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(){
});