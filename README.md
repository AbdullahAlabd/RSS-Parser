# RSS-Parser
![GitHub contributors](https://img.shields.io/github/contributors/AbdullahAlabd/RSS-Parser)


Simple RSS job postings parser web application using Google Maps, build with JavaScript, NodeJs, and MongoDB.

![A Screenshot](https://i.imgur.com/mNXNnrU.png)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To be able to run the project on your system you should have:
 - [Node ^18.16.1](https://nodejs.org/en/download) - A cross-platform JavaScript runtime environment.
 - [MongoDB ^6.0](https://www.mongodb.com/docs/manual/administration/install-community) - A cross-platform document-oriented database program.
 - [Git](https://git-scm.com/downloads) - A free and open-source distributed version control system.

### Installation
To install the project on your system first open the terminal, then follow the given steps and execute the commands on your terminal.
 0. Make sure you have all the prerequisites listed above installed on your system.
 1. Clone the project from GitHub:
 ``` git clone https://github.com/AbdullahAlabd/RSS-Parser```
 2. Switch to the project's directory:
 ```cd RSS-Parser/``` 
 3. Install the required packages from *"package.json"*:
 ```npm install```
 4. Take a copy of config.env.example file and name it config.env or by running: 
```cp ./src/configs/config.env.example ./src/configs/config.env```
 5. Update your credentials in config.env.
 6. Finally, run the app on localhost: ```node app.js``` or using Nodemon for easier development ```npm run dev```
 7. To avoid any issues with Google Maps api, It's preferred to disable any ad-blocking browser extensions on the web app home page.

## Author
* **Abdullah Alabd** - *Initial work* - [AbdullahAlabd](https://github.com/AbdullahAlabd)

See also the list of [contributors](https://github.com/AbdullahAlabd/RSS-Parser/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
