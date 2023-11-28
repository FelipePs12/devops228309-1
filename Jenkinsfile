pipeline{
    agent any

    stages {
        stage('Build TADS') {
            steps {
                sh '''
                docker info
                docker version
                docker compose version
                java --version
                '''
            }
        }
    }

}