
# here Im importing the widely known pandas library to more easily manipulate the data structure we´ll receive.
# I imported the tkinter library in order to use the "open file" functions, which will prompt a window for navigation, in which you can locate the JSON file you want
# to convert more easily, and can also choose the name and directory of the .csv converted file
# Since I compartimentalized the code (for cleaner code and easier time debugging), I´m importing the necessary functions from the Functions.py file.
import pandas as pd
from tkinter import filedialog
from Functions import load_transform_save, json_csv_converter


# our main script, which will prompt the execution of our converter program
def main():
    
    # here, I use the "askopenfilename" function from the GUI library tkinter in order to open a search window so the user can locate the JSON file they wish to convert
    json_file_path = filedialog.askopenfilename(title = "Select JSON file to convert")
    
    # Using the "asksaveasfilename", the program opens a search window so you can more easily select the directory and name of the .csv converted file
    path_to_csv_file = filedialog.asksaveasfilename(title = "Select directory to save the .csv converted file",defaultextension=".csv",
                                            filetypes=[("csv file", ".csv")],
                                            )  
    
    # the function that is the actual engine of the program, and executes the ETL proccess. For more detailed information, look into the Functions.py file
    load_transform_save(json_file_path,json_csv_converter, path_to_csv_file)
    
    pass

if __name__ == "__main__":
    main()