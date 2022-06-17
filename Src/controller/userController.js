const User = require('../model/userModel'); 
const jwt = require('jsonwebtoken');
const SECRET = 'jobfinder';
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 10 });  


module.exports = {
    async getAllUsers(req, res) {
        if (cache.has('/getAll')) {
            return res.send(cache.get('/getAll'));

        } else {
            User.find({})
                .then((user) => {
                    cache.set('/getAll', user)
                    res.status(200).send(user)
                }).catch(err => res.status(500).send(err))
        }
    },

    async userLogin(req, res) {
        const { login, password, _id } = req.body;

        if (!login || !password || !_id) {
            return res.status(400).json({ error: 'Preencha todos os campos' })
        }

        let loggingIn = {}
        loggingIn = { login, password, _id }

        if (cache.has('/userLogin')) {
            return res.send(cache.get('/userLogin'));
        } else {
            User.findOne({_id, loggingIn })
                .then((userlogged) => {
                    cache.set('/userLogin', userlogged)
                    res.status(201).send(userlogged)
                }).catch(err => res.status(500).send(err))
        }
    },

    async authenticate(req, res) {
        const { login, password } = req.body;

        const usuario = await User.findOne({ login, password });

        if (!usuario) return res.status(401).json({ message: 'User not found' });

        const { _id } = usuario;

        const token = jwt.sign({ userId: _id, }, SECRET, { expiresIn: 86400 });
        
        return res.send({ usuario, token });
    },

    async createUser(req, res) {
        try {
            const { name, email, phone, identity, state, nationality, age, college, period, login, password } = req.body; 

            let creating = {} 

            if (!name || !email || !phone || !identity || !age || !password || !state || !nationality || !college || !period || !login) {
                res.status(400).json({ error: 'Preencha todos os campos' })
            }

            creating = { name, email, phone, identity, age, state, nationality, college, period, login, password }
            const users = await User.create(creating);
            res.status(201).json(users)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async readUser(req, res) {
        if (cache.has('/readUser')) {
            return res.send(cache.get('/readUser'));

        } else {
            const { _id } = req.params
            User.findOne({ _id })
                .then((reading) => {
                    cache.set('/readUser', reading)
                    res.status(201).send(reading)
                }).catch(err => res.status(500).send(err))

        }
    },

    async deleteUser(req, res) {
        try {
            const { identity } = req.params;
            const usuarios = await User.findOneAndDelete({ identity });
            res.status(204).json(usuarios)
        } catch (error) {
            res.json({ error: error })
        }

    },

    async updateUser(req, res) {
        const { name, email, phone, identity, state, nationality, age, college, period, login, password } = req.body;

        let updating = {}

        updating = { name, email, phone, identity, state, nationality, age, college, period, login, password}

        const users = await User.findOneAndUpdate({ identity }, updating, { new: true }); 
        res.status(200).json(users)
    }
}