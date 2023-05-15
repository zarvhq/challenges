import pandas as pd
import json
import re
from tkinter import filedialog

  
# this functions receives the json file contents, now in pandas dataframe format, and edits it so the data structure matches the one asked in the challenge
def transformation_function(file_df):
    
    
    file_df['name'] = None # creating a "name" column, initially empty
    
    # loop that goes through each of the dataframe´s rows. It´ll transform the firstName of that row into the first character of the string
    # followed by a point and a space (". ")
    # then, in each row, we assign for the "name" column created beforehand, a string, which is composed by the first_name variable + lastName value in that row
    for index in file_df.index:
        first_name = file_df.loc[index,'firstName']
        first_name = [*first_name][0] + ". "
        
        file_df.loc[index,'name'] = first_name + file_df.loc[index,'lastName']
     
    # here, we drop the firstName and lastName columns, since they won´t be used in the defined data strcuture for the .csv file
    # we also rearrange the column order using the insert command, putting the "name" column up first, thus matching the desired data structure  
    file_df.drop(columns = ['firstName','lastName'], inplace = True)
    file_df.insert(0, 'name', file_df.pop('name'))    
    
    return file_df



# a simple function that receives a json_dict, changes into a dataframe, transforms the data with the above "transformation_function" and finally
# saves the .csv file in the chosen directory
def json_csv_converter(json_dict, path_to_csv_file):
    
    file_df = pd.DataFrame(json_dict) # transforming the dictionary into dataframe
    
    file_df = transformation_function(file_df) # transforming the data to match the desired data structure
    file_df.to_csv(path_to_csv_file, sep = ",", index = False) # function that saves the formatted data into a .csv file
    
    pass

# the main function, that is directly called in our main script. it receives 3 arguments: a path to the json file we wish to convert, a json_csv converter function,
# and the path which we wish to save our .csv file.
def load_transform_save(path_to_json_file, function, path_to_csv_file):
    
    # reading the contents of the json file and putting it into a variable. Because the contents are organized in a python dictionary format, the name of the variable is
    # called "json_dict"
     with open(path_to_json_file, 'r') as j:
        json_dict = json.loads(j.read())
        # executes the json_csv_converter function which is passed as a parameter in the main script
        function(json_dict, path_to_csv_file)    
pass


# Function that will receive the json file path that was inputted in run-time by the user, and check whether the file is actually a json file, and wheter or not it is corrupted
# This is a recursive function, that will warn you if you input a wrong file (and if the problem is corruption or file extension), and ask you to input a file again,
# with a window search box.
def check_file(path_to_json_file):
    
    # A regex function that will check if the file chosen by the user ends with a .json extension
    regex_json = re.search('\.json$', path_to_json_file)
    
    # if the file indeed has a .json extension, I will enter this logical loop
    if regex_json:
        
        # now I try to actually read the file given to me. If it can be read by json.loads, the try will work, and the function will return the path given as correct
        try:
            with open(path_to_json_file, 'r') as j:
                json_dict = json.loads(j.read())

        # if, for some reason, the json.loads function can´t read the file, even it being of a .json extension, the program will assume it is corrupted, will ask for the user to
        # input the file again with a window search box, and then will proceed to call the check_file function recursively, to verify if the newly input file is valid.
        except:
            print('Arquivo inserido está corrompido e/ou não pode ser lido. Tente novamente inserir um arquivo JSON.')
            path_to_json_file = filedialog.askopenfilename(title = "Select JSON file to convert")
            check_file(path_to_json_file)
    
    # if the file doesnt end with a .json extension, it means it is not a JSON file. In that case, the function will warn the user that the file is not a JSON file, will 
    # prompt the window search box again, asking to input a JSON file, and then will recursively call itself to check if the newly inputted file is valid. 
    else:
        print('Arquivo não é do formato JSON. Tente novamente inserir um arquivo JSON.')
        path_to_json_file = filedialog.askopenfilename(title = "Select JSON file to convert")
        check_file(path_to_json_file)
        
    
    return path_to_json_file
        
    
    pass
        
        
        
        
    


            

    
    