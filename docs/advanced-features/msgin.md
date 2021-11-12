# MSGIN

MSGIN is the name of the directory the MSLSAM monitors for external events. The location of the MSGIN directory is <Configuration Directory\>\\MSLSAM\\MSGIN\\ on the machine where the MSLSAM is installed. Any external program or application can generate and place an ASCII file in this directory. These ASCII files must contain a valid OpCon event(s), User Login ID, and event password for the SAM to process the event(s).

:::note
The Configuration Directory is based on where you installed your programs. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

The MSLSAM watches the MSGIN directory for any text file. The MSLSAM reads the file, passes the text to the SAM for processing, and finally the MSLSAM deletes the file. If the SAM receives an invalid event, the SAM documents the error in the SAM Critical.log file.

## Place a message into the MSGIN directory

The following describes an example of using the MSGIN directory.

1. Open an ASCII text editor (e.g., Notepad) on the Windows machine.
2. Enter the following text:

   ```console
    **\$JOB:RELEASE,\[\[\$DATE\]\],ProdSched,ProdJob,BatchUser,EventPassword**
   ```

3. Place an OpCon User Login ID and an external event password on the end of the event. This password is not the same as the database password used to log in to the Enterprise Manager. For more information, refer to [External Events](https://help.smatechnologies.com/opcon/core/events/defining#external-events) in the **OpCon Events** online help.
4. The user must have the correct function privileges in OpCon for the SAM to perform the command contained in the external event.
5. The only allowable tokens in an external event are $DATE, $TIME, and $NOW. These tokens pull values from the current system date and time.
6. If multiple events are desired, enter a carriage return and enter another event on the next line.
7. **Save** the file in the <Configuration Directory\>**\\MSLSAM\\MSGIN\\** directory.
8. The MSLSAM reads the file, sends the contents to the SAM, and finally deletes the file.
9. The SAM checks the user on the event, and then processes the command contained in the external event. If there are syntactical errors, the SAM discards the event and writes the message "Invalid Event" into the SAM Critical.log file.
