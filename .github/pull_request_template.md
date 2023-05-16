## About You

Name: Ivan Gomes Ferreira dos Santos

Email: xivangfsx@gmail.com

Whatsapp: (13) 996032130

Linkedin: (https://www.linkedin.com/in/ivan-gomes-ferreira-dos-santos-6a8790132/)


## About your solution

Before start explanin my solution, i will say my view on the challenge.
I saw it as a user/client request to a simple thing that is take a standart .Json file that need to be treated to a .Csv
Following that line of tought I was thinking on using pandas to make the convertion, but, instead I choose to stay with the basic lib.
So I choose to make a input of path to the .Json file and a little verification to see if the path and the file exisit or not. Put a input for the .Csv too for the user/client choose the best place for the file.
After that using the json.loads I treat the .Json file to see if really is a .Json file and is not type wrong. (Using the tought that the user/client will use only that type of Json file)
Then using the tools on the csv I build the file using the already checked and treated .Json file.

## Your findings

(https://docs.python.org/3/library/json.html)
(https://docs.python.org/3/library/csv.html)
(https://www.python-engineer.com/posts/check-if-file-exists/)


## How to run your code?

Python 3.11.3 version
Using Vscode
Extesion Python, will pull another two extesion together
Open the terminal and input the command below
py data-engineer-1/solution.py -start 