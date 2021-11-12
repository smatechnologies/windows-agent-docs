# File Transfer

The MSLSAM includes components that support the SMA File Transfer feature. Both MSJORS.exe and the SMAFTAgent.exe components play a role in the file transfer process. Supported SMA File Transfer features include:

- Start the file transfer from either the Source or Destination
- Start the file transfer from either the Source or Destination
- Use wild card characters to transfer multiple files at the same time
- Binary and ASCII file support
- All Append and Overwrite options
- Compression and Encryption
- Maximum Transfer Rate enforcement
- Delete the Source File after a successful transfer

## Configure File Transfer Settings for the MSLSAM

The following describes how to enable file transfer for the MSLSAM.

1. Configure the **JORSSocket** parameter in the JORS Settings section of the MSLSAM.ini file (for information, refer to [JORS settings](../administration/configuration#jors-settings)).
2. Configure the **SmaftServerSocket** parameter in the SMAFT Settings section of the MSLSAM.ini file (for information, refer to [SMAFT settings](../administration/configuration#smaft-settings)).
3. Make sure the **SMA Windows LSAM**, and **SMA Microsoft JORS** services are running. For more information, refer to [Start the LSAM](../administration/manage-lsam#start-the-lsam).
4. In the Enterprise Manager, configure the settings for the machine to match the MSLSAM.ini file.
   - For procedures, refer to [Configuring Advanced Machine Parameters and Properties](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Configuring-Advanced-Machine-Properties) in the **Enterprise Manager** online help.
   - For details on the settings to change, refer to the [Advanced Machine Configuration](https://help.smatechnologies.com/opcon/core/objects/machines#advanced-machine-configuration) section in the **Concepts** online help:
     - **JORS Port Number** under the [Communication Settings](https://help.smatechnologies.com/opcon/core/objects/machines#communication-settings).
     - All settings under the [File Transfer Settings](https://help.smatechnologies.com/opcon/core/objects/machines#file-transfer-settings).
