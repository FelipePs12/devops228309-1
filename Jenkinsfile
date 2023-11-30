pipeline {
    agent any

    stages {
        stage('Instalar Dependências') {
            steps {

                sh '/home/felipesilva/Projetos/devops228309-1'
                sh '/mnt/c/Program\\ Files/nodejs/npm install'
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