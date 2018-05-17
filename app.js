import express from 'express'
import bodyParser from 'body-parser';

const app = express();

//log to console
app.use(bodyParser);



port= 4000;

app.get('/', (req, res) => {
  res.status(200).send('hello');
})



app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server running on port ${port}`);
})

export default app