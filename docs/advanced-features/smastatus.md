---
sidebar_label: "SMAStatus"
---

# SMAStatus command

The SMAStatus command sends a user-defined message to the Enterprise Manager. The message follows the status message in EM Operation. When inserted into a script, the command is useful for sending a message to report the script's progress in the Enterprise Manager (e.g., "DB Backup Completed").

## Syntax

```bat
SMAStatus "<message>"
```

- **SMAStatus**: The name of the command.
- **<message\>**: The message to display in the graphical interfaces.
  - The message's maximum is 20 characters.
  - The message must be enclosed in double quotes ("").
