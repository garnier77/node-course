let env = process.env.NODE_ENV|| 'development';
if(env ==='development'){
    process.env.PORT = 7777;
    process.env.MONGODB_URI ='mongodb://localhost:27017/BetApp';
}else if (env==='test'){
    process.env.PORT=7777;
    process.env.MONGODB_URI ='mongodb://localhost:27017/BetAppTest';

}