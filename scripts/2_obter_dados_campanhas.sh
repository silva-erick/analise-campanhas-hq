#!/bin/bash
# arquivo....: obter_dados_campanhas.sh
# descrição..: ler o arquivo de campanhas e,
#    para cada campanha, executar o script
#    que baixa os dados de cada uma.
# autor......: Erick Silva
# ------------------------------------------

INPUT=etapa1/lista_campanhas.url
OLDIFS=$IFS
IFS=';'

FILE=erros.log
if [[ -f "$FILE" ]]; then
	echo 'apagando log de erros'
	rm erros.log
fi


j="0"
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read camp
do
	j=$[$j+1]
	echo "$j - Campanha : $camp"

	FILE=./etapa2/$camp.json
	echo "$FILE"
	if [ -f "$FILE" ]; then
			echo 'arquivo já existe'
			continue
	else
			echo 'arquivo não existe'
	fi

	i="0"
	while ! node ./campanha.js "$camp";
	do

		echo 'removendo arquivo de erro'
		rm "etapa2/$camp.erro"
		i=$[$i+1]
		if [ $i -eq 4 ]
			then
				echo "$camp" >> erros.log
				echo 'desistindo'
				break
			fi
		echo 'vamos tentar de novo'
	done

done < $INPUT
IFS=$OLDIFS
