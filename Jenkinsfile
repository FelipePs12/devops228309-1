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
                echo 'Alou'
            }
        }

        stage('Test') {
            steps {
                sh 'node package.json start &'  
                sh 'node package.json test'    
            }
        }
    }

    post {
        always {
            sh 'pkill -f "node goat"' 
        }
    }
}

