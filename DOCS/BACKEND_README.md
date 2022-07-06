## Backend SIS-AEB SAP

### Serviços

##### GATEWAY
Gateway para comunicação entre serviços backend e para autenticação.

##### SAP 
Sistema núcleo

##### ESTRUTURAL
Controla unidades

### Arquivos de configuração para deploy

Tudo está localizado nos arquivos `env.py` presentes nos diretórios dos serviços.

Campos mais importantes

````py
USER_DB = "USUÁRIO DO BANCO"
PASSWORD_DB = "SENHA DO USUÁRIO"
SERVER_DB = "IP/URL DO SERVIDOR DO BANCO"
DB_NAME = "NOME DO BANCO"

RABBITMQ_SERVER = "SERVIDOR RABBIT MQ"
RABBITMQ_USER = "USUÁRIO RABBIT MQ"
RABBITMQ_PASSWORD = "SENHA DO USUÁRIO RABBIT MQ"
````

**OBS**: Rabbit MQ está configurado para escutar a porta `5672`.
**OBS-1**: No caso do serviço ***SAP*** o arquivo env.py contém o endereço do sistema estrutural presente na variável `STRUCTURAL_URL`, tal deve estar configurada adequadamente para comunicação com o sistema `ESTRUTURAL`
**OBS-2**: Em caso de configuração do zero para o `GATEWAY` o arquivo env.py contém dados do AD que será utilizado para as autenticações futuras.


### Execução em desenvolvimento
````shell
mkdir logs
python3 -m flask run --host=0.0.0.0 --port=PORTA_DO_SERVIÇO > logs/service.log 2>&1 & echo $! > service.pid
````
Os logs da execução serão armazenados no arquivo no caminho `/logs/service.log`, o ID da execução estará no arquivo `service.pid`
