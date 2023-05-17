# Data Engineer Challenge

> Level: **Very Easy**

## Instructions

Code the function `load_transform_save` that recieves a path to a JSON file, a function and a path to a CSV file.

The function must load the JSON file, apply the function to the data and save the result in the CSV file.

The transformation function must be able to translate the expected input json data to the expeted CSV data.

## Formats

**JSON**

```json
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "age": 30,
    "city": "New York"
  },
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "age": 25,
    "city": "Chicago"
  },
  {
    "firstName": "Bob",
    "lastName": "Doe",
    "age": 40,
    "city": "Los Angeles"
  }
]
```

**CSV**
```csv
name,age,city
J. Doe,30,New York
J. Doe,25,Chicago
B. Doe,40,Los Angeles
```

## Notions

- [python-json](https://docs.python.org/3/library/json.html)
- [python-csv](https://docs.python.org/3/library/csv.html)

## Code provided

```python
import json
import csv

def load_transform_save(path_to_json_file, function, path_to_csv_file):
    pass

def main():
    pass

if __name__ == "__main__":
    main()
```

If you have any questions please [open and issue](https://github.com/zarvhq/challenges/issues/new) and we'll reach out to help.

# Compile and Test the code

## To compile and execute the code:

 - Make sure you have Python installed on your machine (version 3.7.x or higher).
 - Copy the provided code and save it in a file with a .py extension (main.py).
 - Open a terminal or command prompt.
 - Navigate to the directory where you saved the Python file.
 - Run the following command to execute the code: python main.py.
 - The program will open two file dialogs: one to select the input JSON file and another to select or create the output CSV file.
 - Choose the appropriate JSON file containing the data you want to transform.
 - Select or create the desired CSV file where the transformed data will be saved.
 - If the selected CSV file already exists, you will be prompted to confirm whether you want to overwrite it.
 - Once the transformation and CSV file creation are completed, a message will be displayed indicating the success of the operation.



## To test the code, you can follow these steps:

 - Prepare a valid JSON file with data in the required format. The JSON file should contain an array of objects, with each object having the keys 'firstName', 'lastName', 'age', and 'city'.
 - Run the code and select your JSON file as the input.
 - Choose or create a CSV file as the output.
 - Verify that the transformation is successful and the CSV file is created with the expected data.
 - You can repeat the testing process with different JSON files to ensure the code handles different input data correctly.
 - Additionally, you can intentionally create a JSON file with invalid data to test the error handling and validation in the code.




# Considerations

## About the implementation

In the provided code, I chose to use the tkinter library and the os module to enhance flexibility. By incorporating these libraries, I aimed to provide a more user-friendly experience by allowing the user to conveniently select files using file dialogs, rather than requiring them to manually enter the complete file paths.

## About the code

In the provided code, the load_transform_save function is responsible for performing multiple tasks, which violates the Single Responsibility Principle (SRP). This function handles reading the JSON file, transforming the data, and writing the CSV file.

A possible improvement would be to separate the responsibilities of the load_transform_save function into distinct functions, each with a single responsibility. For example:

 - A function to load the JSON file and return the data.
 - A function to transform the data.
 - A function to write the transformed data to a CSV file.
