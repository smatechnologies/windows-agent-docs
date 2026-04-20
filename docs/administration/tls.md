---
sidebar_label: "TLS security"
title: TLS security
description: "Configure TLS security for encrypted communication between the Windows Agent and the OpCon server."
tags:
  - Procedural
  - System Administrator
  - Agents
  - System Configuration
---

# TLS security

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

The Windows Agent supports TLS 1.2 for encrypted communication with the OpCon server. A digital certificate must be installed on the agent machine and the certificate serial number must be configured in MSLSAM.ini before TLS can be enabled.

* Install a certificate from a trusted Certificate Authority or use a self-signed certificate
* Configure the TLS certificate serial number in MSLSAM.ini to identify the certificate the agent uses
* Enable TLS in Advanced Machine Settings in OpCon to match the agent configuration

## When to use

- When your organization's security policy or compliance requirements mandate encrypted communication between the agent and the OpCon server.
- When deploying the agent in a network environment where traffic between the agent machine and the OpCon server could be intercepted.

## Benefits

- Encrypts job scheduling data and status messages in transit, preventing unauthorized interception.
- Supports optional client certificate validation, ensuring only trusted agents and server components can establish connections.

## Certificate requirements

The Windows Agent supports TLS 1.2 for communication between itself and the OpCon server. The agent and the OpCon server exchange TLS security information before allowing a data communication connection. If there is a problem establishing identity, communication fails immediately.

To make this possible, a digital certificate must be assigned to the agent. This certificate must be installed in the certificate store of the local Windows machine.

SMANetCom also needs a certificate that matches the agent certificate. For self-signed digital certificates, the certificate itself is required. The certificate must be installed in the standard certificate store for the local Windows machine. Refer to Microsoft documentation for instructions about installing certificates in the Windows certificate store.

For certificates issued by a CA (Certificate Authority), only the root CA certificate is required on the server.

If TLS client validation will be used, the same procedure must also be performed in reverse for a digital certificate assigned to the OpCon server's SMANetCom program. The matching certificate or the root certificate must be stored in the certificate store of the local Windows machine where the agent is installed.

Refer to [Communication Settings](https://help.smatechnologies.com/opcon/core/objects/machines#communication-settings) in the **Concepts** online help for general TLS security information.

## Configure TLS

This section describes how to configure OpCon to use TLS for communication between the agent and SMANetCom.

### Requirements

- `.pfx` certificate
- Administrator privileges on the agent machine

### Install a certificate from a trusted Certificate Authority

To configure TLS using a certificate from a trusted Certificate Authority, complete the following steps:

1. Import the certificate to the trusted root certificate store as a machine certificate on any agent servers to be encrypted with TLS.
2. Set `UseSecureSocket` to `True` and enter the `TLSCertificateSerial` number. The certificate serial number can be found in the **Properties** of the installed certificate.
3. Restart the **SMA OpCon Agent for Microsoft** and **SMA OpCon JORS for Microsoft** services in Windows.
4. Select the machine to configure from the **Select Machine** list.
5. Select **Open Advanced Settings Panel** under **Advanced Settings**.
6. Select **Use TLS for Scheduling Communications**.
7. Change the value to **True** in the frame at the bottom of the window.
8. Select **Update**.
9. Select **Save**.
10. Install the root certificate for the CA (Certificate Authority) under Trusted Root Certificates on the SAM machine. TLS is configured for the agent.

If the `.pfx` certificate does not have the Fully Qualified Domain Name of the server using TLS communication, set the **TLS Certificate Distinguished Name** parameter in the Advanced Machine Settings under the **Communication Settings** tab to match the machine name on the certificate.

For self-signed certificates, follow steps 1–9 above. Additionally, import the certificate to the trusted root certificate store as a machine certificate on the SAM machine.

## Configuration options

The following MSLSAM.ini settings control TLS behavior. For complete setting descriptions, refer to [MSLSAM.ini configuration file](../administration/configuration).

| Setting | What It Does | Default | Notes |
|---|---|---|---|
| `UseSecureSocket` | Enables or disables TLS for communication between the agent and OpCon. | `FALSE` | Requires service restart. |
| `TLSCertificateSerial` | Serial number of the certificate installed on the agent machine, used to identify the agent to SMANetCom. Found in Windows certificate store Properties. | Blank | Requires service restart. Must be set if `UseSecureSocket` is `TRUE`. |
| `TLSClientValidation` | When `TRUE`, the agent validates the certificate presented by SMANetCom as TLS client. Requires the OpCon server certificate to be installed on the agent machine. | `FALSE` | Requires service restart. |
| `TLSCheckCertificateRevocation` | When `TRUE`, the connection fails if any certificate in the chain appears on the local certificate revocation list. | `FALSE` | Requires service restart. |

## Exception handling

**Agent cannot communicate with OpCon after TLS is enabled** — The digital certificate is not installed in the local machine certificate store on the agent machine, or `TLSCertificateSerial` in MSLSAM.ini does not match the serial number of the installed certificate. Install the certificate in the local machine certificate store, open the certificate Properties to find its serial number, set `TLSCertificateSerial` to that value, then restart the agent service.

**TLS connection fails with client validation enabled** — `TLSClientValidation` is set to `TRUE` but the OpCon server's certificate is not installed on the agent machine. Install a copy of the OpCon server's certificate — or the root CA certificate for CA-issued certificates — in the local machine certificate store on the agent machine, then restart the service.

**TLS connection fails when certificate revocation checking is enabled** — `TLSCheckCertificateRevocation` is set to `TRUE` and a certificate in the chain appears on the local revocation list. Verify the certificate has not been revoked. If revocation checking is not required, set `TLSCheckCertificateRevocation` to `FALSE` and restart the service.

**Certificate is valid but TLS connection still fails** — The Fully Qualified Domain Name on the certificate does not match the server name. Set the **TLS Certificate Distinguished Name** parameter in Advanced Machine Settings under Communication Settings to match the machine name on the certificate.

## FAQs

**Does TLS need to be configured on both the agent machine and the SAM machine?**  
Yes. A certificate must be installed on the agent machine, and a matching certificate (or the root CA certificate for CA-issued certificates) must be installed on the SAM machine. For self-signed certificates, the full certificate is required on both machines.

**Where do I find the certificate serial number for the TLSCertificateSerial setting?**  
Open the Properties of the installed certificate in the Windows certificate store on the agent machine. The serial number appears on the Details tab of the certificate.

**What is the difference between configuring a CA-issued certificate versus a self-signed certificate?**  
For CA-issued certificates, only the root CA certificate needs to be installed on the SAM machine under Trusted Root Certificates. For self-signed certificates, the certificate itself must be imported to the trusted root certificate store as a machine certificate on the SAM machine.

## Glossary

**TLS (Transport Layer Security)** — A cryptographic protocol that encrypts communication between two systems. The Windows Agent uses TLS 1.2 to secure communication with the OpCon server.

**TLSCertificateSerial** — The MSLSAM.ini setting that identifies the certificate the agent uses for TLS communication. Its value is the serial number of the certificate installed in the Windows certificate store on the agent machine.

**SMANetCom** — The OpCon server-side service that manages communication with all connected agents, including TLS negotiation and message exchange.

:::info

- Adding certificates to the Trusted Root Certification Authorities store for a local computer: [https://technet.microsoft.com/en-us/library/cc754841(v=ws.11).aspx](https://technet.microsoft.com/en-us/library/cc754841(v=ws.11).aspx)
- Importing a private-key certificate (.pfx) using a Certificate Import Wizard: [https://msdn.microsoft.com/en-us/library/bb950259(v=bts.10).aspx](https://msdn.microsoft.com/en-us/library/bb950259(v=bts.10).aspx)

:::
