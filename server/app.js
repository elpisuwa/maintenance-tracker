<<<<<<< HEAD
import dotenv from 'dotenv'
=======
import 'dotenv/config';
>>>>>>> 29e44a13b62a2268a3d0c16797b7a595582dd20c
import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator'
import routes from './routes';
dotenv.config();


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


const port = process.env.PORT || 4000;

routes(app);


app.listen(port, () => {

  console.log(`Server running on port ${port}`);
});

export default app;
