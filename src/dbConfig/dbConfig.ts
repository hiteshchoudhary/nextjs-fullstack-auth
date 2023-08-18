import mongoose from 'mongoose';
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI);
    }catch(error) {
        console.log('Something goes wrong!, Connection to DB');
        console.log(error);
    }
}