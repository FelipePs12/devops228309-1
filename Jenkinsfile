pipeline {
    agent any

    stages {
        stage('Dependências') {
            steps {
                sh '/mnt/c/Program Files/nodejs//npm'
            }
        }

        stage('Testes') {
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