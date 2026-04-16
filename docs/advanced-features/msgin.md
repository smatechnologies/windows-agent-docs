---
sidebar_label: "MSGIN"
title: MSGIN
description: "Trigger OpCon events from external programs by placing event files in the MSGIN directory on the Windows Agent machine."
tags:
  - Conceptual
  - Automation Engineer
  - Agents
  - Events
---

# MSGIN

**Theme:** Build  
**Who Is It For?** Automation Engineer

## What is it?

MSGIN is the name of the directory the Windows Agent monitors for external events. The location of the MSGIN directory is `<Configuration Directory>\MSLSAM\MSGIN\` on the machine where the agent is installed. Any external program or application can generate and place an ASCII file in this directory. These ASCII files must contain a valid OpCon event, a user login ID, and an event password for OpCon to process the event.

* Submit any valid OpCon event from an external program or script that can write a text file
* Include a user login ID and external event password to authenticate each submission
* Process multiple events in a single file by placing each event on a separate line

## When to use

- When an external system or legacy application needs to trigger OpCon events but cannot use the OpCon REST API or direct database integration.
- When you need to automate event submission from scripts or programs that can write text files to a local or network directory.

## Benefits

- Enables any system that can write a text file to integrate with OpCon without requiring API credentials or custom connectors.
- Provides a simple, technology-agnostic interface that works across diverse platforms and languages.

:::note
The Configuration Directory is based on where you installed your programs. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

The agent watches the MSGIN directory for any text file. The agent reads the file, passes the text to OpCon for processing, and then deletes the file. If OpCon receives an invalid event, OpCon documents the error in the SAM Critical.log file.

## Place a message into the MSGIN directory

To send an event through the MSGIN directory, complete the following steps:

1. Open an ASCII text editor (for example, Notepad) on the Windows machine.
2. Enter the event text. For example:

   ```console
   $JOB:RELEASE,[[$DATE]],ProdSched,ProdJob,BatchUser,EventPassword
   ```

3. Place an OpCon user login ID and an external event password at the end of the event.

   :::note
   This password is not the same as the database password used to log in. For more information, refer to [External Events](https://help.smatechnologies.com/opcon/core/events/defining#external-events) in the **OpCon Events** online help. The user must also have the correct function privileges in OpCon for the command to be processed.
   :::

4. If multiple events are needed, press **Enter** after each event and enter the next event on a new line.

   :::note
   The only allowable tokens in an external event are `$DATE`, `$TIME`, and `$NOW`. These tokens pull values from the current system date and time.
   :::

5. Save the file in the `<Configuration Directory>\MSLSAM\MSGIN\` directory. The agent reads the file, sends the contents to OpCon, and then deletes the file. OpCon checks the user on the event and processes the command. If there are syntax errors, OpCon discards the event and writes "Invalid Event" to the SAM Critical.log file.

## FAQs

**What happens if an event in the file has a syntax error?**  
OpCon discards the event and writes "Invalid Event" to the SAM Critical.log file. The file is still deleted from the MSGIN directory after processing.

## Glossary

**External event** — An OpCon event submitted from outside OpCon itself, authenticated with a user login ID and external event password rather than a session token.

**External event password** — A separate credential configured in OpCon specifically for authenticating externally submitted events. This is distinct from the OpCon UI login password.
