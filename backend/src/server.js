import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import ora from 'ora';
import User from './models/User.js';
import defaultData from "./data/reset.json" with { type: 'json' };

dotenv.config();

const PORT = 3000;
const app = express();

app.use(cors())
app.use(express.json());

const conectarBanco = async () => {
    const spinner = ora('Conectando ao banco...').start()
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        spinner.succeed('Conectado ao banco!')

    } catch (error) {
        spinner.fail(`Ocorreu um erro de conexão: ${error}`)
    }
};

const resetDb = async () => {
    try {
        await User.deleteMany({})
        await User.insertMany(defaultData)
    } catch (error) {
        console.log(`Ocorreu um erro ao resetar o banco: ${error}`)
    }
}

const oneHourInMs = 60 * 60 * 1000;

setInterval(async () => {
    await resetDb();
}, oneHourInMs);

app.get('/health', (req, res) => {
    res.send('O servidor com mongoose está funcionando!')
});

app.get('/search', async (req, res) => {

    const escapeRegex = (value) => { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }
    const term = escapeRegex(req.query.term || '')
    const limit = req.query.limit
    const page = req.query.page

    const search = User.find({
        //'$or' faz com que o valor buscado satisfaça pelo menos uma dos campos
        $or: [
            { name: { $regex: term, $options: 'i' } },
            { email: { $regex: term, $options: 'i' } },
            { phone: { $regex: term, $options: 'i' } },
            { age: { $regex: term, $options: 'i' } }
        ]
    }, 'email name phone age')
    .sort({ name: 1, _id: 1 })
    .skip(page * limit)
    .limit(limit)
    try {
        const results = await search.exec()
        results.length === 0
            ? res.send({ "erro": "nenhum resultado encontrado" })
            : res.json(results)

    } catch (error) { `Erro ao buscar nome: ${error}` }

})

app.post('/insert', async (req, res) => {

    const checkEmail = User.find({ email: req.body.email })
    const emailExistente = await checkEmail.exec()

    try {
        if (emailExistente.length === 0) {
            const newUser = await User.create(req.body)
            await newUser.save()
            res.json(`Usuario ${req.body.name} cadastrado!`)
        } else {
            throw new Error('E-mail já cadastrado!')
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
});

app.patch('/update', async (req, res) => {
    try {
        const userWithSameEmail = await User.findOne({
            email: req.body.data.email,
            _id: { $ne: req.body.id }
        });

        if (!userWithSameEmail || userWithSameEmail.length === null) {
            await User.findByIdAndUpdate(req.body.id, req.body.data);
            res.send('Alterações feitas!');
        } else {
            throw new Error('E-mail já cadastrado!');
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.delete('/delete', async (req, res) => {

    const idArray = req.body.id;
    const namesQuery = User.find({ _id: { $in: idArray } }).select('name -_id');
    const namesArray = await namesQuery.exec()

    try {
        await User.deleteOne({ _id: idArray })
        res.send(`Usuário ${namesArray[0].name} excluído`)

    } catch (error) {
        res.send(`Erro ao deletar usuários: ${error}`)
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
    conectarBanco();
})
