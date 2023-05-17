"""
Script para transformação de arquivos .json em arquivos .csv
Modo de funcionamento:
Arquivos .json encontrados na pasta json_files (na root do projeto)
são transformados em arquivos .csv e salvo na pasta csv_files
"""
import json
import csv
from typing import Callable

from file_manager import FileManager, JSON_FILES_FOLDER, CSV_FILES_FOLDER


def load_json_file(file_path: str) -> dict:
    """
    Abre um arquivo json e retona seu conteúdo como um dicionário
    """
    with open(file_path) as json_file:
        data_json = json.load(json_file)
    return data_json


def json_to_csv_transformation(data_json: dict) -> tuple[list]:
    """
    Transforma os dados de um dicionário (nested data) para uma tupla contendo listas (flat data)
    que será transformada no arquivo csv
    A primeira lista dentro da tupla é a header do csv, as demais listas são suas linhas
    """
    csv_header_fields = ['name', 'age', 'city']
    names: list = [f"{row['firstName'][0]}. {row['lastName']}" for row in data_json]
    ages: list = [f"{row['age']}" for row in data_json]
    cities: list = [f"{row['city']}" for row in data_json]
    data_csv_formatted = (csv_header_fields, ) + tuple(zip(names, ages, cities))
    return data_csv_formatted


def save_csv_file(csv_data: tuple[list], file_path: str) -> None:
    """
    Salva o conteúdo presente em csv_data no path fornecido por file_path.
    Se já houver algum arquivo com mesmo nome na pasta, o novo sobrescreve o antigo
    """
    with open(file_path, 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(csv_data)
    return


def load_transform_save(path_to_json_file: str, function: Callable, path_to_csv_file: str) -> None:
    """
    Orquestração da pipeline etl: extrai, transforma e salva os dados de .json para .csv
    """

    data_json: dict = load_json_file(path_to_json_file)

    data_csv_formatted: tuple = function(data_json)

    save_csv_file(data_csv_formatted, path_to_csv_file)

    return


def main() -> None:
    """
    Endpoint para execução da tarefa.
    Também exerce outras duas tarefas auxiliares:
        - aciona gerenciador de arquivos para obter e manipular paths dos arquivos
        - comunicação com o usuário
    """

    FileManager.setup_json_to_csv_folders()

    json_file_paths: list = FileManager.get_json_file_paths()

    if not json_file_paths:
        print(f"Nenhum arquivo com formato .json encontrado na pasta '{JSON_FILES_FOLDER}'.")
        return

    csv_file_paths: list = FileManager.create_csv_file_paths_from_json_file_paths(json_file_paths)

    file_paths = tuple(zip(json_file_paths, csv_file_paths))

    print('Iniciando a pipeline de dados.')
    success_counter = 0
    failures: dict = {}
    for json_file_path, csv_file_path in file_paths:
        try:
            load_transform_save(json_file_path, json_to_csv_transformation, csv_file_path)
            success_counter += 1
        except Exception as error:
            json_file_name: str = FileManager.get_file_name_from_path(json_file_path)
            failures.update({json_file_name: error})

    if not failures:
        print(f"Todos os arquivos foram transformados com sucesso e os resultados estão na pasta '{CSV_FILES_FOLDER}'.")
        return

    print(f"Foram transformados {success_counter} arquivos com sucesso e os resultados estão na pasta '{CSV_FILES_FOLDER}'.\n"
          f'Os seguintes arquivos não foram transformados:')
    for json_file_name in failures.keys():
        print(f'- {json_file_name}')

    return


if __name__ == "__main__":
    main()
