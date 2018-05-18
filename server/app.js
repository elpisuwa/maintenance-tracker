import express from 'express';
import bodyParser from 'body-parser';
import router from './Routes';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const port= 4000;

routes(app);


app.listen(port, () => {
  
  console.log(`Server running on port ${port}`);
})

export default app