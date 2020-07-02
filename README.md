# UNSW_Australia 2020 Wiki

## Setup

### Github and Git
If you have any issues with these setup steps send me a message on slack. I've tested them on windows.

Sign-up for a github account [here](https://github.com/join).

Message @jackrobbers your github username so you can be added to the UNSW-iGEM organisation and make changes to the wiki code. You'll be able to view and edit the code locally before being added to the organisation, but not push any changes to the repo.

Download and install git from [here](https://git-scm.com/downloads). Set the default editor as either vscode or sublime. Leave every other option as the default.

Download and install github desktop from [here](https://desktop.github.com/). You'll use this tool to manage your changes and share them with the team.

Sign into your github account on github desktop.

Click "Clone a repository from the Internet..."

Type in "UNSW-iGEM/wiki-2020" and click clone. This downloads all of the wiki code onto your computer. It might ask you to "initilize git lfs", which you should do.

### Node.js, NPM, Gulp

Download and install node.js from [here](https://nodejs.org/en/download/). Click the large green square under LTS that corresponds to your OS. Wikibrick is built on node.js.

From Github Desktop, Select "Repository > Open in Command Prompt (Windows) / Open in Command Prompt (Mac)".

Type "npm install" and press enter. This will install all of the other software required to run the wiki code. If it doesn't work, reboot your computer to make sure node is installed correctly.

Type "npm install --global gulp-cli" and press enter

Type "npm install --global bower" and press enter

Type "bower install" and press enter.

## Usage

### Running locally

```gulp serve```
this will start a local webserver that you access with your browser..

### Publishing to the wiki

```gulp publish -l```
