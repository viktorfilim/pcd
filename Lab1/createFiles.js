function createFile(size, fileName){
    const fs = require('fs');
    const file = fs.createWriteStream(fileName, {flags: 'a'});
    var indexSize = size;
    for(let i=0; i<= indexSize; i++) {
      file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
      file
    }
    file.end();
    file.on('finish', () => {
      console.log("Finished: " + fileName);
    });
}
// createFile(1e6, './files/small.file');
// createFile(1e6*2, './files/medium.file');
// createFile(1e6*4, './files/large.file');
 createFile(1e6, './files/hugee.file');