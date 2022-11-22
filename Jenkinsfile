pipeline {
    agent any

    stages {
        stage('Install Web Api') {
            steps {
    
                  sh 'npm install'
                
            }
        }


        stage('Archive Web Api'){
            steps {
          
                sh 'tar -czvf demo-api-main.gz demo-api-main'
                
            }
        }


        stage('Copy artifacts Web Api'){
            steps {
          
                sh 'cp demo-api-main.gz ansible/roles/deploy-web-api/files'
                
            }
        }

        stage (' Configure server ') {
              when {
                  expression { return params.current_status == "closed" && params.merged == true }
              }
            steps {
               ansiblePlaybook become: true, credentialsId: '22a3984f-4c4e-4139-b1cf-ab1cf7753ddd', disableHostKeyChecking: true, installation: 'ansible-playbook', inventory: 'ansible/inventory.txt', playbook: 'ansible/configure-server.yml', sudoUser: null
            }

        }

        stage (' Deploy app ') {
              when {
                  expression { return params.current_status == "closed" && params.merged == true }
              }
            steps {
               ansiblePlaybook become: true, credentialsId: '22a3984f-4c4e-4139-b1cf-ab1cf7753ddd', disableHostKeyChecking: true, installation: 'ansible-playbook', inventory: 'ansible/inventory.txt', playbook: 'ansible/deploy-app.yml', sudoUser: null
            }

        }
        
    }
}
