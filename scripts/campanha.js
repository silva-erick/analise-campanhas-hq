const fs = require('fs');
const puppeteer = require('puppeteer');


function parsePage() {
	// referência: https://www.aasp.org.br/suporte-profissional/tabela-pratica-para-calculo-de-atualizacao-monetaria-ipca-e/
	const monetaria = [1000,1256,1583.816,1932.730664,2315.991154,2859.091079,3524.401573,4264.878343,5251.771191,6477.009409,8127.351406,10053.533689,12415.108752,16073.841301,20368.771696,25656.504828,32670.993247,42083.506401,54851.642243,71.67464,94.603357,127.127991,171.838905,230.092293,314.513155,437.707957,611.478015,878.265872,1240.550544,1788.997939,0.941012,0.990038,1.039539,1.056483,1.076556,1.108314,1.133251,1.153422,1.167493,1.182436,1.205493,1.238885,1.266759,1.299568,1.318931,1.331724,1.349569,1.369272,1.387894,1.410516,1.427442,1.436292,1.446346,1.465437,1.481703,1.502002,1.512516,1.514179,1.516298,1.522514,1.525559,1.542797,1.55375,1.562917,1.573544,1.581411,1.590108,1.595037,1.597748,1.596949,1.600941,1.602061,1.609911,1.618604,1.628963,1.635315,1.638912,1.645631,1.651226,1.649409,1.643306,1.636075,1.636238,1.634438,1.636562,1.64769,1.658235,1.678465,1.691557,1.700183,1.699842,1.71327,1.727147,1.735264,1.749146,1.766462,1.782536,1.794122,1.800222,1.801842,1.81031,1.811939,1.813388,1.827532,1.863899,1.872286,1.875656,1.878844,1.890117,1.902024,1.911534,1.918415,1.928007,1.937454,1.944816,1.963097,1.986261,1.993808,2.001185,2.020996,2.032111,2.04471,2.053706,2.06192,2.078002,2.086729,2.093615,2.109735,2.130832,2.144043,2.163339,2.208336,2.27569,2.320748,2.371572,2.398607,2.425951,2.446571,2.451953,2.447539,2.454147,2.468135,2.484424,2.488647,2.500094,2.517094,2.539747,2.549905,2.555259,2.569057,2.583443,2.607469,2.628068,2.640945,2.649396,2.666087,2.688482,2.706763,2.726793,2.736336,2.756584,2.779463,2.782798,2.785859,2.793659,2.798128,2.813797,2.835744,2.846519,2.861036,2.875913,2.886553,2.89146,2.899266,2.894917,2.894338,2.899837,2.901286,2.909699,2.920464,2.930685,2.945924,2.959475,2.971608,2.978145,2.985888,2.994547,3.001733,3.01434,3.023081,3.030336,3.037305,3.058566,3.079975,3.099686,3.106815,3.125145,3.142645,3.170928,3.190904,3.202072,3.210397,3.220028,3.235806,3.245189,3.258169,3.278695,3.282301,3.294117,3.313552,3.326143,3.33346,3.341126,3.347474,3.353499,3.368254,3.381053,3.398634,3.430581,3.449449,3.466006,3.487841,3.494467,3.491321,3.489575,3.500392,3.522094,3.552384,3.576895,3.604079,3.639038,3.660872,3.68906,3.714883,3.723427,3.72715,3.737213,3.75702,3.772799,3.790153,3.811377,3.83615,3.856481,3.866122,3.882746,3.902548,3.909572,3.922473,3.93777,3.956671,3.982389,4.003893,4.031519,4.066996,4.094651,4.114714,4.135699,4.154723,4.17051,4.173429,4.180106,4.191392,4.21151,4.235515,4.267281,4.295871,4.325942,4.357521,4.391509,4.416979,4.437738,4.445282,4.451505,4.468865,4.490315,4.507378,4.542986,4.583418,4.644377,4.701967,4.752278,4.780791,4.82812,4.856605,4.877488,4.89651,4.928826,4.970721,5.029375,5.075645,5.147719,5.169854,5.19622,5.240907,5.26187,5.290284,5.31409,5.326312,5.336431,5.350305,5.36047,5.377087,5.406123,5.414232,5.425601,5.438622,5.447323,5.437517,5.456548,5.46255,5.481122,5.498661,5.517906,5.539425,5.560474,5.566034,5.577722,5.58553,5.647529,5.683673,5.691061,5.696182,5.729219,5.740104,5.730919,5.748111,5.767654,5.798799,5.84055,5.860991,5.864507,5.869785,5.87448,5.879767,5.885058,5.893297,5.955176,5.997457,6.010651,6.011853,6.011251,5.975784];

	function indiceMonetaria(data){
		let parts = data.split('/');
		let ano = parseInt(parts[2]);
		let mes = parseInt(parts[1]) - 1;
		//console.log(ano + '-' + mes);
		// 1992
		let indice = (ano - 1992)*12 + mes;
		//console.log('indice: ' + indice);
		return monetaria[indice];
	}

	function correcaoMonetaria(data, valor){
		return corrigido = 1.0 * valor * indiceMonetaria('1/4/2020') / indiceMonetaria(data);
	}

	try {
	let it = {};

	if ( $('h1.project-name').text() == null ) return null;

    let meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    it.titulo         = $('h1.project-name').text().replace(/;\)/, '').replace(/\s+/g, ' ').replace(/["';]+/g, '').replace(/^\s/, '');
    it.autor          = $('h2').text().replace(/;\)/, '').replace(/\s+/g, ' ').replace(/["';]+/g, '').replace(/^por\s/, '').replace(/^\s/, '');
    it.descricao      = $('div.project-blurb').text().replace(/;\)/, '').replace(/\s+/g, ' ').replace(/["';]+/g, '').replace(/^\s/, '');
    it.municipio      = $('div.w-hidden-small a:nth(1).btn').text().replace(/\s+/g, ' ').replace(/;\)/, '').replace(/["';]+/g, '').replace(/\s*,\s*.*$/, '').replace(/^\s/, '');
    it.uf             = $('div.w-hidden-small a:nth(1).btn').text().replace(/\s+/g, ' ').replace(/;\)/, '').replace(/["';]+/g, '').replace(/^.+\s*,\s*/, '');
    it.situacao       = $('div.project-stats').text().indexOf('não foi financiado') < 0 ? 'financiado' : 'não financiado';
    it.porcentagem    = parseFloat($('#progressBar').attr('style').replace(/^width\:\s+/, '').replace(/\%;/g, ''))/100.0;
    let patEncerramento = $('div.project-stats').text().match(/\d{1,2}\/\d{1,2}\/\d{4}/);
    if ( !patEncerramento ){
        console.log('não tem encerramento');
        patEncerramento = $('#project-about').text().match(/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\/(\d{4})/);
        if ( patEncerramento && patEncerramento[1] ) {
            console.log('estimado a partir das recompensas: ' + patEncerramento[1]);
            for ( let m = 0; m < meses.length; m++){
                if ( patEncerramento[1] == meses[m] ) {
                    patEncerramento = ['01/' + (m+1).toString() + '/' + patEncerramento[2]];
                    console.log('estimada: ' + patEncerramento[0] );
                    break;
                }
            }
        }
    }
    if (!patEncerramento) {
        patEncerramento = [''];
    }
    it.encerramento   = patEncerramento[0] ? patEncerramento[0] : '';
    it.ano            = it.encerramento.replace(/^.+\/.+\//, '');
    it.apoiadores     = parseInt($('#contributors').text().replace(/\s*[a-z]*$/, ''));
    it.modalidade     = $('#aon').length > 0 ? 'tudo ou nada' : ($('#flex').length > 0 ? 'flex' : 'nd' );
		it.valorLevantado = correcaoMonetaria(
			it.encerramento,
			parseFloat($('#pledged').text().replace(/^R\$\s*/, '').replace('.', ''))
		);
    it.meta           = correcaoMonetaria(
			it.encerramento,
			parseFloat($('#aon,#flex').text().replace(/^.+R\$\s*/g, '').replace(/\s*Campanha.+$/g, '').replace('.', ''))
		);
		it.porcentagem = it.valorLevantado / it.meta;
    it.novidades      = parseInt($('#posts-link span.badge').text());
    it.recompensas    = $('.card-reward').length;
    it.mencaoCcxp     = $('.card-reward').text().match(/ccxp/gi) ? 'S' : 'N';

    let textoApresentacao = $('#project-about div:nth(0)').text().replace(/\s{2,}/, ' ');

    it.mencaoPolitica = textoApresentacao.match(/(pol[ií]t)|(comunis)|(anarqui)|(liberalis)|(democrac)|(corrup)/gi) ? 'S' : 'N';
    it.mencaoEconomia = textoApresentacao.match(/econ[oô]mi/gi) ? 'S' : 'N';
    it.mencaoLgbt = textoApresentacao.match(/lgbt/gi) ? 'S' : 'N';
    it.mencaoFeminismo = textoApresentacao.match(/feminis/gi) ? 'S' : 'N';
    it.mencaoQuestoesDeGenero = textoApresentacao.match(/quest[]es\s+de\s+g[eê]nero/gi) ? 'S' : 'N';
    it.mencaoReligiao = textoApresentacao.match(/religi/gi) ? 'S' : 'N';
    it.mencaoHeroi = textoApresentacao.match(/her[oó]i/gi) ? 'S' : 'N';
    it.mencaoHumor = textoApresentacao.match(/humor/gi) ? 'S' : 'N';
    it.mencaoBiografia = textoApresentacao.match(/bi[oó]graf/gi) ? 'S' : 'N';
    it.mencaoManga = textoApresentacao.match(/mang[aá]/gi) ? 'S' : 'N';
    it.mencaoZine = textoApresentacao.match(/zine/gi) ? 'S' : 'N';

    it.apresentacao   = textoApresentacao;

    it.recAte30     = 0;
    it.recAte60     = 0;
    it.recAte90     = 0;
    it.rec90Mais    = 0;
    it.apoioAte30   = 0;
    it.apoioAte60   = 0;
    it.apoioAte90   = 0;
    it.apoio90Mais  = 0;

    $('.card-reward').each(function(r, rec) {
        var tipoRec = 0;
        $('div', rec).each(function(l, linha){
            var raw = $(linha).text();
            if ( raw.match(/^\s*Para R\$ \d+ ou mais\s*$/) ){
                let n = correcaoMonetaria(
									it.encerramento,
									parseFloat(raw.replace(/^\s*Para R\$ /, '').replace(/ ou mais\s*$/, ''))
								);
                if ( n <= 30 ) {
                    tipoRec = 30;
                    it.recAte30++;
                }
                else if ( n <= 60 ) {
                    tipoRec = 60;
                    it.recAte60++;
                }
                else if ( n <= 90 ) {
                    tipoRec = 90;
                    it.recAte90++;
                }
                else {
                    tipoRec = 200;
                    it.rec90Mais++;
                }
            }
            else if ( raw.match(/^\s*\d+ apoios?\s*$/)  ) {
                let n = parseInt(raw.replace(/^\s*/, '').replace(/ apoios?\s*$/, ''));
                switch(tipoRec) {
                    case 30:
                        it.apoioAte30+=n;
                        break;
                    case 60:
                        it.apoioAte60+=n;
                        break;
                    case 90:
                        it.apoioAte90+=n;
                        break;
                    case 200:
                        it.apoio90Mais+=n;
                        break;
                }
            }
        });
    });

    it.regiao='';
    if(';RS;SC;PR;'.indexOf(it.uf) > 0 ){
        it.regiao='sul';
    }
    else if(';SP;RJ;MG;ES;'.indexOf(it.uf) > 0 ){
        it.regiao = 'sudeste'
    }
    else if(';MS;MT;GO;DF;'.indexOf(it.uf) > 0 ){
        it.regiao = 'centro-oeste'
    }
    else if(';AL;BA;CE;MA;PB;PE;PI;RN;SE;'.indexOf(it.uf) > 0 ){
        it.regiao = 'nordeste'
    }
    else if(';AC;AP;AM;PA;RO;RR;TO;'.indexOf(it.uf) > 0 ){
        it.regiao = 'norte'
    }

		return it;
	} catch(e){
		throw e;
	}
}

function processPage (url) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('abrindo browser interno')
            const browser = await puppeteer.launch();
            
            console.log('nova página')
            const page = await browser.newPage();
            
            console.log('acessar site')
            await page.goto(url, {waitUntil: 'load', timeout: 0});
            await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

            console.log('avaliar página')
            let campaign = await page.evaluate(parsePage);
            if ( campaign ){
	            campaign.url = url;
            }
            browser.close();

            return resolve(campaign);
        } catch (e) {
            return reject({url: url, exc: e});
        }
    })
}

processPage('https://catarse.me/' + process.argv[2])
        .then((it) => {
          console.log('\t' + it.url + ': OK');
					let fileName = 'etapa2/' + process.argv[2] + '.json';
					fs.writeFileSync(fileName, JSON.stringify(it));
					process.exit(0);
        })
        .catch((err) => {
					console.error('\tFALHA');
					let fileName = 'etapa2/' + process.argv[2] + '.erro';
					fs.writeFileSync(fileName, JSON.stringify(err));
					process.exit(1);
        });
