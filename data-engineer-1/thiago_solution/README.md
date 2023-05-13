# Data Engineer Challenge - Thiago Solution 👺☁️

## Personal Questions and Answers Before Writing the Solution🧘‍♀️:

1. I want to create a code that runs anywhere, how will the program's know the file paths?

<b>Answer</b>: I will ask the user to put the absolute path of the file.

2. How to ensure that the program reads all the data?

<b>Answer</b>: Using linear scanning. This will increase the asymptotic complexity of my algorithm, but it's better to have something less efficient than to lose the data.
When faced with the possibility of losing data, it is often preferable to prioritize reliability over efficiency. In such cases, employing a linear scanning approach can help ensure that no data is lost, even if it comes at the cost of increased algorithmic complexity

3. Will the JSON file always be nicely formatted as provided?

<b>Answer</b>:The formatting of a JSON file may vary depending on how it is generated or modified. While the JSON file provided may be well-formatted and easy to read, it cannot be assumed that all JSON files will have the same consistent formatting.
That's why I created a function that also handles nested values.
To accommodate the possibility of nested values in the JSON file, I developed a function that can handle such structures. By considering nested values, the function ensures that data at different levels of the JSON hierarchy can be processed appropriately.

## How to run the code?💻(Baby steps):

This code only uses the python inbult librares, so, it's not necessary any type of requirement file. 

1. Install python3 into your pc.
2. Create a folder for the code.
3. Clone the files into this folder. 
4. Create a personal env using python3.
5. Go to your terminal and go to folder that contains the file 'data_challenge.py'
6. Create an empty csv file anywhere you want (remender to know you absolute path).
7. Get or Create a json file anywhere you want (remender to know you absolute path).
6. Run code by type into your terminal `python data_challenge.py`, answer the questions correctly, with absolute values ​​of the files and the type of treatment you want to give.
7. DONE 😮‍💨.

## What locations did I research about what I could do?🧐
- [python-json](https://docs.python.org/3/library/json.html)
- [python-csv](https://docs.python.org/3/library/csv.html)


## Program logic diagram.🔺🔸🔹

`parameters`

-- main() --> user_questions() --> `path_of_files` --> `transform()` --> load_transform_save() --> transform() --> result✳️

1. Don't forget to read the docstring's in the file.