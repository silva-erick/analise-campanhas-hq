const testFolder = './etapa2/';
const fs = require('fs');

const campanhas = [];

const atributos = [
    "url",
    "situacao",
    "titulo",
    "autor",
    "regiao",
    "municipio",
    "uf",
    "porcentagem",
    "valorLevantado",
    "encerramento",
    "ano",
    "apoiadores",
    "modalidade",
    "meta",
    "novidades",
    "recompensas",
    "mencaoCcxp",
    "mencaoPolitica",
    "mencaoEconomia",
    "mencaoLgbt",
    "mencaoFeminismo",
    "mencaoQuestoesDeGenero",
    "mencaoReligiao",
    "mencaoHeroi",
    "mencaoHumor",
    "mencaoBiografia",
    "mencaoManga",
    "mencaoZine",
];
campanhas.push(atributos.join(';'));

fs.readdirSync(testFolder).forEach(file => {
    let fileName = testFolder + file;

    console.log('arquivo: ' + file)
    let campanha = JSON.parse(fs.readFileSync(fileName));
    if (campanha ){
        if ( campanha.porcentagem ){
            campanha.porcentagem = campanha.porcentagem.toString().replace('.', ',');
        }
        if ( campanha.valorLevantado){
            campanha.valorLevantado = campanha.valorLevantado.toString().replace('.', ',');
        }
        if ( campanha.meta){
            campanha.meta = campanha.meta.toString().replace('.', ',');
        }
    
        let campos = [];
    
        for(let at in atributos){
            //console.log(campanha[atributos[at]]);
            campanha[atributos[at]] = (campanha[atributos[at]] || '').toString();
            campos.push('"' + campanha[atributos[at]].replace('"', '') + '"');
        }
    
        campanhas.push(campos.join(';'));
    }
});
fs.writeFileSync('etapa3/campanhas_catarse.csv', campanhas.join('\n'));
