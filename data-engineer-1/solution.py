import json
import csv
import os #Lib to check

"""
    Function to get the path of the .Json file, with a verificacion if the file or the path exist
    In case of not having found will redo until a porper file and path are input.
    The .Csv path is also input here, but, don't have te verification, because, it will create the file on the program path, if no information is input
"""
def input_path():
    print ("Put the path of the .Json file. Ex: C:/files/name.json") #Only a remainder to help input the correct path
    load = input ("Json path: ")
    if os.path.exists(load):   #Verify if is getting a existing file
        print ("Choose where the .csv will be create. Ex: C:/files/name.csv") #Only a remainder to help input the correct path
        save = input ("CSV path: ")
        return (load, save)
    else:
        print ("File not found or invalid") #Message in case the path or the file is not found
        return input_path()
    
"""
    Function that get the path on the function above, read the .Json file and do a quick verification if really is a . Json file
    After the verification, is build the header for the csv file. 
    With the path to csv file, it create passing the headers to fieldnames and finishing built the .Csv
"""   
def load_transform_save(path_to_json_file, path_to_csv_file):

    with open(path_to_json_file, 'r') as List:
        try: 
            file = json.load(List) #Reads the Json file and already start the verification
        except ValueError as error:
            print ("Json file is invalid")
            return input_path()
        headers = file[0].keys()

    with open(path_to_csv_file, 'w') as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(file)
"""
    Starts the program, get the path on "input_path" and pass to the function "load_transform_save"    
"""
def main():
   Path = input_path()
   load_transform_save(Path[0], Path[1])
   
if __name__ == "__main__":
    main()