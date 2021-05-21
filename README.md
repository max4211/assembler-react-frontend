# ECE350 Assembler Frontend

## Project Goals
The goal of this application is to streamline the development cycle of ECE350 students in their final project by automating the assembly process. At a high level, the application exposes a REST API where a student can send in a MIPS file (currently supports .s, .txt, and .text but any text parseable input should work) along with desired  file type (e.g. Logism) and base (e.g. Hex) and the API returns an assembled file according to the ISA. [React](https://reactjs.org/) was selected as the development framework of choice for its ease of composition and the widespread usage. Future developers will find a vibrant community for support. 

## Assembler
The assembly component is composed of two Material UI file upload components, one for the MIPS file to assemble and another for the (optional) custom instruction XML file. Upon assembly, on a success a green toast is given along with the automatically downloaded file. On failure, a red toast is given along with (optional) error log indicating what went wrong during assembly.
![](https://i.imgur.com/XrBiJiZ.png)

## Base Converter
A base converter is provided to students, which through client side JavaScript converts numbers between Decimal, Hex, and Binary. The tool is useful as students build out their processor and throughout the semester. It's addition is in the hope of making the site a one stop shop for students as they complete their final project. Basic error validation is incorporated as well.
![](https://i.imgur.com/kywVLcN.png)

## Author
Max Smith

max.smith@duke.edu

smithmax4211@gmail.com
