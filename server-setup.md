1. ## Connect to server:

    **ssh root@<ip>**

2. ## Create new user:

    **adduser <username>**

3. ## Giving a user administrative privileges:

    **usermod -aG sudo <username>**

4. ## Copy ssh on remote server:

    **8ssh-copy-id <username>@<ip>**

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
