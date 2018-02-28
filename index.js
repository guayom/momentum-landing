var sass = require('node-sass');
var fs = require('fs')
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