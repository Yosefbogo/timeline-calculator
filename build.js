const fs=require('node:fs');
fs.writeFileSync(__dirname+'/index.html',fs.readFileSync(__dirname+'/index.template.html','utf8').replace('/*ENGINE*/',fs.readFileSync(__dirname+'/core.js','utf8')));
fs.copyFileSync(__dirname+'/index.html',__dirname+'/Timeline-Calculator.html');
console.log('Built index.html and Timeline-Calculator.html');
