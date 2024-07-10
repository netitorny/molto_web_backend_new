const express = require("express");
const cors = require("cors");
const serveIndex = require("serve-index");
const formidable = require('formidable');
const compression = require("compression");
const bodyParser = require("body-parser");

const app = express();

// const moment = require('moment');

// console.log('asdas',moment().format());

app.use(
    cors({
        origin: "*",
    })
)
app.use(bodyParser.json());
app.use(compression());

app.use(express.json());

//path import
const testRouter = require('./src/routes/test.route')
const questionsRouter = require('./src/routes/questions.route')
const catagoriesRouter = require('./src/routes/catagories.route')
const productsRouter = require('./src/routes/product.route')
const authRouter = require('././src/routes/auth.route')
const jwtRouter = require('././src/routes/jwt.route')
const fileRouter = require('././src/routes/file.route')
const videosRouter = require('././src/routes/videos.route')
const reviewsRouter = require('././src/routes/reviews.route')
const reviewsImageRouter = require('./src/routes/reviews_image.route')
const promotionsRouter = require('./src/routes/promotions.route')
const manualAPIRouter = require('./src/routes/manualapi.route')
const simRouter = require('./src/routes/sim.route')
//================================================
app.use('/test', testRouter.router)
app.use('/questions', questionsRouter.router)
app.use('/catagories', catagoriesRouter.router)
app.use('/products', productsRouter.router)
app.use('/auth', authRouter.router)
app.use('/jwt', jwtRouter.jwtRouter)
app.use('/file', fileRouter.router)
app.use('/videos', videosRouter.router)
app.use('/reviews', reviewsRouter.router)
app.use('/reviews_image', reviewsImageRouter.router)
app.use('/promotions', promotionsRouter.router)
app.use('/manualAPI', manualAPIRouter.router)
app.use('/sim', simRouter.router)
// app.use('/jwt', jwtRouter.router)

//for public path
app.use('/public',express.static('src/public'))
app.use('/public',serveIndex('src/public'))


app.get('/', async (req, res) => {
res.sendStatus(200);
});


app.listen(3020, () =>{
console.log("sever run on port : " + 3020);
});