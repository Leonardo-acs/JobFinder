
module.exports = {

    async downloadAll(req, res) {
        const archive = require('../model/archive');

        archive.find({})
            .then(res => res.status(200).json(res))
            .catch(erro => res.status(500).json());

    },

    async downloadById(req, res) {
        const id = req.body.id
        const archive = require('../model/archive');

        archive.findById(id, (err, anexo) => {
            if(err) {
                res.status(500).json({message: 'Erro ao realizar o download do currículo'})
            } else  {
                if(anexo) {
                    const archiveName = anexo.filename; 
                    const readStream = anexo.read();
                    
                    res.attachment(archiveName);
                    readStream.pipe(res);
                } else {
                    res.status(404).json({message: "Currículo não encontrado"})
                }
            }
        })


    }

}