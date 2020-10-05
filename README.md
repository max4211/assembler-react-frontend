# ECE350 Assembler Frontend

## Project Goals
The goal of this application is to streamline the development cycle of ECE350 students in their final project by automating the assembly process. At a high level, the application exposes a REST API where a student can send in a .s file along with target file type (e.g. Logism) and base (e.g. Hex) and the API returns an assembled file according to the ISA.

Design goals of the project were to write code that is closed to modification but open to extension. I leveraged a variety of object oriented design patterns/principles - including SOLID, factories, design to contract via interfaces, one way data flow, etc. - to achieve this. Additionally, I hoped to abstract away any dependency on a particular ISA (ideallly a RISC architecture) and leave the assembler open to future modifications at runtime by swapping out a data file (unless Professor Board decides to curse the class with x86, if so good luck to you future 350 students).

The frontend utilizes [react-dropzone](https://github.com/react-dropzone/react-dropzone) to enable file drops and append these to the form which is submitted to the REST API.

## Author
Max Smith

max.smith@duke.edu
