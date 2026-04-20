---
sidebar_label: "File Transfer"
title: File Transfer
description: "Configure and use SMA File Transfer to move files between Windows machines and other platforms."
tags:
  - Procedural
  - System Administrator
  - Agents
  - System Configuration
---

# File Transfer

**Theme:** Overview  
**Who Is It For?** System Administrator

## What is it?

The Windows Agent includes components that support the SMA File Transfer feature. Both `MSJORS.exe` and `SMAFTAgent.exe` play a role in the file transfer process. Supported SMA File Transfer features include:

- Start the file transfer from either the source or destination
- Use wildcard characters to transfer multiple files at the same time
- Binary and ASCII file support
- All append and overwrite options
- Compression and encryption
- Maximum transfer rate enforcement
- Delete the source file after a successful transfer

## When to use

- When files need to be moved between OpCon-managed machines as part of an automated job workflow.
- When multi-file transfers, compression, encryption, or automatic source deletion are required without building a separate file transfer solution.

## Benefits

- File transfers run as part of the OpCon-managed schedule, eliminating separate file transfer tools or manual steps in automated workflows.
- Source files can be automatically deleted after a successful transfer, reducing post-transfer cleanup overhead.

## Configure file transfer settings

To enable file transfer for the Windows Agent, complete the following steps:

1. Configure the `JORSSocket` parameter in the JORS Settings section of the MSLSAM.ini file. For more information, refer to [JORS settings](../administration/configuration#jors-settings).
2. Configure the `SmaftServerSocket` parameter in the SMAFT Settings section of the MSLSAM.ini file. For more information, refer to [SMAFT settings](../administration/configuration#smaft-settings).
3. Confirm that the **SMA OpCon Agent for Microsoft** and **SMA OpCon JORS for Microsoft** services are running. For more information, refer to [Start the agent](../administration/manage-lsam#start-the-agent).
4. In Enterprise Manager, configure the settings for the machine to match the MSLSAM.ini file.
   - For procedures, refer to [Configuring Advanced Machine Parameters and Properties](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Configuring-Advanced-Machine-Properties) in the **Enterprise Manager** online help.
   - For details on the settings to change, refer to the [Advanced Machine Configuration](https://help.smatechnologies.com/opcon/core/objects/machines#advanced-machine-configuration) section in the **Concepts** online help:
     - **JORS Port Number** under [Communication Settings](https://help.smatechnologies.com/opcon/core/objects/machines#communication-settings)
     - All settings under [File Transfer Settings](https://help.smatechnologies.com/opcon/core/objects/machines#file-transfer-settings)

File transfer is enabled and ready to use when the services are running and the machine settings match the MSLSAM.ini configuration.

## Configuration options

The following MSLSAM.ini settings configure SMA File Transfer. For complete setting descriptions, refer to [MSLSAM.ini configuration file](../administration/configuration).

| Setting | What It Does | Default | Notes |
|---|---|---|---|
| `JORSSocket` | Port for JORS communication, including file transfer requests. Must match the JORS Port Number in OpCon Advanced Machine Settings. | `3110` | Requires service restart. |
| `SmaftServerSocket` | Port for non-TLS SMA File Transfer communication. Must match the non-TLS File Transfer Port Number in OpCon Advanced Machine Settings. A value of `0` disables non-TLS transfers. | `3110` | Requires service restart. |
| `TlsSmaftServerSocket` | Port for TLS SMA File Transfer communication. Must match the TLS File Transfer Port Number in OpCon Advanced Machine Settings. A value of `0` disables TLS transfers. | `0` | Requires service restart. |

## Exception handling

**File transfer jobs fail to start or remain in a waiting state** — One or both required services are not running. Confirm that both the SMA OpCon Agent for Microsoft and SMA OpCon JORS for Microsoft services are running. File transfer requires both services to be active simultaneously.

**File transfer jobs fail with a connection error** — The port numbers in MSLSAM.ini do not match the values in OpCon Advanced Machine Settings. Verify that `SmaftServerSocket` matches the non-TLS File Transfer Port Number and that `JORSSocket` matches the JORS Port Number in OpCon. Restart the services after correcting any mismatch.

**TLS file transfers fail** — The firewall on the Windows machine is blocking the port configured in `TlsSmaftServerSocket`. Ensure the configured TLS file transfer port is open for inbound and outbound traffic on any firewall between the agent machine and the OpCon server.

## FAQs

**Do both MSJORS and SMAFTAgent need to be running for file transfer to work?**  
Yes. Both the SMA OpCon Agent for Microsoft and SMA OpCon JORS for Microsoft services must be running to support SMA File Transfer.

**Must the port numbers in MSLSAM.ini match the values configured in OpCon?**  
Yes. The `JORSSocket` value must match the JORS Port Number, and the `SmaftServerSocket` value must match the File Transfer Port Number configured in Advanced Machine Settings in OpCon. A mismatch will prevent file transfer jobs from functioning.

**Can a file transfer be initiated from either the source or the destination machine?**  
Yes. Starting the transfer from either the source machine or the destination machine is a supported SMA File Transfer feature.

## Glossary

**SMAFT (SMA File Transfer)** — The SMA Technologies protocol used to transfer files between OpCon-managed machines as part of a scheduled workflow.

**SMAFTAgent** — The Windows service component (`SMAFTAgent.exe`) on the agent machine that handles SMA File Transfer operations.
