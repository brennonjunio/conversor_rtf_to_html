const { exec } = require('child_process');
const fs = require('fs');

 function rtfToHtml(rtfFilePath, htmlFilePath) {
    const command = `unrtf --html ${rtfFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro durante a conversão: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Erro durante a conversão: ${stderr}`);
            return;
        }

        fs.writeFile(htmlFilePath, stdout, 'utf-8', (err) => {
            if (err) {
                console.error(`Erro ao escrever o arquivo HTML: ${err}`);
            } else {
                console.log('Conversão concluída com sucesso!');
            }
        });
    });
}


rtfToHtml(rtfFilePath, htmlFilePath);


module.exports = { rtfToHtml };
