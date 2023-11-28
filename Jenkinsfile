pipeline{
    agent any

    stages {
        stage('Build TADS') {
            steps {
                sh '''
                docker version
                docker compose version
                java --version
                '''
            }
        }
    }

}