
"""
0. The code start at main() function.

1. The code first asks (using user_questions function) the user for the path of the json file and 
then for the path of the csv file.

2. The function load_transform_save recieves a path to a JSON file, 
a function and a path to a CSV file.

3 .The function, load_transform_save, load the JSON file, 
apply the transform to the data and save the result in the CSV file.

"""

import json
import csv


def user_questions():
    """
    Function for user questions.

        Arguments:
            None.

        Returns:
            load (str): absolute path to the .json file
            save (str): absolute path to the .csv file

    """
    load = input("Enter the absolute path of the json_file: ")
    save = input("Enter the absolute path of the csv_file: ")
    return (load, save)


def transform(file_to_trasform):
    """
    Function for take all headers of a json file.

        Arguments:
            file_to_trasform(list): json file already load

        Returns:
            list of header

    Obs:A linear scan was deliberately chosen, which increases the algorithm's asymptotic complexity 
    but ensures that no data will be lost.
    """
    lista_header = set()
    for i in file_to_trasform:
        lista_prov = list(i.keys())
        lista_header.update(lista_prov)
    return list(lista_header)


def load_transform_save(path_to_json_file, func, path_to_csv_file):
    """
    Function for take the path of json file, a func[transform] and path_to_csv_file.
    We have de following steps:
    1- open json_file.
    2- Dump to the transform function and receive de headers of the json_file
    3- open csv file and write the info.

        Arguments:
            path_to_json_file(str): path to json file
            func(function): function tha treats the json file
            path_to_csv_file: path to csv file

        Returns:
            None
    """
    with open(path_to_json_file) as file:
        file_load = json.load(file)
        headers = func(file_load)
    with open(path_to_csv_file, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=headers)
        writer.writeheader()
        for row in file_load:
            writer.writerow(row)


def main():
    """
    Start the program.
    1- Ask user to indicate de absolute path of files
    2- load_transform_save
    """
    respostas = user_questions()
    load_transform_save(respostas[0], transform, respostas[1])


if __name__ == "__main__":
    main()
