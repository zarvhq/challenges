import json
import csv
import pandas as pd
import sys

def load_transform_save(path_to_json_file, function, path_to_csv_file):
    json_df = pd.read_json(path_to_json_file)
    df = function(json_df)
    df.to_csv(path_to_csv_file)

"""
foo is a generic funtion that operates over a dataframe.

In this example, the function replace the columns "firstName" and 
"lastName" for a single colum called "name" in which the pearson's first name
is abreviated.
"""
def foo(a):
    a["firstName"] = a["firstName"].str[0]+"."
    a.insert(0, "name", a["firstName"]+" " +a["lastName"])
    a.drop(columns = ['firstName','lastName'], inplace=True)
    return a

def main():
    if(len(sys.argv)==3):
        path_to_json=sys.argv[1]    
        path_to_csv=sys.argv[2]
    else:
        path_to_json="/home/joaopaulo/Git/challenges/sample.json"
        path_to_csv="/home/joaopaulo/Git/challenges/sample.csv"
    load_transform_save(path_to_json,foo,path_to_csv)

if __name__ == "__main__":
    main()