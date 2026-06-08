---
sidebar_label: 'Silent mode'
title: Silent mode installation
description: "Install the Windows Agent in silent mode using command-line parameters without a graphical installer."
tags:
  - Reference
  - System Administrator
  - Agents
  - Installation
---

# Silent mode installation

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

Silent mode installation allows the Windows Agent to be installed without a graphical user interface, supplying all configuration values through command-line parameters. This method is used for scripted or automated deployments where presenting a graphical installer is not practical or permitted.

* Automate agent installation across multiple machines without user interaction
* Integrate agent installation into deployment pipelines and provisioning scripts

## When to use

- When deploying the Windows Agent to multiple machines as part of a scripted provisioning workflow.
- When the target machine has no interactive desktop session available during setup, such as during server builds or automated infrastructure provisioning.
- When standardizing installation parameters across environments to ensure consistent configuration.

## Benefits

- Eliminates manual steps during deployment, reducing configuration errors that can occur when responding to installer prompts interactively.
- Enables repeatable, version-controlled agent deployments when silent installation parameters are stored alongside infrastructure configuration.

## How to run a silent installation

To learn how to install the Windows Agent in silent mode, including the full list of command-line parameters, refer to the [Silent Mode](https://help.smatechnologies.com/opcon/core/installation/components#silent-mode) section in the **OpCon Installation** online help.

## FAQs

**Can I use silent mode to upgrade an existing agent installation?**  
Yes. Use the same silent mode parameters with the upgrade installer to update the agent without a graphical interface. Refer to the [OpCon Installation](https://help.smatechnologies.com/opcon/core/installation/components#silent-mode) online help for parameter details specific to upgrades.

**Does silent mode require the agent service to be stopped first?**  
For upgrades, stop the agent service before running the silent installer to avoid conflicts with files in use. For new installations, no existing service is present, so no pre-step is required.

**Where are the installation logs written during a silent installation?**  
The InstallShield installer writes a log to the system's temp directory by default. You can specify an alternate log file path using a standard InstallShield logging parameter. Refer to the **OpCon Installation** online help for details.
