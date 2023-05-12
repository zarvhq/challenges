README

O seguinte programa foi criado para resolver o desafio proposto no github da empresa Zarv. Abaixo, explicarei o modo de funcionamento, os requisitos (linguagem utilizada, bibliotecas importadas) e a lógica por trás da organização do código.


1. Requisitos:

	1.1. Compilador de código em Python. De preferência versões mais recentes (3.10 em diante);
	1.2. Instalação das bibliotecas python adicionais pandas e tkinter, utilizando o comando pip install no terminal;
	

2. Modo de funcionamento:

	2.1. Abra o diretório "Zarv_Challenge_Solution", e execute a função "main.py", localizada dentro 
	desse mesmo diretório;
	Obs: Para aqueles sagazes que se utilizam de linux, basta então executar como python -m <path_do_diretorio>/main.py

	2.2. Uma vez executado, o programa abrirá uma search window, para que o usuário possa mais facilmente escolher o arquivo
	JSON que deseja converter para a extensão .csv ;

	2.3. Logo em seguida, uma segunda search window será aberta, dessa vez solicitando que o usuário escolha um diretório para
	salvar o arquivo .csv criado, bem como um nome para o mesmo arquivo ;

	2.4. Voilà. Após clicar em salvar, basta ir até o diretório que escolheu para salvar a extensão .csv, e lá estará o arquivo te
	esperando.

3. Lógica do Código:
	
	Sempre tento estruturar meus códigos de forma compartimentalizada, o que, além de facilitar bastante o processo de debug, propicia
	um código mais organizado e fácil de ler e entender. Como a task do desafio é relativamente simples, optei por dividir o código 
	em apenas dois arquivos:
	
	3.1. main.py : é o arquivo que, quando aberto, executa o programa, e chama as funções, classes e bibliotecas necessárias à conversão
	do arquivo JSON em .csv;

	3.2. Functions.py : arquivo secundário utilizado para armazenar as funções que executam o processo de ETL em si (basicamente, a 
	"Engine" do programa);

	A ideia foi tentar abstrair a tarefa, dividindo o trabalho necessário em tasks menores, de forma que cada função tem um único objetivo,
	o que facilita na hora de revisar o código, e a leitura do mesmo. Dessa forma, as funcoes em Functions.py tem, cada uma, um único objetivo.
	transformation_function recebe um dataframe com os dados carregados, e faz a manipulação de forma a deixá-los na estrutura organizacional proposta.
	A funcao json_csv_converter recebe os dados do JSON em forma de dicionário, e salva em .csv, sendo as tarefas delegadas a uma função auxiliar.
	O load_transform_save recebe os 3 parâmetros exigidos (caminho do arquivo JSON, funcao de transformacao e caminho para salvar o csv), lê o arquivo
	JSON, e chama função auxiliar para executar a manipulação, conversão e a operação de salvar os dados.


OBS: fiquei com uma dúvida ao ler o enunciado, pois a função dada pelo desafio (load_transform_save) DEVE receber 3 parâmetros:
o caminho do arquivo JSON, uma função ETL para conversão em .csv e na estrutura de dados desejada, e um caminho para salvar o arquivo
convertido em .csv. Então, há duas interpretações:

	I. A função ETL é passada pelo usuário/examinador quando da execução do código;

	II. A criação da função ETL é de minha responsabilidade, e é passada como parâmetro de antemão (não pode ser alterada em run-time).

Assumi o segundo caso, e fiz meu código em torno dessa suposição. Caso esteja enganado, peço que entrem em contato, explicando o que esperam do código,
para que possa refatora-lo o mais rápido possível.







	
	





