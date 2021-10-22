require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/api', require('./routes/authRouter'))
// app.use('/api', require('./routes/userRouter'))
// app.use('/api', require('./routes/postRouter'))
// app.use('/api', require('./routes/commentRouter'))
// app.use('/api', require('./routes/notifyRouter'))
// app.use('/api', require('./routes/messageRouter'))



// Connect to mongodb
const URI = process.env.MONGODB_URL
// const URI = 'mongodb+srv://riyapuru:3iLh7RbfhH5kVTm@cluster0.jqavw.mongodb.net/medicare?retryWrites=true&w=majority'
mongoose.connect(URI, {
    // useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false
    }, err => {
        if(err) throw err;
        console.log("Connected to mongodb")
    })
// }).then(() => {
//     console.log(`connection successful`);
// }).catch((err) => console.log(`no connection`));

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Server is running on port',port)
})