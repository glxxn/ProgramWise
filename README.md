# ProgramWise - Cloud Server Project Documentation

**Name:** Gleon Dsouza  
**Student ID:** 35862344  
**Unit Code:** ICT171

**Public IP:** http://13.63.53.205/  
**Domain:** https://www.programwise.online  

**Contact Email (for SSL):** gleondsouzahere@gmail.com  
**Video Explainer (available only to Murdoch members):**  [35862344_Project_Video_Explainer.mp4](https://murdochuniversity-my.sharepoint.com/:v:/g/personal/35862344_student_murdoch_edu_au/IQBHM9Aej48VS4uQQmevkpXBAdyTg99Kzxim1UVrdDrDW4Q?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=0JNFh8)
**TCO Presentation (IaaS vs SaaS):**  [35862344_Gleon_TCO_Presentation.pptx](https://murdochuniversity-my.sharepoint.com/:p:/g/personal/35862344_student_murdoch_edu_au/IQAnXbwrqQN_Tq8gfhshOmmwATO3PVSVZZKFrnh12E_rK7M?e=TaLQm6)

---

## About Project

ProgramWise is an engaging educational platform that lets you learn Python features and syntax, explains code, shows examples, and even provides a web-based Python interpreter. It features a sleek, modern look that prioritises the user's experience. Future implementation will include adding an account-based system, with progress bars and a CTF-style learning.  

ProgramWise is released under the `MIT license (© 2026 Gleon Dsouza)`. It is the most suitable for educational projects such as this, as it is simple to use and universally accepted. It makes this software open source and encourages users to discover, learn, and collaborate.  

This project demonstrates the deployment of a website using **AWS EC2**, **IIS Web Server**, custom HTML/CSS/JavaScript code, a custom domain, and Let's Encrypt SSL/HTTPS.

---

# Cloud Server Setup Walkthrough

## 1. Build the Website

The project is built using HTML, CSS and JavaScript. The code runner is created using JavaScript using the `Pyodide` and `CodeMirror` codebases.  

Code snippet (HTML & CSS):  

<img width="555" height="503" alt="image" src="https://github.com/user-attachments/assets/8239f12c-7e35-46ef-b96d-9926da443ebf" />

Script code snippet (JavaScript):  

<img width="426" height="490" alt="image" src="https://github.com/user-attachments/assets/8219965a-7476-412c-bdcb-1dcc725db574" />

### Time Taken: ~2-3 weeks

---

## 2. Setup AWS

_Step 1:_ Create an AWS account (if you don't have one already)  
_Step 2:_ Search `EC2` and launch a new instance  
_Step 3:_ Select `Microsoft Windows Server 2019 Base` as AMI  
_Step 4:_ Create a new key pair and download the .pem file  
_Step 5:_ Create a security group and check **RDP**, **HTTPS**, and **HTTP traffic**  

<img width="934" height="476" alt="Screenshot 2026-07-25 165938" src="https://github.com/user-attachments/assets/4c586b14-da15-428b-ab85-6e6e6808ae61" />  

EC2 Instances Overview:  

<img width="922" height="470" alt="Screenshot 2026-07-25 170554" src="https://github.com/user-attachments/assets/54cb392b-5893-44b7-a2c6-5080b977a9f7" />

_Step 6:_ Click `Connect` > `RDP` > `Get Windows Password`  

### Time Taken: ~5-10 mins

---

## 3. Connect to VM / Setup Server

Open **Remote Desktop Connection _(Windows)_** or **Remmina _(Linux)_** to connect to the VM. Enter details as below, and connect:  

<img width="683" height="457" alt="Screenshot 2026-07-25 171157" src="https://github.com/user-attachments/assets/4bd38bc4-ba41-4574-a2c7-f06cf6eac293" />

From the VM's start menu, select `Server Manager` (there should be a tile)  
Select `Add roles and features` (see below)  

<img width="957" height="493" alt="Screenshot 2026-07-25 171453" src="https://github.com/user-attachments/assets/5e223aca-7d6b-4690-826e-35aca1c9697b" />

Keep clicking on Next until the `Server Roles` section is active (see below), and select `Web Server (IIS)`  

<img width="957" height="508" alt="Screenshot 2026-07-25 171529" src="https://github.com/user-attachments/assets/34f4b2d3-8140-46ed-89fc-fbd915c48452" />

Keep clicking Next, then Install and wait until installation is complete.  
Navigate to `C:\inetpub\wwwroot\`, delete the existing files, and paste the HTML, CSS and JavaScript files of your website.  
Verify that the basic website (HTTP and IP) is working:  

<img width="959" height="562" alt="image" src="https://github.com/user-attachments/assets/d2f9f97b-75b3-4243-91eb-732cd5314285" />

### Time Taken: ~5-15 mins

---

## 4. Create a Domain

Buy a domain from Hostinger or a hosting website. I have purchased `programwise.online`. Then verify email and contact details.  

<img width="902" height="418" alt="Screenshot 2026-07-25 164657" src="https://github.com/user-attachments/assets/b59c1330-9e76-4ba5-a603-9cb6b6d20774" />

From the hosting website's management panel, select `DNS / Nameservers`  
Add a new `A` record or edit the existing one with the following details:  

<img width="942" height="416" alt="Screenshot 2026-07-25 172214" src="https://github.com/user-attachments/assets/23404f6e-a4f7-4e7d-8c13-65a7cbae6f52" />

### Time Taken: ~5-10 mins

---

## 5. Set up SSL / HTTPS

This is the most confusing / time taking phase, so ensure that all details are correct and steps are followed. The SSL certificate is provided by `Let's Encrypt` using the `ACMEv2` client, which also auto-renews the certificate.  

_Step 1:_ On your local machine, download the latest version of `win-acme` from https://www.win-acme.com/  
_Step 2:_ Copy the .zip file, and paste it on the VM's Desktop (simple Ctrl+C & Ctrl+V)  
_Step 3:_ Extract the .zip file to `C:/win-acme` (see below)  

<img width="941" height="531" alt="Screenshot 2026-07-25 174425" src="https://github.com/user-attachments/assets/e0189f63-9120-449f-af3e-a75a7d4907f3" />

_Step 4:_ From the VM's start menu, search `IIS` and open the app that is shown.  
_Step 5:_ Click on the computer's name (below `Start Page`), and open `Server Certificates`  

<img width="802" height="450" alt="Screenshot 2026-07-25 174856" src="https://github.com/user-attachments/assets/53f188d2-d887-4cbb-b03c-3587b1a255f5" />

_Step 6:_ From the `Actions` panel, select `Create Self-Signed Certificate...` and enter a name.  

<img width="779" height="452" alt="Screenshot 2026-07-25 175027" src="https://github.com/user-attachments/assets/260708d0-6c7c-4c34-8a47-623a04283724" />

_Step 7:_ After creating a self-signed certificate, navigate to the `Default Web Site` section, then select `Bindings...` from the `Actions` panel  

<img width="801" height="473" alt="Screenshot 2026-07-25 173441" src="https://github.com/user-attachments/assets/6f1997d8-58cc-4c04-a3d9-ef10ff0dc502" />

_Step 8:_ Select Add, then enter and select the following (see below), then select OK  

<img width="755" height="448" alt="Screenshot 2026-07-25 175159" src="https://github.com/user-attachments/assets/4fc91108-bd74-42e6-b6e0-d45503037a80" />

_Step 9:_ Go to `C:\win-acme\` and run `wacs` and enter everything in the following order: `N` > `<enter key>` > `A` > `y` > `y` > `y` > `<enter your email>`. If at any point it shows an error, ensure that the previous steps have been followed.  

<img width="749" height="469" alt="Screenshot 2026-07-25 175301" src="https://github.com/user-attachments/assets/2039c6e4-9150-4e94-b9f3-62353c9f76c3" />
<img width="743" height="462" alt="Screenshot 2026-07-25 175458" src="https://github.com/user-attachments/assets/66091ae7-01d3-4112-80a3-72fb82e83f1f" />

The SSL Certificate and HTTPS should now be enabled.  

### Time Taken: ~15-30 minutes

---

## 6. Verification & Conclusion

Verify if an HTTPS connection works.  
Check the SSL certificate by clicking the lock icon next to the URL > Connection details > Certificate is valid / show certificate:  

<img width="959" height="563" alt="image" src="https://github.com/user-attachments/assets/9bb16fd5-5f72-44e4-af0a-4ce6c8143835" />

In conclusion, doing this project taught me and made me better at:  
- Building a website from scratch (using HTML, CSS and JavaScript)
- Setting up an AWS instance and an IIS server
- Configuring DNS and setting up an SSL certificate
- Improving my problem-solving and critical thinking skills

### Thank You!
