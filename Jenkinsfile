pipeline {
    agent any

    stages{
        stage ('build') {
            steps {

                nodejs(nodeJSInstallationName: 'NodeJS-21.2.0') {
                    script {
                            sh 'npm install'
                            sh 'npm install --no-save'  
                        
                    }

                }
            }
        }
    }
}