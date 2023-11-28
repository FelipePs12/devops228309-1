pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                sh 'npm install' 

                sh 'npm start &'
                sleep 10  

                sh 'npm test' 
            }
        }
    }

    post {
        always {
            sh 'pkill node'
        }
    }
}