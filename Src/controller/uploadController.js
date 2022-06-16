const fs = require('fs')

module.exports = {
    upload (req, res) {
        const { name, mimetype, data } = req.files['arquivo'];

        const archiveName = `${new Date().getTime()}`;

        // criar arquivo temporario 
        fs.writeFileSync(archiveName, data);

        const readStream = fs.createReadStream(archiveName);
        const archive = require('../model/archive');
        const metadata = { filename: name, contentType: mimetype };
        archive.write(metadata, readStream, (err, archive) => {
            fs.unlinkSync(archiveName);
            if (err) {
                console.log(err)
                return res.status(500).json({ err: 'Erro ao tentar enviar o currículo' })
            } else {
                console.log(archive)
                return res.status(200).json({ message: 'Currículo enviado com sucesso', id: archive._id });
            }

        });

    }

};
