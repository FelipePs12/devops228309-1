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
    }

    post {
        success {
            echo 'Pipeline bem-sucedida!'
        }
        failure {
            echo 'Pipeline falhou!'
        }
        always {
            sh 'docker rm -f devops228309-1-web-1'
        }
    }
}