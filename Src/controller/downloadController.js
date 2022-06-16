
module.exports = {
    getAllResumes(req, res) {
        const Archive = require('../model/archive');
        Archive.find()
            .then((resume) => {
                res.status(200).send(resume)
            }).catch(err => res.status(500).json({ message: 'Falha ao listar os currículos' }))

    },

    downloadById(req, res) {
        const id = req.params.id;

        const archive = require('../model/archive')
        archive.findById(id, (err, anexo) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: 'Erro ao realizar o download do currículo' });
            } else {
                if (anexo) {
                    const archiveName = anexo.filename;
                    const readStream = anexo.read();

                    // download
                    res.attachment(archiveName);
                    readStream.pipe(res);
                } else {
                    res.status(404).json({ message: "Currículo não encontrado" })
                }
            }
        })


    }

}