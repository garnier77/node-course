const{SHA256}= require('crypto-js');
const jwt= require('jsonwebtoken')

let data={
  id: 10
};

let token = jwt.sign(data,'juanning');
console.log(token);

let decoded = jwt.verify(token, 'juanning');
console.log('decoded',decoded);

//jwt.verify

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log (`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
//     id:4
// };
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'juanningsecret').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// let resultHash = SHA256(JSON.stringify(token.data)+ 'juanningsecret').toString();
//
// if (resultHash ===token.hash){
//     console.log('Data was not changed');
//
// }else {
//     console.log('Data was changed...fuck your data if you juant fuck!');
// }
//
