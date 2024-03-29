const Company = require('../model/companyModel');
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 10 }); 
const jwt = require('jsonwebtoken');
const SECRET = 'jobfinder';

module.exports = {

    async getAllComapanys(req, res) {
        if (cache.has('/companys')) {
            return res.send(cache.get('/companys'));

        } else {
            Company.find({})
                .then((company) => {
                    cache.set('/companys', company) 
                    res.status(200).send(company)
                }).catch(err => res.status(500).send(err))
        }
    },

    async companylogin(req, res) {
        const { login, password, _id } = req.body;

        if ( !login || !password || !_id) {
            return res.status(400).json({ error: 'Preencha todos os campos' })
        }

        let loggingIn = {}
        loggingIn = { login, password, _id }


            Company.findOne({_id, loggingIn })
            .then((companyLogin) => {
                cache.set('/companyLogin', companyLogin)
                res.status(201).send(companyLogin)
            }).catch(err => res.status(500).send(err)) 
        
    },

    async authenticate(req, res) {
        const { login, password } = req.body;

        const company = await Company.findOne({ login, password });

        if (!company) return res.status(401).json({ message: 'User not found' });

        const { _id } = company;

        const token = jwt.sign({ company_id: _id, }, SECRET, { expiresIn: 86400 });
        
        return res.send({ company, token });
    },

    async createComapny(req, res) {
        try {
            const { companyName, login, email, state, identity, password, phone, office } = req.body; 

            let creating = {} 

            if (!companyName || !login || !email || !state || !identity || !phone || !password || !office) {
                res.status(400).json({ error: 'Preencha todos os campos' })
            }
            creating = { companyName, email, login, state, identity, password, phone }
            const company = await Company.create(creating);
            res.status(201).json(company) 
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async readCompany(req, res) {
        if (cache.has('/readCompany')) {
            return res.send(cache.get('/readCompany'));

        } else {
            const { _id } = req.params
            Company.findOne({ _id })
                .then((reading) => {
                    cache.set('/readCompany', reading)
                    res.status(201).send(reading)
                }).catch(err => res.status(500).send(err))
                
            }
    },

    async deleteCompany(req, res) {
        try {
            const { identity } = req.params; 
            const company = await Company.findOneAndDelete({ identity }); 
            res.status(204).json(company) 
        } catch (error) {
            res.json({ error: error })
        }

    },

    async updateCompany(req, res) {
        const { companyName, login, email, state, identity, password, phone  } = req.body;

        let updating = {}

        updating = { companyName, login, email, state, identity, password, phone  }

        const comapny = await Company.findOneAndUpdate({ identity }, updating, { new: true });
        res.status(200).json(comapny)
    },

}