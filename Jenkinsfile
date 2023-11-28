pipeline{
    agent any

    stages {
        stage('Build TADS') {
            steps {
                sh '''
                docker info
                docker version
                docker composer version
                java --version
                '''
            }
        }
    }

}