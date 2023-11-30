pipeline {
    agent any

    
    stages {
            post {
        success {
            echo 'Pipeline bem-sucedida! Envie notificações aqui.'
        }
        failure {
            echo 'Pipeline falhou! Envie notificações aqui.'
        }
    }

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
        post {
            always {
            sh 'docker rm -f devops228309-1-web-1'
        }
    }
    }
}