// blocks/js_blocks.js

// Define the js_alert block
Blockly.Blocks['js_alert'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("alert(")
      .appendField(new Blockly.FieldTextInput('Hello Coder!'), 'MESSAGE')
      .appendField(")"); // Close the alert function call

    this.setPreviousStatement(true); // Allow connecting to previous blocks
    this.setNextStatement(true); // Allow connecting to next blocks
    this.setColour('#F85E00'); // Set block color
    this.setTooltip("Show an alert"); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
  }
};

// Generate JavaScript code for the js_alert block
Blockly.JavaScript['js_alert'] = function (block) {
  var message = block.getFieldValue('MESSAGE'); // Get the message input
  var code = 'alert("' + message + '");\n'; // Generate the JavaScript code for the alert
  return code; // Return the code to be included in the generated script
};

// Console log block
Blockly.Blocks['js_console_log'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("console.log(")// Label for the block
      .appendField(new Blockly.FieldTextInput('Hello Coder!'), 'TEXT')// Input 
      .appendField(')');
    // Label to clarify input
    this.setPreviousStatement(true); // Allow connecting to previous blocks
    this.setNextStatement(true); // Allow connecting to next blocks
    this.setColour('#F85E00'); // Set block color
    this.setTooltip("Log a message to the console."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
  }
};

// JavaScript Code Generator for the js_console_log block
Blockly.JavaScript['js_console_log'] = function (block) {
  var text = block.getFieldValue('TEXT') || '""'; // Get the log message input
  var code = 'console.log(' + text + ');\n'; // Generate the JavaScript code
  return code; // Return the generated code
};

// Variable declaration block
Blockly.Blocks['js_variable_declare'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("var") // Label for the block
      .appendField(new Blockly.FieldTextInput("variableName"), "VAR")// Input for variable name
      .appendField(new Blockly.FieldTextInput(''), 'VALUE')// Input for variable value

    this.setPreviousStatement(true); // Allow connecting to previous blocks
    this.setNextStatement(true); // Allow connecting to next blocks
    this.setColour('#F85E00'); // Set block color
    this.setTooltip("Declare a variable."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
  }
};

// JavaScript Code Generator for the js_variable_declare block
Blockly.JavaScript['js_variable_declare'] = function (block) {
  var variable = block.getFieldValue('VAR'); // Get the variable name input
  var value = block.getFieldValue('VALUE') || '0'; // Get the value input
  var code = 'var ' + variable + ' = ' + value + ';\n'; // Generate the JavaScript code
  return code; // Return the generated code
};

// Constant declaration block
Blockly.Blocks['js_const_declare'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("const") // Label for the block
      .appendField(new Blockly.FieldTextInput("constantName"), "CONST")// Input for constant name
      .appendField(new Blockly.FieldTextInput(''), 'VALUE')// Input for constant value

    this.setPreviousStatement(true); // Allow connecting to previous blocks
    this.setNextStatement(true); // Allow connecting to next blocks
    this.setColour('#F85E00'); // Set block color
    this.setTooltip("Declare a constant."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
  }
};

// JavaScript Code Generator for the js_const_declare block
Blockly.JavaScript['js_const_declare'] = function (block) {
  var constant = block.getFieldValue('CONST'); // Get the constant name input
  var value = block.getFieldValue('VALUE') || '0'; // Get the value input
  var code = 'const ' + constant + ' = ' + value + ';\n'; // Generate the JavaScript code
  return code; // Return the generated code
};

// Let declaration block
Blockly.Blocks['js_let_declare'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("let") // Label for the block
      .appendField(new Blockly.FieldTextInput("name"), "LET")// Input for variable name
      .appendField(new Blockly.FieldTextInput(''), 'VALUE')// Input for variable value

    this.setPreviousStatement(true); // Allow connecting to previous blocks
    this.setNextStatement(true); // Allow connecting to next blocks
    this.setColour('#F85E00'); // Set block color
    //this.setTooltip("Declare a constant."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
  }
};

// JavaScript Code Generator for the js_let_declare block
Blockly.JavaScript['js_let_declare'] = function (block) {
  var name = block.getFieldValue('CONST'); // Get the variable name input
  var value = block.getFieldValue('VALUE') || '0'; // Get the value input
  var code = 'let ' + name + ' = ' + value + ';\n'; // Generate the JavaScript code
  return code; // Return the generated code
};

// Arithmetic operations block
Blockly.Blocks['js_arithmetic'] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["*", "*"], ["/", "/"]]), "OPERATOR");
    this.appendValueInput("B").setCheck("Number");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Performs arithmetic operations.");
  }
};

Blockly.JavaScript['js_arithmetic'] = function (block) {
  const operator = block.getFieldValue('OPERATOR');
  const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return [`${a} ${operator} ${b}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// Logical operations block
Blockly.Blocks['js_logical'] = {
  init: function () {
    this.appendValueInput("A").setCheck("Boolean");
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["AND", "&&"], ["OR", "||"]]), "OPERATOR");
    this.appendValueInput("B").setCheck("Boolean");
    this.setOutput(true, "Boolean");
    this.setColour('#F85E00');
    this.setTooltip("Performs logical operations.");
  }
};

Blockly.JavaScript['js_logical'] = function (block) {
  const operator = block.getFieldValue('OPERATOR');
  const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  return [`${a} ${operator} ${b}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// Comparison block
Blockly.Blocks['js_compare'] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["=", "=="], ["!=", "!="], ["<", "<"], [">", ">"], ["<=", "<="], [">=", ">="]]), "OPERATOR");
    this.appendValueInput("B").setCheck("Number");
    this.setOutput(true, "Boolean");
    this.setColour('#F85E00');
    this.setTooltip("Performs comparison operations.");
  }
};

Blockly.JavaScript['js_compare'] = function (block) {
  const operator = block.getFieldValue('OPERATOR');
  const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return [`${a} ${operator} ${b}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// If-Else block
Blockly.Blocks['js_if_else'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("if"); // Label for the if statement
    this.appendValueInput("CONDITION") // Input for the condition
      .setCheck("Boolean"); // Check type is Boolean
    this.appendStatementInput("DO") // Statement input for the if block
      .appendField(""); // Label for the action if condition is true
    this.appendDummyInput()
      .appendField("else"); // Label for the else statement
    this.appendStatementInput("ELSE") // Statement input for the else block
      .appendField(""); // Label for the action if condition is false
    this.setColour('#F85E00'); // Set block color
    this.setTooltip("If-Else condition."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
    this.setPreviousStatement(true); // Allow connection to previous blocks
    this.setNextStatement(true); // Allow connection to next blocks
  }
};

// JavaScript Code Generator for the js_if_else block
Blockly.JavaScript['js_if_else'] = function (block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ATOMIC) || 'false'; // Get the condition input
  var doStatements = Blockly.JavaScript.statementToCode(block, 'DO'); // Get statements for the if part
  var elseStatements = Blockly.JavaScript.statementToCode(block, 'ELSE'); // Get statements for the else part
  var code = `if (${condition}) {\n${doStatements}\n} else {\n${elseStatements}\n}\n`; // Generate the JavaScript code
  return code; // Return the generated code
};

Blockly.Blocks['js_switch'] = {
  init: function () {
    this.appendValueInput("SWITCH").appendField("switch (");
    this.appendDummyInput().appendField(")");
    this.appendStatementInput("CASES").setCheck(null).appendField("");
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Switch case structure.");
  }
};

Blockly.JavaScript['js_switch'] = function (block) {
  const variable = Blockly.JavaScript.valueToCode(block, 'SWITCH', Blockly.JavaScript.ORDER_ATOMIC) || '';
  const cases = Blockly.JavaScript.statementToCode(block, 'CASES');
  return `switch (${variable}) {\n${cases}}\n`;
};

Blockly.Blocks['js_case'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("case")
      .appendField(new Blockly.FieldTextInput("value"), "VALUE")
      .appendField(":");

    this.appendStatementInput("DO")
      .setCheck(null)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Defines a case in a switch statement.");
  }
};

Blockly.JavaScript['js_case'] = function (block) {
  const value = block.getFieldValue('VALUE');
  const statements = Blockly.JavaScript.statementToCode(block, 'DO');
  return `case ${value}:\n${statements}`;
};

Blockly.Blocks['js_break'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("break;")

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Defines break statement");
  }
};

Blockly.JavaScript['js_break'] = function (block) {

  return `break;\n`;
};

Blockly.Blocks['js_continue'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("continue;")

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Defines continue statement");
  }
};

Blockly.JavaScript['js_continue'] = function (block) {

  return `continue;\n`;
};

Blockly.Blocks['js_while_loop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("while (");
    this.appendValueInput("CONDITION")
      .setCheck("Boolean");
    this.appendDummyInput()
      .appendField(") {");
    this.appendStatementInput("DO")
      .appendField("");
    this.appendDummyInput()
      .appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#1F7A8C');
    this.setTooltip("While loop in JavaScript.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_while_loop'] = function (block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'true';
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `while (${condition}) {\n${statements_do}}\n`;
  return code;
};

// For loop block
// Traditional for loop block
Blockly.Blocks['js_for_loop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("for (let") // Label for the "for" loop, initializing with "let"
      .appendField(new Blockly.FieldVariable("i"), "VAR") // Variable field with default "i"
      .appendField("="); // Equal sign for variable initialization
    this.appendValueInput("START") // Input for the starting value
      .setCheck("Number"); // Ensure it's a number
    this.appendDummyInput()
      .appendField(";") // Semicolon to separate parts of the for loop
      .appendField(new Blockly.FieldVariable("i"), "VAR") // Re-use variable field
      .appendField("<"); // Less-than symbol for condition (can be updated for step direction)
    this.appendValueInput("END") // Input for the ending value
      .setCheck("Number"); // Ensure it's a number
    this.appendDummyInput()
      .appendField(";") // Another semicolon
      .appendField(new Blockly.FieldVariable("i"), "VAR") // Re-use variable field
      .appendField("+="); // Increment step
    this.appendValueInput("STEP") // Input for the step value
      .setCheck("Number"); // Ensure it's a number
    this.appendDummyInput()
      .appendField(") {"); // Closing the "for" part
    this.appendStatementInput("DO") // Statement input for the loop body
      .appendField(""); // Label for the action inside the loop
    this.appendDummyInput()
      .appendField("}"); // Closing brace for the loop
    this.setPreviousStatement(true, null); // Allow connection to previous blocks
    this.setNextStatement(true, null); // Allow connection to next blocks
    this.setColour('#F85E00'); // Set block color
    this.setTooltip("Traditional for loop in JavaScript."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
  }
};

Blockly.JavaScript['js_for_loop'] = function (block) {
  // Retrieve the variable name specified by the user
  var variable = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

  // Retrieve the values for start, end, and step
  var start = Blockly.JavaScript.valueToCode(block, 'START', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var end = Blockly.JavaScript.valueToCode(block, 'END', Blockly.JavaScript.ORDER_ASSIGNMENT) || '10';
  var step = Blockly.JavaScript.valueToCode(block, 'STEP', Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';

  // Retrieve the statements to be executed inside the loop
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');

  // Generate the traditional JavaScript for loop code
  var code = `for (let ${variable} = ${start}; ${variable} < ${end}; ${variable} += ${step}) {\n${statements_do}}\n`;
  return code; // Return the generated code
};

Blockly.Blocks['js_for_of_loop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("for (let")
      .appendField(new Blockly.FieldVariable("item"), "VAR")
      .appendField("of");
    this.appendValueInput("ITERABLE")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(") {");
    this.appendStatementInput("DO")
      .appendField("");
    this.appendDummyInput()
      .appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("For...of loop to iterate over iterable objects.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_for_of_loop'] = function (block) {
  var variable = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var iterable = Blockly.JavaScript.valueToCode(block, 'ITERABLE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `for (let ${variable} of ${iterable}) {\n${statements_do}}\n`;
  return code;
};

Blockly.Blocks['js_for_in_loop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("for (let")
      .appendField(new Blockly.FieldVariable("key"), "VAR")
      .appendField("in");
    this.appendValueInput("OBJECT")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(") {");
    this.appendStatementInput("DO")
      .appendField("");
    this.appendDummyInput()
      .appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("For...in loop to iterate over object keys.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_for_in_loop'] = function (block) {
  var variable = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '{}';
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `for (let ${variable} in ${object}) {\n${statements_do}}\n`;
  return code;
};

// Function definition block
Blockly.Blocks['js_function'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("function") // Label for the block
      .appendField(new Blockly.FieldTextInput("myFunction"), "NAME")// Input for function name
      .appendField("() {"); // Label for the parameter list

    this.appendStatementInput('CONTENT')
      .setCheck(null)

    this.appendDummyInput()
      .appendField('}')     // Label for the closing brace

    this.setColour('#F85E00'); // Set block color
    this.setTooltip("Define a JavaScript function."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
    this.setPreviousStatement(true); // Allow connecting to previous blocks
    this.setNextStatement(true); // Allow connecting to next blocks
  }
};

// JavaScript Code Generator for the js_function block
Blockly.JavaScript['js_function'] = function (block) {
  var functionName = block.getFieldValue('NAME'); // Get the function name input
  var statements_do = Blockly.JavaScript.statementToCode(block, 'CONTENT'); // Get the statements inside the function
  var code = 'function ' + functionName + '() {\n' + statements_do + '}\n'; // Generate the JavaScript code
  return code; // Return the generated code
};

Blockly.Blocks['js_arrow_function'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("const")
      .appendField(new Blockly.FieldVariable("myFunc"), "FUNC_NAME")
      .appendField("=");
    this.appendDummyInput()
      .appendField("(")
      .appendField(new Blockly.FieldTextInput("param"), "PARAM")
      .appendField(")")
      .appendField("=> {");
    this.appendStatementInput("BODY")
      .setCheck(null)
      .appendField("");
    this.appendDummyInput()
      .appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Defines an arrow function.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_arrow_function'] = function (block) {
  var funcName = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('FUNC_NAME'), Blockly.Variables.NAME_TYPE);
  var param = block.getFieldValue('PARAM');
  var body = Blockly.JavaScript.statementToCode(block, 'BODY');
  var code = `const ${funcName} = (${param}) => {\n${body}};\n`;
  return code;
};

// Function call block
Blockly.Blocks['js_function_call'] = {
  init: function () {
    this.appendDummyInput().appendField("call function").appendField(new Blockly.FieldTextInput("myFunction"), "FUNCTION_NAME");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Call a defined function.");
  }
};

Blockly.JavaScript['js_function_call'] = function (block) {
  const functionName = block.getFieldValue('FUNCTION_NAME');
  return `${functionName}();\n`;
};

// Return block
Blockly.Blocks['js_return'] = {
  init: function () {
    this.appendValueInput("RETURN").appendField("return");
    this.setPreviousStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Return a value from a function.");
  }
};

Blockly.JavaScript['js_return'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'RETURN', Blockly.JavaScript.ORDER_ATOMIC) || '';
  return `return ${value};\n`;
};

Blockly.Blocks['js_event_listenerDOMContentLoaded'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('document.addEventListener("DOMContentLoaded"')
      .appendField(", function() { ")
    this.appendStatementInput("BODY")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(')}')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Runs when the DOM is fully loaded.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_event_listenerDOMContentLoaded'] = function (block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'BODY');
  var code = `document.addEventListener("DOMContentLoaded", function() {\n${statements}});\n`;
  return code;
};

Blockly.Blocks['js_event_listener'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('document.getElementById("')
      .appendField(new Blockly.FieldTextInput("btn"), "ELEMENT_ID") // Input for button ID
      .appendField('"').appendField(').addEventListener("')
      .appendField(new Blockly.FieldDropdown([
        ["click", "click"],
        ["mouseover", "mouseover"],
        ["mouseout", "mouseout"]
      ]), "EVENT")// Dropdown for event type
      .appendField('"),function(){')
    this.appendStatementInput("DO") // Allow nested blocks for the action
      .setCheck(null); // Accept any type of blocks
    this.appendDummyInput()
      .appendField('});'); // Closing brace for event listener function
    this.setColour('#F85E00'); // Set block color
    this.setTooltip("Add an event listener to an element."); // Tooltip
    this.setHelpUrl(""); // Help URL
    this.setPreviousStatement(true); // Allow connection to previous blocks
    this.setNextStatement(true); // Allow connection to next blocks
  }
};

// Generate JavaScript code for the event listener block
Blockly.JavaScript['js_event_listener'] = function (block) {
  var elementId = block.getFieldValue('ELEMENT_ID'); // Get the element ID
  var eventType = block.getFieldValue('EVENT'); // Get the event type
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO'); // Get the statements inside the block

  // Generate the event listener code without quotes around the getElementById
  var code = 'document.getElementById("' + elementId + '").addEventListener("' + eventType + '", function() {\n' + statements_do + '});\n';
  return code; // Return the code
};

Blockly.Blocks['js_remove_event_listener'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("document.getElementById (")
      .appendField(new Blockly.FieldTextInput("elementId"), "ELEMENT_ID")
      .appendField(").removeEventListener(")
      .appendField(new Blockly.FieldTextInput("click"), "EVENT_TYPE")
      .appendField(",")
      .appendField(new Blockly.FieldTextInput("handleClick"), "HANDLER")
      .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Removes an event listener from an element.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_remove_event_listener'] = function (block) {
  var elementId = block.getFieldValue('ELEMENT_ID');
  var eventType = block.getFieldValue('EVENT_TYPE');
  var handler = block.getFieldValue('HANDLER');
  var code = `document.getElementById("${elementId}").removeEventListener("${eventType}", ${handler});\n`;
  return code;
};


// Set Timeout block
Blockly.Blocks['js_set_timeout'] = {
  init: function () {
    this.appendValueInput("TIME").setCheck("Number").appendField("setTimeout(function() {");
    this.appendStatementInput("DO");
    this.appendDummyInput().appendField("},").appendField(new Blockly.FieldTextInput("1000"), "TIMEOUT").appendField("ms);");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Execute code after a delay.");
  }
};

Blockly.JavaScript['js_set_timeout'] = function (block) {
  const statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  const time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC) || '1000';
  return `setTimeout(function() {\n${statements_do}}, ${time});\n`;
};

// Set Interval block
Blockly.Blocks['js_set_interval'] = {
  init: function () {
    this.appendValueInput("TIME").setCheck("Number").appendField("setInterval(function() {");
    this.appendStatementInput("DO");
    this.appendDummyInput().appendField("},").appendField(new Blockly.FieldTextInput("1000"), "INTERVAL").appendField("ms);");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Execute code at regular intervals.");
  }
};

Blockly.JavaScript['js_set_interval'] = function (block) {
  const statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  const time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC) || '1000';
  return `setInterval(function() {\n${statements_do}}, ${time});\n`;
};

Blockly.Blocks['js_clear_timeout'] = {
  init: function () {
    this.appendValueInput("TIMEOUT_ID")
      .setCheck(null)
      .appendField("clearTimeout");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Clears a timeout using its ID.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_clear_timeout'] = function (block) {
  var timeoutId = Blockly.JavaScript.valueToCode(block, 'TIMEOUT_ID', Blockly.JavaScript.ORDER_NONE) || 'null';
  var code = `clearTimeout(${timeoutId});\n`;
  return code;
};

Blockly.Blocks['js_clear_interval'] = {
  init: function () {
    this.appendValueInput("INTERVAL_ID")
      .setCheck(null)
      .appendField("clearInterval");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Clears an interval using its ID.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_clear_interval'] = function (block) {
  var intervalId = Blockly.JavaScript.valueToCode(block, 'INTERVAL_ID', Blockly.JavaScript.ORDER_NONE) || 'null';
  var code = `clearInterval(${intervalId});\n`;
  return code;
};

Blockly.JavaScript['js_http_get'] = function (block) {
  var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC) || '""';
  var code = `fetch(${url})\n  .then(response => response.json())\n  .then(data => console.log(data));\n`;
  return code;
};



// Block for generating numbers
Blockly.Blocks['number_input'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0), "NUM"); // Default number is 0
    this.setOutput(true, "Number"); // Outputs a number
    this.setColour('#F85E00'); // Set block color
    this.setTooltip("Number input."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
  }
};

Blockly.JavaScript['number_input'] = function (block) {
  var number = block.getFieldValue('NUM'); // Get the number from the block
  var code = number; // Use the number as the code
  return [code, Blockly.JavaScript.ORDER_ATOMIC]; // Return the number with proper precedence
};
// Array creation block
Blockly.Blocks['js_array'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("[")
      .appendField(new Blockly.FieldTextInput("item1, item2"), "ITEMS")
      .appendField("]")
    this.setOutput(true, "Array");
    this.setColour('#F85E00');
    this.setTooltip("Create an array.");
  }
};
Blockly.JavaScript['js_array'] = function (block) {
  const items = block.getFieldValue('ITEMS').split(',').map(item => item.trim());
  return [`[${items.join(', ')}]`, Blockly.JavaScript.ORDER_ATOMIC];
};
// Array index access block
Blockly.Blocks['js_array_access'] = {
  init: function () {
    this.appendValueInput("ARRAY").setCheck("Array");
    this.appendValueInput("INDEX").setCheck("Number").appendField("[");
    this.appendDummyInput().appendField("]");
    this.setOutput(true);
    this.setColour('#F85E00');
    this.setTooltip("Access array element by index.");
  }
};

Blockly.JavaScript['js_array_access'] = function (block) {
  const array = Blockly.JavaScript.valueToCode(block, 'ARRAY', Blockly.JavaScript.ORDER_ATOMIC);
  const index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return [`${array}[${index}]`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['js_array_length'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('arrayName'), 'NAME')
      .appendField(".length");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Get the length of an array.");
  }
};

Blockly.JavaScript['js_array_length'] = function (block) {
  const array = block.getFieldValue('NAME') || 'arrayName';
  return [`${array}.length`, Blockly.JavaScript.ORDER_MEMBER];
};

// Array push block
Blockly.Blocks['js_array_push'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('arrayName'), 'NAME')
      .appendField(".push(")
    this.appendValueInput("ITEM")
    this.appendDummyInput()
      .appendField(')')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Add element to the end of array.");
  }
};
Blockly.JavaScript['js_array_push'] = function (block) {
  const array = block.getFieldValue('NAME') || 'arrayName';
  const item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) || '""';
  return `${array}.push(${item});\n`;
};

Blockly.Blocks['js_array_pop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('arrayName'), 'NAME')
      .appendField(".pop(")
    this.appendValueInput("ITEM")
    this.appendDummyInput()
      .appendField(')')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Removes the last item from an array and returns it.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_array_pop'] = function (block) {
  const array = block.getFieldValue('NAME') || 'arrayName';
  var code = `${array}.pop()`;
  return code;
};

Blockly.Blocks['js_array_shift'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('arrayName'), 'NAME')
      .appendField(".shift()")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Removes the first item from an array and returns it.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_array_shift'] = function (block) {
  var array = block.getFieldValue('NAME') || 'arrayName';
  var code = `${array}.shift();\n`;
  return code;

};

Blockly.Blocks['js_array_unshift'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('arrayName'), 'NAME')
      .appendField(".unshift(")
      .appendField(new Blockly.FieldTextInput("item1, item2"), "ITEMS")
      .appendField(")")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Adds one or more items to the beginning of an array.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_array_unshift'] = function (block) {
  var array = block.getFieldValue('NAME') || 'arrayName';
  const items = block.getFieldValue('ITEMS').split(',').map(item => item.trim());
  var code = `${array}.unshift(${items.join(', ')});\n`;
  return code;
};

Blockly.Blocks['js_array_map'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('arrayName'), 'NAME')
      .appendField(".map(")
    this.appendValueInput("FUNCTION")
    this.appendDummyInput()
      .appendField(')')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Map function on array items.");
  }
};

Blockly.JavaScript['js_array_map'] = function (block) {
  var array = block.getFieldValue('NAME') || 'arrayName';
  const func = Blockly.JavaScript.valueToCode(block, 'FUNCTION', Blockly.JavaScript.ORDER_ATOMIC) || '0'
  return `${array}.map(${func})`;
};

Blockly.Blocks['js_array_filter'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('arrayName'), 'NAME')
      .appendField(".filter(")
    this.appendValueInput("FUNCTION")
    this.appendDummyInput()
      .appendField(')')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Filter items from an array based on a condition.");
  }
};

Blockly.JavaScript['js_array_filter'] = function (block) {
  var array = block.getFieldValue('NAME') || 'arrayName';
  const func = Blockly.JavaScript.valueToCode(block, 'FUNCTION', Blockly.JavaScript.ORDER_ATOMIC) || '0'
  return [`${array}.filter(item => ${condition})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// 1. Object Create -> const obj = {};
Blockly.Blocks['js_object_create'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("const")
      .appendField(new Blockly.FieldTextInput("obj"), "OBJ")
      .appendField("=")
      .appendField("{}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Creates an empty object.");
  }
};

Blockly.JavaScript['js_object_create'] = function (block) {
  const obj = block.getFieldValue("OBJ") || "obj";
  return `const ${obj} = {};\n`;
};

// 2. Object Access -> obj["key"]
Blockly.Blocks['js_object_access'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("object"), "OBJ")
      .appendField("[")
      .appendField(new Blockly.FieldTextInput("key"), "KEY")
      .appendField("]");
    this.setOutput(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Access object property.");
  }
};

Blockly.JavaScript['js_object_access'] = function (block) {
  const obj = block.getFieldValue("OBJ") || "object";
  const key = block.getFieldValue("KEY") || "key";
  return [`${obj}["${key}"]`, Blockly.JavaScript.ORDER_MEMBER];
};

// 3. Object.assign(target, source)
Blockly.Blocks['js_object_assign'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Object.assign(");
    this.appendValueInput("TARGET")
      .setCheck("Object");
    this.appendDummyInput()
      .appendField(", ");
    this.appendValueInput("SOURCE")
      .setCheck("Object");
    this.appendDummyInput()
      .appendField(")");
    this.setOutput(true, "Object");
    this.setColour('#F85E00');
    this.setTooltip("Merge source into target using Object.assign.");
  }
};

Blockly.JavaScript['js_object_assign'] = function (block) {
  const target = Blockly.JavaScript.valueToCode(block, 'TARGET', Blockly.JavaScript.ORDER_NONE) || '{}';
  const source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_NONE) || '{}';
  return [`Object.assign(${target}, ${source})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// 4. Object.keys(obj)
Blockly.Blocks['js_object_keys'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Object.keys(");
    this.appendValueInput("OBJ")
      .setCheck("Object");
    this.appendDummyInput()
      .appendField(")");
    this.setOutput(true, "Array");
    this.setColour('#F85E00');
    this.setTooltip("Get all keys of an object.");
  }
};

Blockly.JavaScript['js_object_keys'] = function (block) {
  const obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_NONE) || '{}';
  return [`Object.keys(${obj})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// 5. Object.values(obj)
Blockly.Blocks['js_object_values'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Object.values(");
    this.appendValueInput("OBJ")
      .setCheck("Object");
    this.appendDummyInput()
      .appendField(")");
    this.setOutput(true, "Array");
    this.setColour('#F85E00');
    this.setTooltip("Get all values of an object.");
  }
};

Blockly.JavaScript['js_object_values'] = function (block) {
  const obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_NONE) || '{}';
  return [`Object.values(${obj})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['js_json_parse'] = {
  init: function () {
    this.appendValueInput("STRING").setCheck("String").appendField("parse JSON");
    this.setOutput(true, "Object");
    this.setColour('#F85E00');
    this.setTooltip("Parse a JSON string into an object.");
  }
};

Blockly.JavaScript['js_json_parse'] = function (block) {
  const jsonString = Blockly.JavaScript.valueToCode(block, 'STRING', Blockly.JavaScript.ORDER_ATOMIC) || '""';
  return [`JSON.parse(${jsonString})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_json_stringify'] = {
  init: function () {
    this.appendValueInput("OBJECT").setCheck("Object").appendField("stringify JSON");
    this.setOutput(true, "String");
    this.setColour('#F85E00');
    this.setTooltip("Convert an object to a JSON string.");
  }
};

Blockly.JavaScript['js_json_stringify'] = function (block) {
  const obj = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC) || '{}';
  return [`JSON.stringify(${obj})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// 1. document.getElementById("id")
Blockly.Blocks['js_get_element_by_id'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("document.getElementById(")
      .appendField(new Blockly.FieldTextInput("elementId"), "ID")
      .appendField(")");
    this.setOutput(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Get element by ID.");
  }
};

Blockly.JavaScript['js_get_element_by_id'] = function (block) {
  const id = block.getFieldValue("ID") || "elementId";
  return [`document.getElementById("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// 2. document.querySelector("selector")
Blockly.Blocks['js_query_selector'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("document.querySelector(")
      .appendField(new Blockly.FieldTextInput(".className"), "SELECTOR")
      .appendField(")");
    this.setOutput(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Query DOM using CSS selector.");
  }
};

Blockly.JavaScript['js_query_selector'] = function (block) {
  const selector = block.getFieldValue("SELECTOR") || ".className";
  return [`document.querySelector("${selector}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// 3. element.innerHTML = "..."
Blockly.Blocks['js_set_innerhtml'] = {
  init: function () {
    this.appendValueInput("ELEMENT")
      .setCheck(null)
      .appendField("");
    this.appendDummyInput()
      .appendField(".innerHTML =");
    this.appendValueInput("HTML")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Set innerHTML of an element.");
  }
};

Blockly.JavaScript['js_set_innerhtml'] = function (block) {
  const element = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_MEMBER) || 'element';
  const html = Blockly.JavaScript.valueToCode(block, 'HTML', Blockly.JavaScript.ORDER_NONE) || '""';
  return `${element}.innerHTML = ${html};\n`;
};

// 4. element.setAttribute("attr", "value")
Blockly.Blocks['js_set_attribute'] = {
  init: function () {
    this.appendValueInput("ELEMENT")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(".setAttribute(");
    this.appendValueInput("ATTR")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(", ");
    this.appendValueInput("VALUE")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Set attribute on a DOM element.");
  }
};

Blockly.JavaScript['js_set_attribute'] = function (block) {
  const element = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_MEMBER) || 'element';
  const attr = Blockly.JavaScript.valueToCode(block, 'ATTR', Blockly.JavaScript.ORDER_NONE) || '"attr"';
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '"value"';
  return `${element}.setAttribute(${attr}, ${value});\n`;
};

// 5. element.classList.add("className")
Blockly.Blocks['js_add_class'] = {
  init: function () {
    this.appendValueInput("ELEMENT")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(".classList.add(");
    this.appendValueInput("CLASS")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Add a CSS class.");
  }
};

Blockly.JavaScript['js_add_class'] = function (block) {
  const element = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_MEMBER) || 'element';
  const className = Blockly.JavaScript.valueToCode(block, 'CLASS', Blockly.JavaScript.ORDER_NONE) || '"className"';
  return `${element}.classList.add(${className});\n`;
};

// 6. element.classList.remove("className")
Blockly.Blocks['js_remove_class'] = {
  init: function () {
    this.appendValueInput("ELEMENT")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(".classList.remove(");
    this.appendValueInput("CLASS")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Remove a CSS class.");
  }
};

Blockly.JavaScript['js_remove_class'] = function (block) {
  const element = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_MEMBER) || 'element';
  const className = Blockly.JavaScript.valueToCode(block, 'CLASS', Blockly.JavaScript.ORDER_NONE) || '"className"';
  return `${element}.classList.remove(${className});\n`;
};

// 7. element.classList.toggle("className")
Blockly.Blocks['js_toggle_class'] = {
  init: function () {
    this.appendValueInput("ELEMENT")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(".classList.toggle(");
    this.appendValueInput("CLASS")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Toggle a CSS class.");
  }
};

Blockly.JavaScript['js_toggle_class'] = function (block) {
  const element = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_MEMBER) || 'element';
  const className = Blockly.JavaScript.valueToCode(block, 'CLASS', Blockly.JavaScript.ORDER_NONE) || '"className"';
  return `${element}.classList.toggle(${className});\n`;
};

// 1. try...catch block
Blockly.Blocks['js_try_catch'] = {
  init: function () {
    this.appendDummyInput()
        .appendField("try {");
    this.appendStatementInput("TRY")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("} catch (")
        .appendField(new Blockly.FieldTextInput("err"), "ERROR_VAR")
        .appendField(") {");
    this.appendStatementInput("CATCH")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Try-catch block for error handling.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_try_catch'] = function (block) {
  const tryBlock = Blockly.JavaScript.statementToCode(block, 'TRY');
  const catchBlock = Blockly.JavaScript.statementToCode(block, 'CATCH');
  const errorVar = block.getFieldValue('ERROR_VAR') || 'err';
  return `try {\n${tryBlock}} catch (${errorVar}) {\n${catchBlock}}\n`;
};


// 2. throw new Error("message")
Blockly.Blocks['js_throw_error'] = {
  init: function () {
    this.appendDummyInput()
        .appendField("throw new Error(")
        .appendField(new Blockly.FieldTextInput("Something went wrong"), "MESSAGE")
        .appendField(");");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Throw a custom error.");
  }
};

Blockly.JavaScript['js_throw_error'] = function (block) {
  const message = block.getFieldValue('MESSAGE') || 'Something went wrong';
  return `throw new Error("${message}");\n`;
};

Blockly.Blocks['js_promise'] = {
  init: function () {
    this.appendDummyInput().appendField("new Promise((resolve, reject) => {");
    this.appendStatementInput("BODY").setCheck(null);
    this.appendDummyInput().appendField("})");
    this.setOutput(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Creates a new Promise.");
  }
};

Blockly.JavaScript['js_promise'] = function (block) {
  const body = Blockly.JavaScript.statementToCode(block, 'BODY');
  const code = `new Promise((resolve, reject) => {\n${body}})`;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_then'] = {
  init: function () {
    this.appendValueInput("PROMISE").setCheck(null).appendField("");
    this.appendDummyInput().appendField(".then((")
      .appendField(new Blockly.FieldTextInput("result"), "VAR")
      .appendField(") => {");
    this.appendStatementInput("DO").setCheck(null);
    this.appendDummyInput().appendField("})");
    this.setOutput(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Handles the resolved value of a promise.");
  }
};

Blockly.JavaScript['js_then'] = function (block) {
  const promise = Blockly.JavaScript.valueToCode(block, 'PROMISE', Blockly.JavaScript.ORDER_NONE) || '';
  const variable = block.getFieldValue('VAR') || 'result';
  const body = Blockly.JavaScript.statementToCode(block, 'DO');
  const code = `${promise}.then((${variable}) => {\n${body}})`;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_catch'] = {
  init: function () {
    this.appendValueInput("PROMISE").setCheck(null).appendField("");
    this.appendDummyInput().appendField(".catch((")
      .appendField(new Blockly.FieldTextInput("error"), "VAR")
      .appendField(") => {");
    this.appendStatementInput("DO").setCheck(null);
    this.appendDummyInput().appendField("})");
    this.setOutput(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Handles a rejected promise.");
  }
};

Blockly.JavaScript['js_catch'] = function (block) {
  const promise = Blockly.JavaScript.valueToCode(block, 'PROMISE', Blockly.JavaScript.ORDER_NONE) || '';
  const variable = block.getFieldValue('VAR') || 'error';
  const body = Blockly.JavaScript.statementToCode(block, 'DO');
  const code = `${promise}.catch((${variable}) => {\n${body}})`;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_async_function'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("async function")
      .appendField(new Blockly.FieldTextInput("myFunc"), "FUNC_NAME")
      .appendField("() {");
    this.appendStatementInput("BODY").setCheck(null);
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Defines an async function.");
  }
};

Blockly.JavaScript['js_async_function'] = function (block) {
  const name = block.getFieldValue('FUNC_NAME') || 'myFunc';
  const body = Blockly.JavaScript.statementToCode(block, 'BODY');
  return `async function ${name}() {\n${body}}\n`;
};

Blockly.Blocks['js_await'] = {
  init: function () {
    this.appendValueInput("EXPR").setCheck(null).appendField("await");
    this.setOutput(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Await a promise inside an async function.");
  }
};

Blockly.JavaScript['js_await'] = function (block) {
  const expr = Blockly.JavaScript.valueToCode(block, 'EXPR', Blockly.JavaScript.ORDER_NONE) || '';
  return [`await ${expr}`, Blockly.JavaScript.ORDER_AWAIT];
};

Blockly.Blocks['js_typeof'] = {
  init: function () {
    this.appendValueInput("VALUE").setCheck(null).appendField("typeof");
    this.setOutput(true, "String");
    this.setColour('#F85E00');
    this.setTooltip("Returns the type of a variable or expression.");
  }
};

Blockly.JavaScript['js_typeof'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || 'value';
  return [`typeof ${value}`, Blockly.JavaScript.ORDER_TYPEOF];
};

Blockly.Blocks['js_parse_int'] = {
  init: function () {
    this.appendDummyInput().appendField("parseInt(");
    this.appendValueInput("VALUE").setCheck(null);
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Converts a string to an integer.");
  }
};

Blockly.JavaScript['js_parse_int'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  return [`parseInt(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_parse_float'] = {
  init: function () {
    this.appendDummyInput().appendField("parseFloat(");
    this.appendValueInput("VALUE").setCheck(null);
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Converts a string to a floating point number.");
  }
};

Blockly.JavaScript['js_parse_float'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0.0';
  return [`parseFloat(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_to_string'] = {
  init: function () {
    this.appendValueInput("VALUE").setCheck(null).appendField("");
    this.appendDummyInput().appendField(".toString()");
    this.setOutput(true, "String");
    this.setColour('#F85E00');
    this.setTooltip("Converts a number or object to a string.");
  }
};

Blockly.JavaScript['js_to_string'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || 'value';
  return [`${value}.toString()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_math_random'] = {
  init: function () {
    this.appendDummyInput().appendField("Math.random()");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive).");
  }
};

Blockly.JavaScript['js_math_random'] = function (block) {
  return ["Math.random()", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['js_math_floor'] = {
  init: function () {
    this.appendDummyInput().appendField("Math.floor(");
    this.appendValueInput("VALUE").setCheck("Number");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Rounds a number down to the nearest integer.");
  }
};

Blockly.JavaScript['js_math_floor'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  return [`Math.floor(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['js_math_ceil'] = {
  init: function () {
    this.appendDummyInput().appendField("Math.ceil(");
    this.appendValueInput("VALUE").setCheck("Number");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Rounds a number up to the nearest integer.");
  }
};

Blockly.JavaScript['js_math_ceil'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  return [`Math.ceil(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['js_math_round'] = {
  init: function () {
    this.appendDummyInput().appendField("Math.round(");
    this.appendValueInput("VALUE").setCheck("Number");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Rounds a number to the nearest integer.");
  }
};

Blockly.JavaScript['js_math_round'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  return [`Math.round(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['js_math_pow'] = {
  init: function () {
    this.appendDummyInput().appendField("Math.pow(");
    this.appendValueInput("BASE").setCheck("Number");
    this.appendDummyInput().appendField(",");
    this.appendValueInput("EXPONENT").setCheck("Number");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Returns base to the power of exponent.");
  }
};

Blockly.JavaScript['js_math_pow'] = function (block) {
  const base = Blockly.JavaScript.valueToCode(block, 'BASE', Blockly.JavaScript.ORDER_NONE) || '0';
  const exponent = Blockly.JavaScript.valueToCode(block, 'EXPONENT', Blockly.JavaScript.ORDER_NONE) || '0';
  return [`Math.pow(${base}, ${exponent})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
