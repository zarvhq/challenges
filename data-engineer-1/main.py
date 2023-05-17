import json
import csv
from tkinter import Tk, filedialog
import os

def load_transform_save(path_to_json_file, function, path_to_csv_file):
    # Load JSON data from the input file
    try:
        with open(path_to_json_file) as json_file:
            data = json.load(json_file)
    except FileNotFoundError:
        print(f"Error: JSON file '{path_to_json_file}' not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{path_to_json_file}'.")
        return

    # Apply the transformation function to the loaded data
    try:
        transformed_data = function(data)
    except Exception as e:
        print(f"Error: Data transformation failed. {e}")
        return
    
    # Save the transformed data to a CSV file
    try:
        # Check if the CSV file already exists
        if os.path.exists(path_to_csv_file):
            overwrite = input(f"CSV file '{path_to_csv_file}' already exists. Do you want to overwrite it? (y/n): ")
            if overwrite.lower() != 'y':
                print("CSV file creation canceled.")
                return

        with open(path_to_csv_file, 'w', newline='') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow(['name', 'age', 'city'])
            writer.writerows(transformed_data)
    except Exception as e:
        print(f"Error: CSV file writing failed. {e}")
        return

    print(f"Data transformation completed. CSV file saved to '{path_to_csv_file}'.")

def transform_data(data):
    # Perform the data transformation
    transformed_data = []
    for item in data:
        if 'firstName' in item and 'lastName' in item and 'age' in item and 'city' in item:
            name = f"{item['firstName'][0]}. {item['lastName']}"
            age = item['age']
            city = item['city']
            transformed_data.append([name, age, city])
        else:
            raise ValueError("Invalid data format.")
    return transformed_data

def main():
    # Create Tk instance and hide the main window
    root = Tk()
    root.withdraw()

    # Open file dialogs to select input and output files
    input_json_file = filedialog.askopenfilename(title="Select JSON input file", filetypes=[("JSON files", "*.json")])
    output_csv_file = filedialog.asksaveasfilename(title="Select CSV output file", defaultextension=".csv", filetypes=[("CSV files", "*.csv")])

    # Run the transformation and save the CSV file
    load_transform_save(input_json_file, transform_data, output_csv_file)

if __name__ == "__main__":
    main()
