pipeline {
    agent any

    stages{
        stage ('build') {
            steps {

                nodejs(nodeJSInstallationName: 'NodeJS-21.2.0') {
                    script {
                        if(isUnix() == true) {

                            sh 'npm --version'
                            sh 'npm install'
                        }
                        else {

                            bat 'npm --version'
                            bat 'npm install --no-save'  
                        }
                    }

                }
            }
        }
    }
}