const fs = require('fs')

module.exports = {
    async upload (req, res) {
        const {name, mimetype, data} = req.file['currículo'];
        //
        const archiveName = `${new Date().getTime()}`;
        console.log(archiveName)

        // criar arquivo temporario 
        fs.writeFileSync(archiveName, data);

        const readStream = fs.createReadStream(archiveName);

        const archive = require('../model/archive');
        const metadata = {filename: name, contentType: mimetype};

        archive.write(metadata, readStream, (err, archive) => {
            fs.unlinkSync(archiveName);
            if(err){
                return res.status(500).json({err: 'Erro ao tentar enviar o currículo'})
            } else {
               return res.status(200).json({message: 'Currículo enviado com sucesso', id:archive._id});
            }
            
        });
    
    }
};