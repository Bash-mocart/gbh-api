# GBH - Demo API

# gbh-api

## Stacks 
    * AWS
    * Jenkins
    * Ansible
    * Npm
    * Nodejs 16.13.1


## Goal
The goal of this project is to automate the deployment of `demo-api` into EC2 instance. I used Jenkins to install the dependencies and build the artifacts which then ansible to configure the servers and deploy the application. 

![CI/CD Chart](./images/ci-cd.png?raw=true "ci-cd") 

Ansible runs only after the PR is merged. This was achieved using a Generic Webhook Trigger https://plugins.jenkins.io/generic-webhook-trigger/. I had to parse the contents of the webhook PR payload and extract values that shows a PR is merged. Using those values, I set a when condition for my ansible stage



```
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
```

Builds are discarded after one day using a Build Discarder jenkins plugin https://plugins.jenkins.io/build-discarder/

```
pipeline {
    agent any
    options {
    buildDiscarder(logRotator(artifactDaysToKeepStr: '1'))
  }

```

## Steps to reproduce
* Create an EC2 Ubuntu Instance https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html

* Install Jenkins, Npm, and Nodejs v16.13.1 in the instance you just created https://nodejs.org/en/download/package-manager/, https://www.jenkins.io/doc/book/installing/linux/

* Install Generic Webhook Trigger and Build Discarder jenkins plugin

* Create a jenkins pipeline and set it up as follows

    * Create a parameter like the below, it should have a default value of your target ec2 instance ip 

    ![Jenkins 1](./images/jen-1.jpg?raw=true "jenkins") 

    * Make sure the Generic Webhook Trigger is installed, and then use the below image as guide to configure it to parse the contents of the webhook payload. We will use that as condition for our ansible 

    ![Jenkins 2](./images/jen-2.jpg?raw=true "jenkins") 
    ![Jenkins 3](./images/jen-3.jpg?raw=true "jenkins") 
    ![Jenkins 4](./images/jen-4.jpg?raw=true "jenkins") 
    in the below image, the token should be any random string
    ![Jenkins 5](./images/jen-5.jpg?raw=true "jenkins") 

    * Here you just set up the github repo with your credentials. This lets jenkins clones the repo from github. See here for hot to create github credentials on jenkins https://www.jenkins.io/doc/book/using/using-credentials/. 

    Keep in mind that your password should be yout github auth token. You can see this guide on how to create github access token https://www.jenkins.io/doc/book/using/using-credentials/

    ![Jenkins 6](./images/jen-6.jpg?raw=true "jenkins") 

* To test it, on the dashboard, click on the project and click on Build with parameters, and click on build.

    ![Jenkins 7](./images/jen-7.jpg?raw=true "jenkins") 






