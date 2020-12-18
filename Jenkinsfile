pipeline {
    agent {
        docker {
            image 'node:10-alpine' 
            args '-p 10000:10000' 
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Deliver') {
            steps {
                sh 'npm start'
            }
        }
    } 
}