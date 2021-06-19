# TLS security

The Windows LSAM supports TLS 1.2 for communication between itself and the OpCon server. The LSAM and the OpCon server exchange TLS Security information before allowing a data communication connection. If there is a problem in establishing identity, communication fails immediately.

To make this possible, a digital certificate must be assigned to the LSAM. This certificate must be installed in the certificate store of the local Windows machine.

To make this possible, SMANetCom needs to have a certificate that matches the LSAM certificate. For self-signed digital certificates, the certificate itself is required. The certificate must be installed in the standard certificate store for the local Windows machine. Please refer to Microsoft documentation for instructions about installing certificates in the Windows certificate store.

For certificates issues by a CA (Certificate Authority), only the root CA certificate is required on the server.

If TLS client validation will be used, the same procedure must also be performed in reverse for a digital certificate that is assigned to the OpCon server's SMANetCom program. The matching certificate or the root certificate must be stored as documented for the LSAM's host platform, that is, in the certificate store of the local Windows machine where the LSAM is installed.

Please refer to Microsoft documentation for instructions about installing certificates in the Windows certificate store.

Refer to [Communication Settings](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/Machines.htm#Communic) in the **Concepts** online help for general TLS security information.

## Configuring TLS

This sections describes how to configure OpCon to use TLS for communication between the agent and SMANetCom.

### Requirements

- .pfx certificate
- Administrator privileges on the agent machine

### Install a certificate from a Trusted Certificate Authority

1. Import the certificate to the trusted root certificate store as a machine certificate on any agent servers to be encrypted with TLS.
2. Set **UseSecureSocket** to *True* and enter the **TLSCertificateSerial** number. The certificate serial number can be found in the Properties of the installed certificate.
3. Restart the **SMA OpCon Agent for Microsoft** and **SMA OpCon JORS for Microsoft** Services in Windows.
4. Select the machine to talk over TLS from the drop-down menu under **Select Machine**.
5. Click **Open Advanced Settings Panel** under **Advanced Settings**.
6. Select **Use TLS for Scheduling Communications**.
7. Change the value to **True** in the frame at the bottom of the window.
8. Click **Update**.
9. Click **Save**.
10. Install the root certificate for the CA (Certificate Authority) under Trusted Root Certificates on the SAM Machine.

If the .pfx certificate does not have the Fully Qualified Domain Name of the server using TLS communication, then you must set the TLS Certificate Distinguished Name parameter in the Advanced Machine Settings, under the Communication Settings tab, to match the machine name on the certificate.

For self-signed certificates, follow steps 1-9 for how to [Install a certificate from a Trusted Certificate Authority](#install-a-certificate-from-a-trusted-certificate-authority). Additionally, import the certificate to the trusted root certificate store as a machine certificate on the SAM machine.

:::info

- Adding certificates to the Trusted Root Certification Authorities store for a local computer: [https://technet.microsoft.com/en-us/library/cc754841(v=ws.11).aspx](https://technet.microsoft.com/en-us/library/cc754841(v=ws.11).aspx)
- Importing a private-key certificate (.pfx) using a Certificate Import Wizard: [https://msdn.microsoft.com/en-us/library/bb950259(v=bts.10).aspx](https://msdn.microsoft.com/en-us/library/bb950259(v=bts.10).aspx)

:::
