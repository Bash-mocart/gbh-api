pipeline {
    agent any
    options {
    buildDiscarder(logRotator(artifactDaysToKeepStr: '1'))
  }

    stages {
        stage('Install Web Api') {
            steps {
                dir('demo-api'){
    
                  sh 'npm ci'
                }
            }
        }


        stage('Archive Web Api'){
            steps {
                sh 'tar -czvf demo-api.gz demo-api'
            }
        }


        stage('Copy artifacts Web Api'){
            steps {
          
                sh 'cp demo-api.gz ansible/roles/deploy-app/files'
                
            }
        }

        stage('Appending url to inventory'){
            steps {
                sh 'echo $server_url >> ansible/inventory.txt'
                sh "cat ansible/inventory.txt"
                
            }
        }

        stage (' Configure server ') {
              when {
                  expression { return params.current_status == "closed" && params.merged == true }
              }
            steps {
               ansiblePlaybook become: true, credentialsId: '22a3984f-4c4e-4139-b1cf-ab1cf7753ddd', disableHostKeyChecking: true, installation: 'ansible-playbook', inventory: 'ansible/inventory.txt', playbook: 'ansible/configure-server.yml', sudoUser: null
            }

        }  // replace the credentialsId with yours

        stage (' Deploy app ') {
              when {
                  expression { return params.current_status == "closed" && params.merged == true }
              }
            steps {
               ansiblePlaybook become: true, credentialsId: '22a3984f-4c4e-4139-b1cf-ab1cf7753ddd', disableHostKeyChecking: true, installation: 'ansible-playbook', inventory: 'ansible/inventory.txt', playbook: 'ansible/deploy-app.yml', sudoUser: null
            }

        } // replace the credentialsId with yours
        
    }
}
