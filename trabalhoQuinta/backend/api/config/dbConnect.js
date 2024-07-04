import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:admin@cluster0.sz6krrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

let db = mongoose.connection;

export default db;