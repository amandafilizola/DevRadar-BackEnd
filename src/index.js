const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://semana10:omnistack@cluster0-pfp1o.mongodb.net/semana10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(express.json());
app.use(routes);

//Query Params: request.query(FIltros, ordenação, paginação...)
//Route Params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

//MongoDB (Não relacional)
app.listen(3333);