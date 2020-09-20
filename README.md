# Análise de campanhas de financiamento coletivo no Catarse
Scripts para análise de campanhas de financiamento coletivo no Catarse usados no trabalho de iniciação científica: "Financiamento Coletivo e Quadrinhos - Estudo das campanhas realizadas na plataforma Catarse".

## Preparação do ambiente para obter os dados via script

Instalar o nodejs para execução de scripts Javascript em linha de comando, o npm, que faz o download de pacotes nodejs e o puppeteer, um pacote nodejs que ajuda a acessar uma página web e manipular suas informações:

```
$ sudo apt update
$ sudo apt install nodejs
$ sudo apt install npm
$ npm i puppeteer
```

## Execução dos scripts
Os scripts para obter os dados das campanhas e consolidá-los num arquivo CSV estão na pasta scripts (que criativo esse nome, kkkkk).

O script obter_lista_campanhas.js aponta para a URL https://www.catarse.me/explore?ref=ctrse_header&mode=not_sub&category_id=7&filter=finished. Essa URL contém os parâmetros para os projetos pontuais, finalizados, de quadrinhos. Para explorar outras categorias, basta usar a URL correspondente. Para tanto, acesse https://www.catarse.me/explore e verifique a URL gerada conforme os parâmetros informados.

Para obter a lista de campanhas:
```
./1_obter_lista_campanhas.sh
```

Para obter os dados de cada campanha:
```
./2_obter_dados_campanhas.sh
```

Para consolidar os resultados num arquivo CSV:
```
./3_consolidar_resultados.sh
```

O arquivo será salvo na pasta etapa3 com o nome campanhas_catarse.csv.

## Planilhas com os dados
A planilha utilizada na pesquisa está na pasta dados_hq_2011_2019 e contém dados das campanhas de projetos pontuais de quadrinhos, já finalizadas.

As planilhas que terminam com "-dados-brutos" estão em formato CSV, ODS (LibreOffice Calc) e XLSX (Excel). Estes dados estão como foram obtidos pelos códigos da pasta scripts.

As planilhas que terminam com "-complementação" estão em formato ODS (LibreOffice Calc) e XLSX (Excel). As planilhas contém apenas as campanhas entre 2011 e 2019 e passaram por complementação manual: além de alguns campos que os scripts não conseguiram obter, houve o preenchimento dos campos "perfil" (individual, coletivo ou perfil indefinido) e "gênero" (masculino e feminino).
