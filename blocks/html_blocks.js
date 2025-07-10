// blocks/html_blocks.js


// <!DOCTYPE html>
Blockly.Blocks['html_doctype'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<!DOCTYPE html>");

    this.setNextStatement(true);
    this.setColour('#0ACDFF');
    this.setTooltip("Declare the document as HTML5");
    this.setHelpUrl("https://www.w3schools.com/tags/tag_doctype.asp");
  }
};

Blockly.JavaScript['html_doctype'] = function (block) {
  return '<!DOCTYPE html>\n';
};

// HTML <html> block
Blockly.Blocks['html_html'] = {
  init: function () {
    // Opening tag: <html>
    this.appendDummyInput()
      .appendField('<html>')

    // Statement input for nested blocks inside the <html> tag
    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField("");

    // Closing tag: </html>
    this.appendDummyInput()
      .appendField("</html>")

    this.setPreviousStatement(true);

    this.setColour('0ACDFF');  // Set block color
    this.setTooltip("Head section.");  // Tooltip for guidance
    this.setHelpUrl("");  // URL for help (optional)
  }
};

Blockly.JavaScript['html_html'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var code = '<html>\n' + content + '\n</html>';
  return code;
};

// HTML <head> block
Blockly.Blocks['html_head'] = {
  init: function () {
    // Opening tag: <head>
    this.appendDummyInput()
      .appendField('<head>')

    // Statement input for nested blocks inside the <head> tag
    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField("");

    // Closing tag: </head>
    this.appendDummyInput()
      .appendField("</head>")

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour('0ACDFF');  // Set block color
    this.setTooltip("HTML");  // Tooltip for guidance
    this.setHelpUrl("");  // URL for help (optional)
  }
};


Blockly.JavaScript['html_head'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var code = '<head>\n' + content + '\n</head>\n';
  return code;
};

// HTML <body> block
Blockly.Blocks['html_body'] = {
  init: function () {
    // Opening tag: <body>
    this.appendDummyInput()
      .appendField('<body')

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    // Closing tag: </body>
    this.appendDummyInput()
      .appendField("</body>")

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour('0ACDFF');  // Set block color
    this.setTooltip("Body section.");  // Tooltip for guidance
    this.setHelpUrl("");  // URL for help (optional)
  }

};

Blockly.JavaScript['html_body'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces

  attributes = attributes.trim();
  var code = `<body ${attributes}>\n  ${content}  \n</body>`;
  return code;
};

// HTML <h1> to <h6> block with input for heading text
Blockly.Blocks['html_heading'] = {
  init: function () {
    // Dropdown to select the heading level (h1 to h6)
    this.appendDummyInput()
      .appendField('<')
      .appendField(new Blockly.FieldDropdown([
        ["h1", "h1"],
        ["h2", "h2"],
        ["h3", "h3"],
        ["h4", "h4"],
        ["h5", "h5"],
        ["h6", "h6"]
      ]), "HEADING_LEVEL");

    // Allow chaining multiple attributes (if needed)
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');


    // Automatically closing the selected heading tag
    this.appendDummyInput()
      .appendField("</")
      .appendField(new Blockly.FieldLabelSerializable(""), "HEADING_LEVEL_CLOSING")
      .appendField('>');

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour('0ACDFF');  // Set block color
    this.setTooltip("Heading element (h1 to h6).");
    this.setHelpUrl("");
  },
  onchange: function () {
    // Synchronize the closing tag with the heading level
    var headingLevel = this.getFieldValue('HEADING_LEVEL');
    this.getField('HEADING_LEVEL_CLOSING').setValue(headingLevel);
  }
};

// JavaScript code generation for the heading block
Blockly.JavaScript['html_heading'] = function (block) {
  var headingLevel = block.getFieldValue('HEADING_LEVEL');  // Get the selected heading level

  // Get the content 
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT').trim();

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  // Generate the HTML for the heading element with the entered text
  var code = `<${headingLevel} ${attributes}>${content}</${headingLevel}>\n`;
  return code;
};


Blockly.Blocks['html_p'] = {
  init: function () {
    
    this.appendDummyInput()
      .appendField('<p')

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</p>");

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour("0ACDFF");  // Set block color
    this.setTooltip("Paragraph element.");  // Tooltip for guidance
    this.setHelpUrl("");  // URL for help (optional)
  }
};

// Code generation for the paragraph tag
Blockly.JavaScript['html_p'] = function (block) {
  // Get all connected attributes and trim trailing spaces
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();

  // Get the content 
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  // Generate the HTML with the content and attributes
  var code = `<p ${attributes}>\n${content}\n</p>\n`;
  return code;
};


// Button <button> block
Blockly.Blocks['html_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('<button')

    // Add first attribute input
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    // Add a dummy input for the plus sign
    this.appendDummyInput("ADD_MORE_INPUT")
      .appendField('>');

    // Add content input
    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField(new Blockly.FieldTextInput('Click me!'), 'TEXT');

    // Closing tag
    this.appendDummyInput()
      .appendField("</")
      .appendField(new Blockly.FieldLabelSerializable("button"), "BUTTON_CLOSING")
      .appendField('>');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip('Button element');
    this.setHelpUrl('');

  },

};

// JavaScript generator for the button block
Blockly.JavaScript['html_button'] = function (block) {
  var buttonText = block.getFieldValue('TEXT');

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  // Create the opening <button> tag with attributes and text
  var code = `<button ${attributes}>${buttonText}`;

  // Get the content between the button tags
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT') || '';
  code += content;

  // Close the button tag
  code += '</button>\n';

  return code;
};



// Anchor <a> block
Blockly.Blocks['html_a'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<a")

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField(new Blockly.FieldTextInput("Link text"), "TEXT")

    this.appendDummyInput()
      .appendField("</a>");

    this.setPreviousStatement(true, null);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A hyperlink.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['html_a'] = function (block) {
  var url = block.getFieldValue('URL');
  var text = block.getFieldValue('TEXT');

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  var code = `<a ${attributes}>${text}</a>\n`;
  return code;
};



// Image <img> block
Blockly.Blocks['html_img'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<img")

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>')

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("An image.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['html_img'] = function (block) {
  var src = block.getFieldValue('SRC');
  var alt = block.getFieldValue('ALT');

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  var code = `<img ${attributes}>`;
  return code;
};


// Block for <table> tag
Blockly.Blocks['html_table'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<table") // Label the block as a Table

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</table>"); // Closing tag label
    this.setPreviousStatement(true, null); // Can connect to previous blocks
    this.setNextStatement(true, null); // Can connect to the next blocks
    this.setColour('0ACDFF'); // Set block color
    this.setTooltip("Creates a table in HTML."); // Tooltip
    this.setHelpUrl(""); // Help URL if needed
  }
};

// Generator for <table> block
Blockly.JavaScript['html_table'] = function (block) {
  var rows = Blockly.JavaScript.statementToCode(block, 'CONTENT'); // Collect rows (tr) inside the table

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  var code = `<table ${attributes}>\n ${rows} </table>\n`; // Generate the table with rows
  return code;
};

Blockly.Blocks['html_caption'] = {
  init: function () {
    // Opening tag and attributes input
    this.appendDummyInput()
      .appendField('<caption');

    // Add a value input for the attributes field
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField(' '); // Placeholder for attributes

    this.appendDummyInput()
      .appendField('>')
      .appendField(new Blockly.FieldTextInput('data'), 'CONTENT') // Direct content text input
      .appendField('</caption>');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip('Table caption');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['html_caption'] = function (block) {
  // Get the content from the field text input (typed text)
  var content = block.getFieldValue('CONTENT') || ''; // Retrieve field content using getFieldValue

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  // Generate the HTML code for the <td> with the typed content
  var code = `<caption ${attributes}>${content}</caption>`;
  return code;
};


Blockly.Blocks['html_th'] = {
  init: function () {
    // Opening tag and attributes input
    this.appendDummyInput()
      .appendField('<th');

    // Add a value input for the attributes field
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField(' '); // Placeholder for attributes

    this.appendDummyInput()
      .appendField('>')
      .appendField(new Blockly.FieldTextInput('data'), 'CONTENT') // Direct content text input
      .appendField('</th>');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip('Table heading.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['html_th'] = function (block) {
  // Get the content from the field text input (typed text)
  var content = block.getFieldValue('CONTENT') || ''; // Retrieve field content using getFieldValue

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  // Generate the HTML code for the <td> with the typed content
  var code = `<th ${attributes}>${content}</th>`;
  return code;
};


// Table row <tr> block
Blockly.Blocks['html_tr'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<tr")

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</tr>"); // Closing tag label
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A table row.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['html_tr'] = function (block) {
  var cells = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();
  var code = `<tr ${attributes}>\n ${cells} </tr>\n`;
  return code;
};


Blockly.Blocks['html_td'] = {
  init: function () {
    // Opening tag and attributes input
    this.appendDummyInput()
      .appendField('<td');

    // Add a value input for the attributes field
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField(' '); // Placeholder for attributes

    this.appendDummyInput()
      .appendField('>')
      .appendField(new Blockly.FieldTextInput('data'), 'CONTENT') // Direct content text input
      .appendField('</td>');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip('Table cell element with optional attributes.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['html_td'] = function (block) {
  // Get the content from the field text input (typed text)
  var content = block.getFieldValue('CONTENT') || ''; // Retrieve field content using getFieldValue

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  // Generate the HTML code for the <td> with the typed content
  var code = `<td ${attributes}>${content}</td>`;
  return code;
};


// Define the script block
Blockly.Blocks['html_script'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<script"); // Label for the script block

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>')


    this.appendStatementInput("SCRIPT") // Allow blocks to be added inside
      .setCheck(null); // Accept any type of blocks

    this.appendDummyInput()
      .appendField("</script>"); // Close the script block

    this.setColour('#0ACDFF'); // Set block color
    this.setTooltip("A block for including JavaScript code."); // Tooltip
    this.setHelpUrl(); // Help URL
    this.setPreviousStatement(true); // Allow previous connection
    this.setNextStatement(true); // Allow next connection
  }
};

// Generate JavaScript code for the script block
Blockly.JavaScript['html_script'] = function (block) {
  var statements_script = Blockly.JavaScript.statementToCode(block, 'SCRIPT'); // Get the statements inside the block

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  var code = `<script ${attributes}>\n${statements_script}</script>\n`; // Wrap the code in script tags
  return code; // Return the code to be included in the generated script
};

Blockly.Blocks['html_div'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<div")

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</div>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("Defines a div element with optional attributes, content, and styles.");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['html_div'] = function (block) {

  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();
  // Create the final HTML code
  var code = `<div ${attributes}>\n${content || ''}\n</div>\n`;

  return code;
};


// Block for <br> tag in HTML
Blockly.Blocks['html_br'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<br>"); // Label for the <br> tag
    this.setPreviousStatement(true, null); // Allow connecting to previous blocks
    this.setNextStatement(true, null); // Allow connecting to next blocks
    this.setColour('0ACDFF'); // Set block color
    this.setTooltip("Inserts a <br> tag for a line break in HTML."); // Tooltip for the block
    this.setHelpUrl(""); // Help URL if needed
  }
};

Blockly.JavaScript['html_br'] = function (block) {
  // Generates the <br> HTML tag
  return '<br>\n'; // Newline after <br> for better formatting
};



//Block for <hr> tag in HTML
Blockly.Blocks['html_hr'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<hr>")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    this.setColour('0ACDFF')
    this.setTooltip("Creates a horizontal rule (<hr>) in HTML.");
    this.setHelpUrl(""); // Help URL if needed
  }
}

Blockly.JavaScript['html_hr'] = function (block) {
  return '<hr>\n'; // Newline after <hr> for better
}
// Block for <ul> (unordered list) tag
Blockly.Blocks['html_ul'] = {
  init: function () {

    this.appendDummyInput()
      .appendField("<ul"); // Label the block

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("ITEMS") // Allow multiple <li> blocks
      .setCheck(null) // Allow any content inside <ul>

    this.appendDummyInput()
      .appendField("</ul>"); // Label the block
    this.setPreviousStatement(true, null); // Can connect to previous blocks
    this.setNextStatement(true, null); // Can connect to the next blocks
    this.setColour('0ACDFF'); // Set block color
    this.setTooltip("Creates an unordered list (<ul>) in HTML."); // Tooltip
    this.setHelpUrl(""); // Help URL if needed
  }
};

// Generator for <ul> block
Blockly.JavaScript['html_ul'] = function (block) {
  var items = Blockly.JavaScript.statementToCode(block, 'ITEMS'); // Collect <li> items

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  var code = `<ul ${attributes}>\n ${items} </ul>\n`; // Generate the unordered list with items
  return code;
};

// Block for <li> (list item) tag
Blockly.Blocks['html_li'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<li") // Opening tag label

    // Add a value input for the attributes field
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField(' '); // Placeholder for attributes

    this.appendDummyInput()
        .appendField('>'); // Closing tag for opening <li>

    this.appendStatementInput("CONTENT")
         .setCheck(null)
         .appendField('');

    this.setPreviousStatement(true, null); // Can connect to previous blocks
    this.setNextStatement(true, null); // Can connect to next blocks
    this.setColour('0ACDFF'); // Set block color
    this.setTooltip("Defines a list item (<li>) with editable content."); // Tooltip
    this.setHelpUrl(""); // Help URL if needed
  }
};

// Generator for <li> block
Blockly.JavaScript['html_li'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  var code = `<li ${attributes}>\n${content}\n</li>\n`; // Generate the <li> tag with content and attributes

  return code;
};

// Block for <ol> (ordered list) tag
Blockly.Blocks['html_ol'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<ol"); // Label the block

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("ITEMS") // Allow multiple <li> blocks
      .setCheck(null) // Allow any content inside <ol>

    this.appendDummyInput()
      .appendField("</ol>"); // Label the block
    this.setPreviousStatement(true, null); // Can connect to previous blocks
    this.setNextStatement(true, null); // Can connect to the next blocks
    this.setColour('0ACDFF'); // Set block color
    this.setTooltip("Creates an ordered list (<ol>) in HTML."); // Tooltip
    this.setHelpUrl(""); // Help URL if needed
  }
};

// Generator for <ol> block
Blockly.JavaScript['html_ol'] = function (block) {
  var items = Blockly.JavaScript.statementToCode(block, 'ITEMS'); // Collect <li> items

  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();

  var code = `<ol ${attributes}>\n${items} </ol>\n`; // Generate the ordered list with items

  return code;
};

// Link tag block
Blockly.Blocks['html_link'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<link") // Opening tag for link
      .appendField("rel=")
      .appendField(new Blockly.FieldDropdown([
        ["stylesheet", "stylesheet"],
        ["icon", "icon"],
        ["preload", "preload"],
        ["alternate", "alternate"]
      ]), "REL")
      .appendField("href=")
      .appendField(new Blockly.FieldTextInput("style.css"), "HREF")
      .appendField("type=")
      .appendField(new Blockly.FieldTextInput("text/css"), "TYPE")
      .appendField("media=")
      .appendField(new Blockly.FieldTextInput("all"), "MEDIA")
      .appendField("/>"); // Self-closing tag for <link>

    this.setPreviousStatement(true, null); // Allows this block to connect to previous blocks
    this.setNextStatement(true, null); // Allows connection to subsequent blocks
    this.setColour('#0ACDFF');
    this.setTooltip("Defines a link to an external resource (e.g., CSS).");
    this.setHelpUrl("");
  }
};

// JavaScript generator for the link tag
Blockly.JavaScript['html_link'] = function (block) {
  var rel = block.getFieldValue('REL');
  var href = block.getFieldValue('HREF');
  var type = block.getFieldValue('TYPE');
  var media = block.getFieldValue('MEDIA');

  var code = `<link rel="${rel}" href="${href}" type="${type}" media="${media}" />\n`;
  return code;
};


// Table row <tr> block
Blockly.Blocks['html_tr'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<tr>")

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("")

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</tr>"); // Closing tag label
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A table row.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['html_tr'] = function (block) {
  var cells = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  // Get all connected attributes, properly handling chains
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Concatenate attributes and remove trailing spaces
  attributes = attributes.trim();
  var code = `<tr $>\n ${cells} </tr>\n`;
  return code;
};



Blockly.Blocks['plain_text'] = {
  init: function () {


    this.appendDummyInput()
      .appendField('')
      .appendField(new Blockly.FieldTextInput('text'), 'CONTENT') // Direct content text input
      .appendField('');

    this.setPreviousStatement(true)
    this.setNextStatement(true)


    this.setColour("0ACDFF");
    this.setTooltip("Plain text block for adding unformatted text.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['plain_text'] = function (block) {

  var text = block.getFieldValue('CONTENT');
  var code = text
  return code
};

Blockly.Blocks['strong'] = {
  init: function () {
    // Opening tag: <body>
    this.appendDummyInput()
      .appendField('<strong>')

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</strong>");

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour("0ACDFF");
    this.setTooltip("Strong.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['strong'] = function (block) {
  // Get the content 
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  var code = `<strong>${content}</strong>`;
  return code; // Use ORDER_ATOMIC
};

Blockly.Blocks['bold_text'] = {
  init: function () {
   
    this.appendDummyInput()
      .appendField('<b>')

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</b>");

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour("0ACDFF");
    this.setTooltip("Bold Text.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['bold_text'] = function (block) {
  // Get the content 
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  var code = `<b>${content}</b>`;
  return code; // Use ORDER_ATOMIC
};
Blockly.Blocks['underline'] = {
  init: function () {
   
    this.appendDummyInput()
      .appendField('<u>')

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</u>");

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour("0ACDFF");
    this.setTooltip("Underline Text.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['underline'] = function (block) {
  // Get the content 
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  var code = `<u>${content}</u>`;
  return code; // Use ORDER_ATOMIC
};

Blockly.Blocks['italic'] = {
  init: function () {
   
    this.appendDummyInput()
      .appendField('<i>')

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</i>");

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour("0ACDFF");
    this.setTooltip("Italic Text.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['italic'] = function (block) {
  // Get the content 
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  var code = `<i>${content}</i>`;
  return code; // Use ORDER_ATOMIC
};
Blockly.Blocks['emphasized'] = {
  init: function () {
   
    this.appendDummyInput()
      .appendField('<em>')

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</em>");

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour("0ACDFF");
    this.setTooltip("Emphasized Text.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['emphasized'] = function (block) {
  // Get the content 
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  var code = `<em>${content}</em>`;
  return code; 
};

Blockly.Blocks['span'] = {
  init: function () {
    // Opening tag: <body>
    this.appendDummyInput()
      .appendField('<span')

     // Single attributes input for chaining multiple attribute blocks
     this.appendValueInput("ATTRIBUTES")
     .setCheck('String')
     .appendField(" ")

     this.appendDummyInput()
     .appendField('>');


    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</span>");

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below

    this.setColour("0ACDFF");
    this.setTooltip("span");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['span'] = function (block) {
   // Get all connected attributes and trim trailing spaces
   var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
   attributes = attributes.trim();
  // Get the content 
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');

  var code = `<span ${attributes}>${content}</span>`;
  return code; // Use ORDER_ATOMIC
};


// Style content block
Blockly.Blocks['html_style'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('<style>')


    // Statement input for nested blocks inside the <head> tag
    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField("");

    // Closing tag: </style>
    this.appendDummyInput()
      .appendField("</style>")

    // Allow the block to connect to other blocks
    this.setPreviousStatement(true, null);  // Connection from above
    this.setNextStatement(true, null);  // Connection below 


    this.setColour('0ACDFF');
    this.setTooltip("Creates a <style> tag with CSS rules.");
    this.setHelpUrl("");
  }
};

// JavaScript code generation for style content
Blockly.JavaScript['html_style'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var code = '<style>\n' + content + '\n</style>\n';
  return code;
};

// Header block
Blockly.Blocks['html_header'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<header>");  // Opening tag label

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</header>"); // Closing tag label

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A header section.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header");
  }
};

// JavaScript code generation for header
Blockly.JavaScript['html_header'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  attributes = attributes.trim();
  var code = `<header ${attributes}>\n${content}</header>\n`;
  return code;
};

// Footer block
Blockly.Blocks['html_footer'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<footer>");  // Opening tag label

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</footer>"); // Closing tag label

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A footer section.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer");
  }
};



// JavaScript code generation for footer
Blockly.JavaScript['html_footer'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  attributes = attributes.trim();
  var code = `<footer ${attributes}>\n${content}</footer>\n`;
  return code;
};

// Nav block
Blockly.Blocks['html_nav'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<nav>");  // Opening tag label

    // Single attributes input for chaining multiple attribute blocks
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</nav>"); // Closing tag label

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A navigation section.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav");
  }
};

// JavaScript code generation for nav
Blockly.JavaScript['html_nav'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  attributes = attributes.trim();
  var code = `<nav ${attributes}>\n${content}</nav>\n`;
  return code;
};

Blockly.Blocks['html_article'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<article>");

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</article>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("An article section.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article");
  }
};

Blockly.JavaScript['html_article'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<article ${attributes}>\n${content}</article>\n`;
  return code;
};

Blockly.Blocks['html_aside'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<aside>");

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</aside>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("An aside section.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside");
  }
};

Blockly.JavaScript['html_aside'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<aside ${attributes}>\n${content}</aside>\n`;
  return code;
};

Blockly.Blocks['html_div'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<div>");

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</div>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A division or container.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div");
  }
};

Blockly.JavaScript['html_div'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<div ${attributes}>\n${content}</div>\n`;
  return code;
};

Blockly.Blocks['html_form'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<form>");

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</form>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A form section.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form");
  }
};

Blockly.JavaScript['html_form'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<form ${attributes}>\n${content}</form>\n`;
  return code;
};

Blockly.Blocks['html_label'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('<label')

    // Allow chaining multiple attributes (if needed)
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput("")
      .appendField('>');

    // Keep the TEXT input as Value Input, but allow both plain text and formatted tags
    this.appendValueInput("TEXT")
      .setCheck("String") // Accepts plain text or formatted tags
      .appendField("");

    this.appendDummyInput()
      .appendField("</label>");


    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A label element, typically used to label form controls.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label");
  }
};

Blockly.JavaScript['html_label'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<label ${attributes}>\n${content}</label>\n`;
  return code;
};


Blockly.Blocks['html_input'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<input");

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("An input element.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input");
  }
};

Blockly.JavaScript['html_input'] = function (block) {
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<input ${attributes}>\n`;
  return code;
};

Blockly.Blocks['html_textarea'] = {
  init: function () {
    // Opening tag and attributes input
    this.appendDummyInput()
      .appendField('<textarea');

    // Add a value input for the attributes field
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField(' '); // Placeholder for attributes

    this.appendDummyInput()
      .appendField('>')
      .appendField(new Blockly.FieldTextInput('data'), 'CONTENT') // Direct content text input
      .appendField('</textarea>');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A textarea element.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea");
  }
};

Blockly.JavaScript['html_textarea'] = function (block) {
  var content = block.getFieldValue('CONTENT') || '';
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  attributes = attributes.trim();
  var code = `<textarea ${attributes}>${content}</textarea>\n`;
  return code;
};

Blockly.Blocks['html_select'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<select>");

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</select>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A select element.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select");
  }
};

Blockly.JavaScript['html_select'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<select ${attributes}>\n${content}</select>\n`;
  return code;
};

Blockly.Blocks['html_option'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('<option');

    // Add a value input for the attributes field
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField(' '); // Placeholder for attributes

    this.appendDummyInput()
      .appendField('>')
      .appendField(new Blockly.FieldTextInput('data'), 'CONTENT') // Direct content text input
      .appendField('</option>');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("An option element.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option");
  }
};

Blockly.JavaScript['html_option'] = function (block) {
  // Get the content from the field text input (typed text)
  var content = block.getFieldValue('CONTENT') || ''; // Retrieve field content using getFieldValue

  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<option ${attributes}>${content}</option>\n`;
  return code;
};

Blockly.Blocks['html_audio'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<audio>");

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</audio>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("An audio element.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio");
  }
};

Blockly.JavaScript['html_audio'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<audio ${attributes}>\n${content}</audio>\n`;
  return code;
};

Blockly.Blocks['html_video'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<video>");

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</video>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A video element.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video");
  }
};

Blockly.JavaScript['html_video'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<video ${attributes}>\n${content}</video>\n`;
  return code;
};

Blockly.Blocks['html_iframe'] = {
  init: function () {

    this.appendDummyInput()
      .appendField('<iframe')

    // Allow chaining multiple attributes (if needed)
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput("")
      .appendField('> </iframe>');


    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("An iframe element.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe");
  }
};

Blockly.JavaScript['html_iframe'] = function (block) {
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<iframe ${attributes}></iframe>\n`;
  return code;
};

Blockly.Blocks['html_source'] = {
  init: function () {

    this.appendDummyInput()
      .appendField('<source')

    // Allow chaining multiple attributes (if needed)
    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput("")
      .appendField('> </source>');


    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A source element.");

  }
};

Blockly.JavaScript['html_source'] = function (block) {
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<source ${attributes}></source>\n`;
  return code;
};

Blockly.Blocks['html_datalist'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("<datalist>");

    this.appendValueInput("ATTRIBUTES")
      .setCheck('String')
      .appendField("");

    this.appendDummyInput()
      .appendField('>');

    this.appendStatementInput("CONTENT")
      .setCheck(null)
      .appendField('');

    this.appendDummyInput()
      .appendField("</datalist>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('0ACDFF');
    this.setTooltip("A datalist element.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist");
  }
};

Blockly.JavaScript['html_datalist'] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC) || '';
  attributes = attributes.trim();
  var code = `<datalist ${attributes}>\n${content}</datalist>\n`;
  return code;
};