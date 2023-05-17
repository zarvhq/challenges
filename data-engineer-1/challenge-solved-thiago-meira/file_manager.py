"""
Classe responsável pelo gerenciamento de pastas e arquivos envolvidos no projeto
WARNING! Usa paths relativos! Não altere o script de lugar sem se atentar a isso
"""
import os
from pathlib import Path


JSON_FILES_FOLDER: str = 'json_files'
CSV_FILES_FOLDER: str = 'csv_files'


class FileManager:

    @staticmethod
    def setup_json_to_csv_folders() -> None:
        """
        Cria as pastas que armazenam os arquivos .json e .csv se elas não estiverem la
        """
        if not os.path.exists(JSON_FILES_FOLDER):
            os.makedirs(JSON_FILES_FOLDER)
        if not os.path.exists(CSV_FILES_FOLDER):
            os.makedirs(CSV_FILES_FOLDER)
        return

    @staticmethod
    def get_json_file_paths() -> list[str]:
        """
        Lê todos os arquivos .json dentro da pasta adequada para eles e retorna uma lista com seus paths relativos
        """
        json_folder_content = os.listdir(JSON_FILES_FOLDER)
        json_file_paths = [
            str(JSON_FILES_FOLDER / Path(path))
            for path in json_folder_content
            if Path(path).suffix == '.json'
        ]
        return json_file_paths

    @staticmethod
    def create_csv_file_paths_from_json_file_paths(file_paths: list[str]) -> list[str]:
        """
        Recebe lista com paths relativos de arquivos json
        Retorna lista com paths relativos de arquivos csv
        Todos os paths dos arquivos json recebidos no argumento devem se referir a pasta para arquivos json adequada
        """
        new_paths = [
            path.replace(JSON_FILES_FOLDER, CSV_FILES_FOLDER)
            for path in file_paths
        ]
        new_paths = [str(Path(path).with_suffix('.csv')) for path in new_paths]
        return new_paths

    @staticmethod
    def get_file_name_from_path(file_path: str) -> str:
        """
        Recebe um path e retorna o nome do arquivo.
        Se path não for de um arquivo, retorna uma string vazia
        """
        return str(Path(file_path).name)
