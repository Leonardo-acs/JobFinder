const Job = require('../model/jobModel'); 
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 10 });  
module.exports = {

    async getAlljobs(req, res) {
        if (cache.has('/jobs')) {
            return res.send(cache.get('/jobs'));

        } else {
            Job.find({})
                .then((user) => {
                    cache.set('/jobs', user)
                    res.status(200).send(user)
                }).catch(err => res.status(500).send(err))
        }
    },    

    async createJob(req, res) {
        try {
            const { jobName, description, contractingCompany, contactEmail, salary } = req.body; 

            let creating = {} 

            if (!jobName || !description || !contractingCompany || !salary || !contactEmail) {
                res.status(400).json({ error: 'Preencha todos os campos' })
            }

            creating = { jobName, description, contractingCompany, salary, contactEmail }
            const jobs = await Job.create(creating);
            res.status(201).json(jobs)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async readJob(req, res) {
        if (cache.has('/readJob')) {
            return res.send(cache.get('/readJob'));

        } else {
            const { cpf } = req.params
            Job.findOne({ cpf })
                .then((reading) => {
                    cache.set('/readJob', reading)
                    res.status(201).send(reading)
                }).catch(err => res.status(500).send(err))

        }
    },

    async deleteJob(req, res) {
        try {
            const { _id } = req.params;
            const job = await Job.findByIdAndDelete({ _id });
            res.status(204).json(job)
        } catch (error) {
            res.json({ error: error })
        }

    },

    async updateJob(req, res) {
        const { jobName, description, contractingCompany, contactEmail, salary} = req.body;

        let updating = {}

        updating = { jobName, description, contractingCompany, contactEmail, salary}

        const job = await Job.findByIdAndUpdate({ _id }, updating, { new: true }); 
        res.status(200).json(job)
    }
}