pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm start &'  
                sh 'npm test'    
            }
        }
    }

    post {
        always {
            sh 'pkill -f "node goat"' 
        }
    }
}