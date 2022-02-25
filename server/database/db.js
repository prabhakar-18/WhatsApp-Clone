import mongoose from "mongoose"


const connection = async (username,password) => {


    const URL = `mongodb://${username}:${password}@clone-shard-00-00.taast.mongodb.net:27017,clone-shard-00-01.taast.mongodb.net:27017,clone-shard-00-02.taast.mongodb.net:27017/CLONEWHATSAPP?ssl=true&replicaSet=atlas-113euz-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true }); console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to mongodb', error)

    }

}


export default connection; 