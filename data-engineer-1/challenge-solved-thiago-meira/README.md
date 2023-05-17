
# Data Engineer Challenge - JSON to CSV

In this challenge I created a simple script that transforms a JSON file to CSV.

## About the solution

In this fairly simple script I tried to write the best piece of software possible without overengineering it. This led
me to a couple decisions which can be discussed.

The first one is why I split the script into 2 separated files. The code isn't that complex to need a complex file 
structure,  but the reasoning behind it is that the file management part of it is something that can (and may) be 
reused by other simple scripts when the need comes. Also, it holds some very particular logic regarding generic OS paths
that is easy to do wrong when in a hurry, so it's nice to place this kind of logic in just one place to have a single 
source of truth when dealing with it.

Regarding responsibility segregations a lot could be done better. For example, the main() function executes three
different tasks. I'll list them down and give brief examples that may serve as opportunities to refactor it:
- Make the endpoint available. If it's only one function, it's okay to bundle its endpoint with other tasks. Problems
start to rise when more functions are created, and it may be a good idea to centralize all the endpoints in a more
orderly manner.
- Communication with the client. The communication are simple messages printed on the terminal. They could be moved to 
another place if the client wants a more pleasant (and more cumbersome) way to receive those messages, or the dev team
may want proper logging to make debugging easier.
- Coordination of the pipeline. Given that it's a simple pipeline dealing with small chunks of data, there's no problem
in a simple coordination of tasks. If the dataset grows larger, we may want to change the flow of the pipeline to 
enhance the performance.

All of those may be good opportunities to make the design of the software better in the future, but right now I think
they would just be overengineering.

Finally, regarding documentation, I tried to make functions as straight-foward as possible so that they are 
self-evident, but to make the code more readable, I added small docstrings to every custom function that I made. I'm not 
sure if that's the desired level of documentation, but I do see the point to make the reader's life easier by properly
explaining what my functions do. There may be more complex scenarios in which we may need further details on the 
architecture, for example. Type hints are also a small and very helpful thing to do. Overall, I tried to be minimal 
without being lacking.


## My findings

What made me scratch my head thinking about this challenge is all the ways a client may mess it up. By choosing the 
'read from folder' and 'report any file that fails' approach I think I got it mostly covered. I think that the error
catching part could explain better what went wrong. Tests are also not there, and they would help during the refactoring
that I mentioned above. Lack of tests is certainly a flaw and not the best practice.

## Setup Instructions

### Python 3.7

1. Navigate to the folder you wish to run the app
2. Paste the files 'json_to_csv.py' and 'file_manager.py' to this folder
3. If not there, create another folder inside it named 'json_files'.
4. Place all the json files you wish to transform there
5. Using the terminal, issue the command 'python json_to_csv.py' and voilà
6. The results (if any) are in the newly created 'csv_files' folder

