// obter lista de campanhas
const fs = require('fs');
const puppeteer = require('puppeteer');

// projetos pontuais, quadrinhos, finalizados
const catarse = "https://www.catarse.me/explore?ref=ctrse_header&mode=not_sub&category_id=7&filter=finished"

function extrairLinks() {

	try {
        var dic = [];

        $('.card-project').each(function(index, card){
            let prj = {
                url: $('a.link-hidden', card)
                    .attr('href')
                    .replace('https://www.catarse.me/','')
                    .replace(/^\//, '')
                    .replace('?ref=ctrse_explore', '')
                    .replace(/;\)/, '')
                    .replace(/\s+/g, ' ')
                    .replace(/["';]+/g, '')
                    .replace(/^\s/, '')
            };

            dic.push(prj.url);
        });

		return dic;
	} catch(e){
		throw e;
	}
}

function processarPagina (url) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('abrindo browser interno')
            const browser = await puppeteer.launch();

            console.log('nova página')
            const page = await browser.newPage();

            console.log('acessar site')
            await page.goto(url, {waitUntil: 'load', timeout: 0});
            await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

            let pagina = 1;
            let collecting = true
            do {

                try {
                    console.log('página ' + pagina.toString())
                    await page.click('[href="#"]')
    
                    console.log('\taguardando carregar...')
                    await page.waitForSelector('[href="#"]', {
                        timeout: 0
                    })    
                    pagina++
                }
                catch (errorPagina){
                    collecting=false
                }
            }while(collecting)
        
            console.log('analisando a página')
            let campaigns = await page.evaluate(extrairLinks);

            browser.close();

            return resolve(campaigns);
        } catch (e) {
            return reject(e);
        }
    })
}

processarPagina(catarse)
        .then((dic) => {
            console.log('\tcampanhas: OK');
            let fileName = 'etapa1/lista_campanhas.url';
            fs.writeFileSync(fileName, dic.join('\n'));
            process.exit(0);
        })
        .catch((err) => {
            console.error('\tFALHA: ' + err.toString());
            process.exit(1);
        });
