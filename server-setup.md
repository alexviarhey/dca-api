1. ## Connect to server:

    **ssh root@<ip>**

2. ## Create new user:

    **adduser <username>**

3. ## Giving a user administrative privileges:

    **usermod -aG sudo <username>**

4. ## Copy public key to new user:

    **rsync --archive --chown=<username>:<username> ~/.ssh /home/<username>**


5. ## Testing login with new user:

    **ssh <username>@<ip>**

6. ## Deactivating root login:

    ### open ssh config:

        **sudo nano /etc/ssh/sshd_config**.

    ### edit file:

        *PermitRootLogin     no*
        *PasswordAuthentication no*

    ### save changes:

        *CTRL+X, Y, ENTER*

    ### restart ssh:

        **sudo systemctl restart sshd**
7. ## Basic firewall setup

    ### check packages list:

        **sudo ufw app list**
    ### allow openSSH

        **sudo ufw allow OpenSSH**

    ### enable firewall

        **sudo ufw enable**

    ### checking firewall status

        **sudo ufw status**

8. ## Install Packages

    **sudo apt-get update**
    ### Nvim:

        **sudo apt install neovim**

    ### Docker:

        remove old docker if exists:

            **for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done**

        set up Docker's Apt repository:

            ### Add Docker's official GPG key:

            sudo apt-get install ca-certificates curl gnupg
            sudo install -m 0755 -d /etc/apt/keyrings
            curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
            sudo chmod a+r /etc/apt/keyrings/docker.gpg

            ### Add the repository to Apt sources:

            echo \
              "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
              "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
              sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

            sudo apt-get update

            ### Install the Docker packages.

            **sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin**
            **sudo docker run hello-world**

    ### Install git
        check if git exists **git --version:
            **sudo apt-get update**
            **sudo apt-get install git**
        check if git installed
            **git --version**
