#!/bin/bash
# arquivo....: obter_lista_campanhas.sh
# descrição..: acessar a página de pesquisa
#    do catarse e obter as url das campanhas
#    desejadas
# autor......: Erick Silva
# ------------------------------------------

FILE=etapa1/lista_campanhas.url
if [[ -f "$FILE" ]]; then
	echo 'apagar lista prévia de campanhas'
	rm "$FILE"
fi

node ./obter_lista_campanhas.js
