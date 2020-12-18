pipeline {
    agent {
        docker {
            image 'node:10-alpine' 
            args '-p 10000:10000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}