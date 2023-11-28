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

                            sh 'npm --version'
                            sh 'npm install --no-save'  
                        }
                    }

                }
            }
        }
    }
}