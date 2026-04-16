---
sidebar_label: "Embedded scripts"
title: Embedded scripts
description: "Run scripts stored centrally in OpCon using the Windows Agent Embedded Script job action."
tags:
  - Conceptual
  - Automation Engineer
  - Agents
  - Jobs
---

# Embedded scripts

**Theme:** Overview  
**Who Is It For?** Automation Engineer

## What is it?

The Windows Agent includes components that support the Embedded Script job action. This feature allows the agent to run scripts stored centrally in OpCon. At runtime, the agent runs the scripts based on the runner definition sent with the script. Each runner is defined with a command template that tells the agent how to run the script. The template uses the following basic construct: path to executable + `$FILE` + `$ARGUMENTS`.

- The path to the executable tells the agent where to locate the program that runs the script.
- `$FILE` is a placeholder that tells the agent where to put the filename on the command line. The agent automatically generates a filename for a script when it receives the job from OpCon.
- `$ARGUMENTS` is a placeholder that tells the agent where to place the arguments when constructing the command to send to the operating system.

* Store scripts centrally in OpCon and deploy them to any agent without copying files manually
* Update a script in OpCon once and have the change take effect on all agents immediately
* Use runner definitions to support multiple scripting languages on the same agent

## When to use

- When the same script needs to run on multiple agent machines without managing separate copies of the file on each machine.
- When you want version-controlled scripts that can be updated centrally in OpCon and deployed to all agents immediately.

## Benefits

- Centralizes script management, reducing the effort of distributing and maintaining script files across multiple agent machines.
- Ensures all agents run the same version of a script at any given time, eliminating version drift between environments.

## FAQs

**Does the script file need to exist on the agent machine before the job runs?**  
No. OpCon sends the script to the agent at runtime. The agent generates a temporary file for the script; the script does not need to be pre-deployed to the agent machine.

**Can I use different scripting languages on the same agent?**  
Yes. Define a separate runner for each scripting language, pointing to the appropriate interpreter. Multiple runners can coexist on the same agent, and each job specifies which runner to use.

## Glossary

**Runner** — A definition in OpCon that tells the agent how to run a script, including the interpreter path and a command template.

**$FILE** — A placeholder in a runner command template that the agent replaces with the generated script filename at runtime.

**$ARGUMENTS** — A placeholder in a runner command template that the agent replaces with the job's arguments at runtime.

For information on creating Embedded Script jobs, refer to [Defining Job Action: Embedded Script Job Details](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Job-Type-Management/#defining-job-action-embedded-script-job-details-1) in the **Enterprise Manager** online help.
