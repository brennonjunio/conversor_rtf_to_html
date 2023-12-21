const { exec } = require('child_process');
const sql = require('mssql');
const fs = require('fs');
const path = require('path');

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

async function buscar() {
    try {
        await sql.connect({
            server: "192.168.1.2",
            port: 1433,
            database: "emedsql",
            user: "importa",
            password: "QKnjpZN9Bu3LkPTeDcJW6A",
            options: {
                encrypt: false,
            },
        });

        const result = await sql.query`select top 1 HISTORICO from HISTORIA where pacienteid =1199`;

        if (result.recordset.length > 0) {
            const historiaBuffer = result.recordset[0].HISTORICO;
            const historiaText = historiaBuffer.toString("utf-8");

            // Salvar o conteúdo RTF em um arquivo temporário
            const rtfFilePath = path.join(__dirname, 'temp.rtf');
            fs.writeFileSync(rtfFilePath, historiaText, 'utf-8');

            const htmlFilePath = path.join(__dirname, 'saida.html');
            rtfToHtml(rtfFilePath, htmlFilePath);
        } else {
            console.log("Nenhum resultado retornado da consulta.");
        }
    } catch (err) {
        console.error(err);
    }
}

buscar();
