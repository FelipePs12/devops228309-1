pipeline {
    agent any

    stages {
        stage('Preparar Ambiente') {
            steps {
                sh 'npm --version'
                sh 'node --version'
                sh 'npm install'
            }
        }

        stage('Testes') {
            steps {
                sh 'npm test'
            }
        }

    }
}