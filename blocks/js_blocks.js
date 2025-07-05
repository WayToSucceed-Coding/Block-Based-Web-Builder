// blocks/js_blocks.js

// Define the js_alert block
Blockly.Blocks['js_alert'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("alert(")
      .appendField(new Blockly.FieldTextInput('"Hello Coder"'), "TEXT")
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
  // Check if there is a block connected on the left for chaining attributes
  const message = block.getFieldValue("TEXT");
  var code = `alert(${message});\n`; // Generate the JavaScript code for the alert
  return code; // Return the code to be included in the generated script
};

// Console log block
Blockly.Blocks['js_console_log'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("console.log(")// Label for the block
      .appendField(new Blockly.FieldTextInput('"Hello Coder"'), "TEXT")
      .appendField(")");
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
  const message = block.getFieldValue("TEXT")
  var code = `console.log(${message});\n`; // Generate the JavaScript code
  return code; // Return the generated code
};

Blockly.Blocks['js_prompt'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("prompt(") // Label for the block
      .appendField(new Blockly.FieldTextInput('"Type your question"'), 'TEXT') // Input for prompt text
      .appendField(")"); // Close the prompt function call
    this.setOutput(true);
    this.setColour('#F85E00'); // Set block color

  }
}

Blockly.JavaScript['js_prompt'] = function (block) {
  const message = block.getFieldValue("TEXT");
  const code = `prompt(${message})`; // ← NO semicolon or newline
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]; // Return as a value
};


Blockly.Blocks['data'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('data'), 'DATA');
    this.setOutput(true);
    this.setColour('#F85E00'); // Set block color

  }
}

Blockly.JavaScript['data'] = function (block) {
  var data = block.getFieldValue('DATA') || '""';
  return [`${data}`, Blockly.JavaScript.ORDER_ATOMIC];
}

// Variable declaration block
Blockly.Blocks['js_variable_declare'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("var") // Label for the block
      .appendField(new Blockly.FieldTextInput("variableName"), "VAR")// Input for variable name
      .appendField('=')
    this.appendValueInput('DATA');
    this.appendDummyInput()
      .appendField('')
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
  const value = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || '';
  var code = `var ${variable} = ${value};\n`; // Generate the JavaScript code
  return code; // Return the generated code
};

// Constant declaration block
Blockly.Blocks['js_const_declare'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("const") // Label for the block
      .appendField(new Blockly.FieldTextInput("constantName"), "CONST")// Input for constant name
      .appendField('=')
    this.appendValueInput('DATA');
    this.appendDummyInput()
      .appendField('')
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
  const value = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || '';
  var code = `const ${constant} = ${value};\n`; // Generate the JavaScript code
  return code; // Return the generated code
};

// Let declaration block
Blockly.Blocks['js_let_declare'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("let") // Label for the block
      .appendField(new Blockly.FieldTextInput("name"), "LET")// Input for variable name
      .appendField('=')
    this.appendValueInput('DATA');
    this.appendDummyInput()
      .appendField('')
    this.setPreviousStatement(true); // Allow connecting to previous blocks
    this.setNextStatement(true); // Allow connecting to next blocks
    this.setColour('#F85E00'); // Set block color
    //this.setTooltip("Declare a constant."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
  }
};

// JavaScript Code Generator for the js_let_declare block
Blockly.JavaScript['js_let_declare'] = function (block) {
  var name = block.getFieldValue('LET'); // Get the variable name input
  const value = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || '';
  var code = `let ${name} = ${value};\n`; // Generate the JavaScript code
  return code; // Return the generated code
};

Blockly.Blocks['js_assign'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(""), "VAR")
      .appendField('=')
    this.appendValueInput('DATA')
      .appendField('')
    this.appendDummyInput()
      .appendField('')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour('#F85E00'); // Set block color

  }
}

Blockly.JavaScript['js_assign'] = function (block) {
  const name = block.getFieldValue('VAR');
  const value = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || '';
  var code = `${name}=${value};\n`
  return code;
}
// Arithmetic operations block
Blockly.Blocks['js_arithmetic'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(), "A")
      .appendField(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["*", "*"], ["/", "/"], ["%", "%"]]), "OPERATOR")
      .appendField(new Blockly.FieldTextInput(), "B");

    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Performs arithmetic operations.");
  }
};

Blockly.JavaScript['js_arithmetic'] = function (block) {
  const operator = block.getFieldValue('OPERATOR');
  const a = block.getFieldValue('A');
  const b = block.getFieldValue('B');
  return [`${a} ${operator} ${b}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// Logical operations block
Blockly.Blocks['js_logical'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(), "A")
      .appendField(new Blockly.FieldDropdown([["AND", "&&"], ["OR", "||"]]), "OPERATOR")
      .appendField(new Blockly.FieldTextInput(), "B");
    this.setOutput(true, "Boolean");
    this.setColour('#F85E00');
    this.setTooltip("Performs logical operations.");
  }
};

Blockly.JavaScript['js_logical'] = function (block) {
  const operator = block.getFieldValue('OPERATOR');
  const a = block.getFieldValue('A');
  const b = block.getFieldValue('B');
  return [`${a} ${operator} ${b}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// Comparison block
Blockly.Blocks['js_compare'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(), "A")
      .appendField(new Blockly.FieldDropdown([["==", "=="], ["===", "==="], ["!=", "!="], ["!==", "!=="], ["<", "<"], [">", ">"], ["<=", "<="], [">=", ">="]]), "OPERATOR")
      .appendField(new Blockly.FieldTextInput(), "B")
    this.setOutput(true, "Boolean");
    this.setColour('#F85E00');
    this.setTooltip("Performs comparison operations.");
  }
};

Blockly.JavaScript['js_compare'] = function (block) {
  const operator = block.getFieldValue('OPERATOR');
  const a = block.getFieldValue('A');
  const b = block.getFieldValue('B');
  return [`${a} ${operator} ${b}`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['js_not'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("!")
      .appendField(new Blockly.FieldTextInput(), "VALUE");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setColour('#F85E00'); // Use your preferred color
    this.setTooltip("Logical NOT");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_not'] = function (block) {
  const value = block.getFieldValue('VALUE');
  return [`!(${value})`, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

// If block
Blockly.Blocks['js_if'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("if")
      .appendField('(');
    this.appendValueInput("CONDITION")
      .setCheck("Boolean");
    this.appendDummyInput()
      .appendField(')');
    this.appendStatementInput("DO")
      .appendField("");
    this.setColour('#F85E00');
    this.setTooltip("Simple if condition.");
    this.setHelpUrl("");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['js_if'] = function (block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  var doStatements = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `if (${condition}) {\n${doStatements}\n}\n`;
  return code;
};


// If-Else block
Blockly.Blocks['js_if_else'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("if") // Label for the if statement
      .appendField('(');
    this.appendValueInput("CONDITION") // Input for the condition
      .setCheck("Boolean"); // Check type is Boolean
    this.appendDummyInput()
      .appendField(')')
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

// Else-if (elif) block
Blockly.Blocks['js_elif'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("else if")
      .appendField('(');
    this.appendValueInput("CONDITION")
      .setCheck("Boolean");
    this.appendDummyInput()
      .appendField(')');
    this.appendStatementInput("DO")
      .appendField("");
    this.setColour('#F85E00');
    this.setTooltip("Else-if condition.");
    this.setHelpUrl("");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['js_elif'] = function (block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  var doStatements = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `else if (${condition}) {\n${doStatements}\n}\n`;
  return code;
};

// Else block
Blockly.Blocks['js_else'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("else");
    this.appendStatementInput("DO")
      .appendField("");
    this.setColour('#F85E00');
    this.setTooltip("Else block to run code when previous conditions are false.");
    this.setHelpUrl("");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['js_else'] = function (block) {
  var doStatements = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `else {\n${doStatements}\n}\n`;
  return code;
};

Blockly.Blocks['js_switch'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("switch (")
      .appendField(new Blockly.FieldTextInput(), "SWITCH")
      .appendField(")");
    this.appendStatementInput("CASES").setCheck(null).appendField("");
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Switch case structure.");
  }
};

Blockly.JavaScript['js_switch'] = function (block) {
  const variable = block.getFieldValue('SWITCH')
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
    this.setColour('#F85E00');
    this.setTooltip("While loop in JavaScript.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_while_loop'] = function (block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `while (${condition}) {\n${statements_do}}\n`;
  return code;
};

// For loop block
Blockly.Blocks['js_for_loop'] = {
  init: function () {
    const input = this.appendDummyInput();

    input.appendField("for (let")
      .appendField(new Blockly.FieldTextInput("i"), "VAR")
      .appendField("=")
      .appendField(new Blockly.FieldTextInput(0), "START")
      .appendField(";")
      .appendField(new Blockly.FieldTextInput("i"), "VAR_COND")
      .appendField(new Blockly.FieldDropdown([
        ["<", "<"],
        ["<=", "<="],
        [">", ">"],
        [">=", ">="],
        ["!=", "!="],
        ["==", "=="]
      ]), "OPERATOR")
      .appendField(new Blockly.FieldTextInput(0), "END")
      .appendField(";")
      .appendField(new Blockly.FieldTextInput("i"), "VAR_INC_DEC")
      .appendField(new Blockly.FieldDropdown([
        ["++", "++"],
        ["--", "--"],
        ["+=", "+="],
        ["-=", "-="]
      ]), "INCREMENT_OP")
      .appendField(new Blockly.FieldTextInput(0), "STEP")
      .appendField(")")
      .appendField("{");

    this.appendStatementInput("DO").appendField("");
    this.appendDummyInput().appendField("}");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F85E00');
    this.setTooltip("Customizable JavaScript for loop.");
    this.setHelpUrl("");

    // Retrieve the dropdown field properly
    const incrementDropdown = this.getField("INCREMENT_OP");
    const stepField = this.getField("STEP");

    // Initial visibility for STEP
    if (incrementDropdown && stepField) {
      const shouldShowStep = !["++", "--"].includes(incrementDropdown.getValue());
      stepField.setVisible(shouldShowStep);
    }

    // Set onchange handler
    this.setOnChange(function () {
      const varName = this.getFieldValue('VAR');
      this.setFieldValue(varName, 'VAR_COND');
      this.setFieldValue(varName, 'VAR_INC_DEC');

      const incrementOp = this.getFieldValue('INCREMENT_OP');
      const stepField = this.getField('STEP');
      if (stepField) {
        const shouldShowStep = !(incrementOp === '++' || incrementOp === '--');
        if (stepField.isVisible() !== shouldShowStep) {
          stepField.setVisible(shouldShowStep);
          this.render();
        }
      }
    });
  }
};


Blockly.JavaScript['js_for_loop'] = function (block) {
  var variable = block.getFieldValue('VAR');
  var operator = block.getFieldValue('OPERATOR');
  var incrementOp = block.getFieldValue('INCREMENT_OP');

  var start = block.getFieldValue("START") || '0';
  var end = block.getFieldValue("END") || '10';
  var step = block.getFieldValue("STEP") || '1';

  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');

  let increment;
  if (incrementOp === '++' || incrementOp === '--') {
    increment = `${variable}${incrementOp}`;
  } else {
    increment = `${variable} ${incrementOp} ${step}`;
  }

  var code = `for (let ${variable} = ${start}; ${variable} ${operator} ${end}; ${increment}) {\n${statements_do}}\n`;
  //console.log(code)
  return code;
};

Blockly.Blocks['js_for_of_loop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("for (let")
      .appendField(new Blockly.FieldTextInput("item"), "VAR")
      .appendField("of")
      .appendField(new Blockly.FieldTextInput("arr"), "ITERABLE")
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
  var variable = block.getFieldValue('VAR');
  var iterable = block.getFieldValue('ITERABLE')
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `for (let ${variable} of ${iterable}) {\n${statements_do}}\n`;
  return code;
};

Blockly.Blocks['js_for_in_loop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("for (let")
      .appendField(new Blockly.FieldTextInput("key"), "VAR")
      .appendField("in")
      .appendField(new Blockly.FieldTextInput("obj"), "OBJECT")
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
  var variable = block.getFieldValue("VAR")
  var object = block.getFieldValue("OBJECT")
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `for (let ${variable} in ${object}) {\n${statements_do}}\n`;
  return code;
};

// Function definition block with parameter support
Blockly.Blocks['js_function'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("function")
      .appendField(new Blockly.FieldTextInput("myFunction"), "NAME")
      .appendField("(")
      .appendField(new Blockly.FieldTextInput(""), "PARAMS") // safer split
      .appendField(") {");

    this.appendStatementInput('CONTENT')
      .setCheck(null);

    this.appendDummyInput()
      .appendField("}");

    this.setColour('#F85E00');
    this.setTooltip("Define a JavaScript function with optional parameters.");
    this.setHelpUrl("");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['js_function'] = function (block) {
  var functionName = block.getFieldValue('NAME') || 'myFunction';
  var params = block.getFieldValue('PARAMS') || '';
  var statements = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var code = `function ${functionName}(${params}) {\n${statements}}\n`;
  return code;
};


Blockly.Blocks['js_arrow_function'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("const")
      .appendField(new Blockly.FieldTextInput("myFunction"), "NAME")
      .appendField("=")
      .appendField("(")
      .appendField(new Blockly.FieldTextInput(""), "PARAMS")
      .appendField(")")
      .appendField("=> {");

    this.appendStatementInput('CONTENT')
      .setCheck(null);

    this.appendDummyInput()
      .appendField("}");

    this.setColour('#F85E00');
    this.setTooltip("Define a JavaScript arrow function.");
    this.setHelpUrl("");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['js_arrow_function'] = function (block) {
  const functionName = block.getFieldValue('NAME') || 'myFunction';
  const params = block.getFieldValue('PARAMS') || '';
  const statements = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  const code = `const ${functionName} = (${params}) => {\n${statements}};\n`;
  return code;
};


Blockly.Blocks['js_function_call'] = {
  init: function () {
    this.argumentCount_ = 0;

    // Inline input for function name and open paren
    this.appendDummyInput('HEADER')
      .appendField(new Blockly.FieldTextInput("myFunction"), "FUNCTION_NAME")
      .appendField("(")
      .appendField(new Blockly.FieldTextInput("arg"), "ARGUMENTS")
      .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Call a function like in JavaScript.");
  },
};


Blockly.JavaScript['js_function_call'] = function (block) {
  const functionName = block.getFieldValue('FUNCTION_NAME');
  const args = block.getFieldValue("ARGUMENTS");

  return `${functionName}(${args});\n`;
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
Blockly.Blocks['js_set_timeout_1'] = {
  init: function () {
    this.appendDummyInput().appendField("setTimeout(function() {");
    this.appendStatementInput("DO");
    this.appendDummyInput().appendField("},").appendField(new Blockly.FieldTextInput("1000"), "TIMEOUT").appendField("ms);");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Execute code after a delay.");
  }
};

Blockly.JavaScript['js_set_timeout_1'] = function (block) {
  const statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  const time = block.getFieldValue('TIMEOUT') || 1000;
  return `setTimeout(function() {\n${statements_do}}, ${time});\n`;
};

Blockly.Blocks['js_set_timeout_2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("setTimeout(")
      .appendField(new Blockly.FieldTextInput(), "CALLBACK")
      .appendField(",")
      .appendField(new Blockly.FieldTextInput(), "TIMEOUT")
      .appendField(")");

    this.setOutput(true, null);  // It's an expression
    this.setColour("#F85E00");
    this.setTooltip("setTimeout(callback, delay)");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/API/setTimeout");
  }
};

Blockly.JavaScript['js_set_timeout_2'] = function (block) {
  const callback = block.getFieldValue('CALLBACK')
  const timeout = block.getFieldValue('TIMEOUT')
  const code = `setTimeout(${callback}, ${timeout})`;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


// Set Interval block
Blockly.Blocks['js_set_interval_1'] = {
  init: function () {
    this.appendDummyInput().appendField("setInterval(function() {");
    this.appendStatementInput("DO");
    this.appendDummyInput().appendField("},").appendField(new Blockly.FieldTextInput("1000"), "INTERVAL").appendField("ms);");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Execute code at regular intervals.");
  }
};

Blockly.JavaScript['js_set_interval_1'] = function (block) {
  const statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  const time = block.getFieldValue('INTERVAL') || 1000;
  return `setInterval(function() {\n${statements_do}}, ${time});\n`;
};

Blockly.Blocks['js_set_interval_2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("setInterval(")
      .appendField(new Blockly.FieldTextInput(), "CALLBACK")
      .appendField(",")
      .appendField(new Blockly.FieldTextInput(), "DELAY")
      .appendField(")");

    this.setOutput(true, null);  // It's an expression
    this.setColour("#F85E00");
    this.setTooltip("setInterval(callback, delay)");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/API/setInterval");
  }
};

Blockly.JavaScript['js_set_interval_2'] = function (block) {
  const callback = block.getFieldValue('CALLBACK')
  const delay = block.getFieldValue('DELAY')
  const code = `setInterval(${callback}, ${delay})`;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
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
      .appendField(".pop()")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#F85E00');
    this.setTooltip("Removes the last item from an array and returns it.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['js_array_pop'] = function (block) {
  const array = block.getFieldValue('NAME') || 'arrayName';
  var code = `${array}.pop();\n`;
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
    this.appendDummyInput()
        .appendField("JSON.parse(")
        .appendField(new Blockly.FieldTextInput(),"STRING")
        .appendField(")")
    this.setOutput(true, "Object");
    this.setColour('#F85E00');
    this.setTooltip("Parse a JSON string into an object.");
  }
};

Blockly.JavaScript['js_json_parse'] = function (block) {
  const jsonString = block.getFieldValue("STRING");
  return [`JSON.parse(${jsonString})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_json_stringify'] = {
  init: function () {
    this.appendDummyInput()
        .appendField("JSON.stringify(")
        .appendField(new Blockly.FieldTextInput(),"OBJECT")
        .appendField(")")
    this.setOutput(true, "String");
    this.setColour('#F85E00');
    this.setTooltip("Convert an object to a JSON string.");
  }
};

Blockly.JavaScript['js_json_stringify'] = function (block) {
  const obj = block.getFieldValue("OBJECT")
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
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(),"ELEMENT")
      .appendField(".innerHTML =")
      .appendField(new Blockly.FieldTextInput(),"HTML")
   
    this.setOutput(true)
    this.setColour('#F85E00');
    this.setTooltip("Set innerHTML of an element.");
  }
};

Blockly.JavaScript['js_set_innerhtml'] = function (block) {
  const element = block.getFieldValue('ELEMENT')
  const html = block.getFieldValue("HTML")
  return `${element}.innerHTML = ${html};\n`;
};

// 4. element.setAttribute("attr", "value")
Blockly.Blocks['js_set_attribute'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(new Blockly.FieldTextInput(),"ELEMENT")
    .appendField(".setAttribute(")
    .appendField(new Blockly.FieldTextInput(),"ATTR")
    .appendField(",")
    .appendField(new Blockly.FieldTextInput(),"VALUE")
    .appendField(")");
    this.setOutput(true)
    this.setColour('#F85E00');
    this.setTooltip("Set attribute on a DOM element.");
  }
};

Blockly.JavaScript['js_set_attribute'] = function (block) {
  const element = block.getFieldValue('ELEMENT')
  const attr = block.getFieldValue("ATTR")
  const value=block.getFieldValue("VALUE")
  return `${element}.setAttribute(${attr}, ${value});\n`;
};

// 5. element.classList.add("className")
Blockly.Blocks['js_add_class'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(new Blockly.FieldTextInput(),"ELEMENT")
    .appendField(".classList.add(")
    .appendField(new Blockly.FieldTextInput(),"CLASS")
    .appendField(")")
   this.setOutput(true)
    this.setColour('#F85E00');
    this.setTooltip("Add a CSS class.");
  }
};

Blockly.JavaScript['js_add_class'] = function (block) {
  const element = block.getFieldValue('ELEMENT')
  const className = block.getFieldValue("CLASS")
  return `${element}.classList.add(${className});\n`;
};

// 6. element.classList.remove("className")
Blockly.Blocks['js_remove_class'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(new Blockly.FieldTextInput(),"ELEMENT")
    .appendField(".classList.remove(")
    .appendField(new Blockly.FieldTextInput(),"CLASS")
    .appendField(")");
    this.setOutput(true)
    this.setColour('#F85E00');
    this.setTooltip("Remove a CSS class.");
  }
};

Blockly.JavaScript['js_remove_class'] = function (block) {
  const element = block.getFieldValue("ELEMENT");
  const className = block.getFieldValue("CLASS");
  return `${element}.classList.remove(${className});\n`;
};

// 7. element.classList.toggle("className")
Blockly.Blocks['js_toggle_class'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(new Blockly.FieldTextInput(),"ELEMENT")
    .appendField(".classList.toggle(")
    .appendField(new Blockly.FieldTextInput(),"CLASS")
    .appendField(")");
    this.setOutput(true)
    this.setColour('#F85E00');
    this.setTooltip("Toggle a CSS class.");
  }
};

Blockly.JavaScript['js_toggle_class'] = function (block) {
  const element = block.getFieldValue("ELEMENT");
  const className = block.getFieldValue("CLASS");
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
    this.appendStatementInput("BODY");
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
    this.appendValueInput("PROMISE").setCheck(null);
    this.appendDummyInput()
      .appendField(".then((")
      .appendField(new Blockly.FieldTextInput("result"), "VAR")
      .appendField(") => {");
    this.appendStatementInput("DO");
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
    this.appendDummyInput()
      .appendField("typeof(")
      .appendField(new Blockly.FieldTextInput(1), "VALUE")
      .appendField(")");
    this.setOutput(true, "String");
    this.setColour('#F85E00');
    this.setTooltip("Returns the type of a variable or expression.");
  }
};

Blockly.JavaScript['js_typeof'] = function (block) {
  const value = block.getFieldValue('VALUE');
  return [`typeof ${value}`, Blockly.JavaScript.ORDER_TYPEOF];
};

Blockly.Blocks['js_parse_int'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("parseInt(")
      .appendField(new Blockly.FieldTextInput(1), "VALUE")
      .appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Converts a string to an integer.");
  }
};

Blockly.JavaScript['js_parse_int'] = function (block) {
  const value = block.getFieldValue('VALUE');
  return [`parseInt(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_parse_float'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("parseFloat(")
      .appendField(new Blockly.FieldTextInput(1), "VALUE")
      .appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Converts a string to a floating point number.");
  }
};

Blockly.JavaScript['js_parse_float'] = function (block) {
  const value = block.getFieldValue('VALUE');
  return [`parseFloat(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['js_to_string'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("")
      .appendField(new Blockly.FieldTextInput(""), "VALUE")
      .appendField(".toString()");
    this.setOutput(true, "String");
    this.setColour('#F85E00');
    this.setTooltip("Converts a number or object to a string.");
  }
};

Blockly.JavaScript['js_to_string'] = function (block) {
  const value = block.getFieldValue('VALUE');
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
    this.appendDummyInput()
      .appendField("Math.floor(")
      .appendField(new Blockly.FieldTextInput(1), "VALUE")
      .appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Rounds a number down to the nearest integer.");
  }
};

Blockly.JavaScript['js_math_floor'] = function (block) {
  const value = block.getFieldValue('VALUE');
  return [`Math.floor(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['js_math_ceil'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Math.ceil(")
      .appendField(new Blockly.FieldTextInput(1), "VALUE")
      .appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Rounds a number up to the nearest integer.");
  }
};

Blockly.JavaScript['js_math_ceil'] = function (block) {
  const value = block.getFieldValue('VALUE');
  return [`Math.ceil(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['js_math_round'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Math.round(")
      .appendField(new Blockly.FieldTextInput(1), "VALUE")
      .appendField(")")
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Rounds a number to the nearest integer.");
  }
};

Blockly.JavaScript['js_math_round'] = function (block) {
  const value = block.getFieldValue('VALUE');
  return [`Math.round(${value})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['js_math_pow'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Math.pow(")
      .appendField(new Blockly.FieldTextInput(1), "BASE")
      .appendField(",")
      .appendField(new Blockly.FieldTextInput(1), "EXPONENT")
      .appendField(")");
    this.setOutput(true, "Number");
    this.setColour('#F85E00');
    this.setTooltip("Returns base to the power of exponent.");
  }
};

Blockly.JavaScript['js_math_pow'] = function (block) {
  const base = block.getFieldValue('BASE');
  const exponent = block.getFieldValue('EXPONENT');
  return [`Math.pow(${base}, ${exponent})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
