const database = require("./pgConfig");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");

const buscarDados = async () => {
  const result = await database.executaSql(
    "SELECT pacienteid, historia_rtf FROM manager.rtf_html_legado_import "
  );
  return result.rows;
};

const convertDados = async () => {
  const registros = await buscarDados();

  for (const registro of registros) {
    const { pacienteid, historia_rtf } = registro;

    try {
      const rtfContent = historia_rtf.toString("utf-8");

      const htmlContent = await rtfToHtml(rtfContent);

      await database.executaSql(
        "UPDATE manager.rtf_html_legado_import SET historia_html = $1 WHERE pacienteid = $2",
        [htmlContent, pacienteid]
      );
      console.log(`Registro do paciente ${pacienteid} atualizado com sucesso.`);
    } catch (error) {
      console.error();
    }
  }
};

const rtfToHtml = async (rtfContent) => {
  try {
    const tempRtfPath = "./temp.rtf";
    fs.writeFileSync(tempRtfPath, rtfContent, "utf-8");

    const { stdout, stderr } = await exec(`unrtf --html ${tempRtfPath}`);

    if (stderr) {
      console.log("caiu no ifff");
      return null;
    }
    fs.unlinkSync(tempRtfPath);

    return stdout;
  } catch (error) {
    console.log("caiu no catch");
    return null;
  }
};

convertDados();
