import pandas as pd
import json


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