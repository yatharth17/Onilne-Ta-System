import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import passport from 'passport';
// const applyPassportStrategy=require('./store/passport')
import {applyPassportStrategy} from './store/passport.js';
import userController  from './controllers/userController.js';
const app = express();

applyPassportStrategy(passport);

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/', userController);
app.use('/posts', postRoutes); 

const CONNECTION_URL = 'mongodb+srv://Yath_17:frontech@mern-tbcbt.mongodb.net/test?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);


