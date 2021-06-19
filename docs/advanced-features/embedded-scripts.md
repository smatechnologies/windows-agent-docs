# Embedded scripts

The MSLSAM includes components that support the Embedded Script job action. This feature permits the MSLSAM to execute scripts that are centrally stored in OpCon. At runtime, the MSLSAM executes the scripts based on the runner definition sent with the script. Each runner is defined with a command template that relays to the MSLSAM how to execute the script. This is made possible through the basic construct of the template itself: path to executable + $FILE + $ARGUMENTS.

- The path to the executable tells the MSLSAM where to locate the program that runs the script.
- $FILE serves as a placeholder that tells the MSLSAM where to put that filename on the command line.
  - The MSLSAM automatically generates a filename for a script when it receives the job from OpCon.
- $ARGUMENTS placeholder tells the MSLSAM where to place the arguments when constructing the command to send to the operating system.

For information on creating Embedded Script jobs in the Enterprise Manager, refer to [Defining Job Action: Embedded Script Job Details](https://help.smatechnologies.com/opcon/core/latest/Files/UI/Enterprise%20Manager/Job%20Type%20Management.htm#Defining_Job_Action:_Command_Script_Job_Details) in the **Enterprise Manager** online help.
