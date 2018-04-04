'use strict';


//------//
// Main //
//------//

const childProcess = require('child_process')
  , fs = require('fs')
  , path = require('path')
  ;


//------//
// Init //
//------//

const execSync = childProcess.execSync;


//------//
// Main //
//------//

const isSqliteFileSync = fPath => {
  let res;
  if (process.platform == 'win32') {
    try { 
      let command = 'powershell -ExecutionPolicy Bypass "Get-Content ' + path.resolve(fPath) + ' -TotalCount 1 | % { $_.substring(0,15) }';
      let head = execSync(command, { encoding: 'utf8' }).toLowerCase();
      let expected = 'sqlite format 3' + String.fromCharCode('0x0D') + String.fromCharCode('0x0A');
      res = head === expected;
    }
    catch (e) { res = false; }
  }
  else {
    try { res = execSync('head -c 16 ' + path.resolve(fPath), { encoding: 'utf8' }).toLowerCase() === 'sqlite format 3' + String.fromCharCode('0x00');}
    catch (e) { res = false; }
  }
  return res;
};

const isDirectorySync = fPath => {
  return fs.statSync(fPath)
    .isDirectory();
};

const isFileSync = fPath => {
  let res;
  try { res = fs.statSync(fPath).isFile(); }
  catch (e) { res = false; }
  return res;
};


//---------//
// Exports //
//---------//

module.exports = {
  isDirectorySync: isDirectorySync
  , isFileSync: isFileSync
  , isSqliteFileSync: isSqliteFileSync
};
