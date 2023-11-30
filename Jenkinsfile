pipeline {
    agent any

    stages {

            stage('Instalar Dependências') {
        steps {
            sh 'npm install'
        }
    }
        stage('Executar Testes') {
            steps {
                
                sh 'docker exec devops228309-1-web-1 npm test'
            }
        }

        // Adicione mais estágios conforme necessário para sua pipeline
    }
}