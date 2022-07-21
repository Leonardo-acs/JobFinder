const Job = require('../model/jobModel');
const NodeCache = require("node-cache");
const user = require('../model/userModel');
const job = require('../model/jobModel');
const jobApplied = require('../model/jobAppliedModel');
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
            const { jobName, companyName, description, turn, availability, contactEmail, salary, createdBy } = req.body;

            let creating = {}

            if (!jobName || !description || !companyName || !salary || !contactEmail || !createdBy) {
                res.status(400).json({ error: 'Preencha todos os campos' })
            }

            creating = { jobName, companyName, description, turn, availability, salary, contactEmail, createdBy }
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
            const { createdById } = req.params
            Job.find({ createdById })
                .then((reading) => {
                    cache.set('/readJob', reading)
                    res.status(200).send(reading)
                }).catch(err => res.status(500).send(err))
        }
    },

    async applieedByUser(req, res) {
        try {
            const { jobName, companyName, description, turn, availability, contactEmail, salary, appliedBy, createdBy, job_id } = req.body;

            let creating = {}

            if (!jobName || !description || !companyName || !salary || !contactEmail || !createdBy || !appliedBy || !job_id) {
                res.status(400).json({ error: 'Preencha todos os campos' })
            }

            creating = { jobName, companyName, description, turn, availability, salary, contactEmail, createdBy, appliedBy, job_id }
            const jobs = await jobApplied.create(creating);
            res.status(201).json(jobs)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async readJobApplied(req, res) {
        const { job_id } = req.params
        jobApplied.find({ job_id })
            .then((reading) => {
                cache.set('/readJobApplied', reading)
                res.status(200).send(reading)
            }).catch(err => res.status(500).send(err))
    },

    async userApllied(req, res) {
        if (cache.has('/userApplied')) {
            return res.send(cache.get('/userApplied'));

        } else {
            const { appliedBy } = req.params
            user.findOne({ appliedBy })
                .then((reading) => {
                    cache.set('/userApplied', reading)
                    res.status(200).send(reading)
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
        const { jobName, description, contractingCompany, contactEmail, salary } = req.body;

        let updating = {}

        updating = { jobName, description, contractingCompany, contactEmail, salary }

        const job = await Job.findByIdAndUpdate({ _id }, updating, { new: true });
        res.status(200).json(job)
    }
}