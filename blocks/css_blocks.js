// css_blocks.js
//Adding a ; at the beginning of each css property helps to separate attribute from css property.
//Adding a | at the end of each css property helps to know the end of each css property.

// CSS Selector
Blockly.Blocks['css_rule'] = {
  init: function() {
    // Initial input for the selector
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('selector'), 'SELECTOR')  // CSS Selector
        .appendField('{');

    // Input for chaining multiple style properties
    this.appendValueInput('PROPERTIES')
        .setCheck(null);  // Allow any style properties to be chained

    this.appendDummyInput()
        .appendField('}');  // Closing brace

    // Block settings
    this.setPreviousStatement(true, null);  // Allows this block to connect to others
    this.setNextStatement(true, null);  // Allows chaining more blocks after this
    this.setColour('#A5BE00');  // Set block color
    this.setTooltip('Defines a CSS rule with a selector and properties.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['css_rule'] = function(block) {
  // Get the selector (e.g., '.class' or '#id')
  var selector = block.getFieldValue('SELECTOR');

  // Retrieve the chain of style properties (chained blocks)
  var properties = Blockly.JavaScript.valueToCode(block, 'PROPERTIES', Blockly.JavaScript.ORDER_ATOMIC) || '';

  // Generate the full CSS rule
  properties = properties.replaceAll(';','')
  properties=properties.split('|')
  properties = properties.map(property => property.trim()).filter(property => property.length > 0).join(';\n')

  var code = `${selector} {\n${properties.trim()}\n}\n`;
  
  return code;
};


// Block for setting the color style
Blockly.Blocks['css_color'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null)
        .appendField("color:")
        .appendField(new Blockly.FieldTextInput('red'), 'COLOR');
    this.setOutput(true, 'String');
    this.setColour('#A5BE00');
    this.setTooltip('Sets the color style property.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['css_color'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var color = block.getFieldValue('COLOR');
  var code = leftCode + `;color: ${color}| `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Background color block
Blockly.Blocks['css_background_color'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')
        .setCheck(null)  // Allows any type of input
        .appendField("background-color:")
        .appendField(new Blockly.FieldTextInput(''), 'COLOR');  // Text input for color value

    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');
    this.setTooltip("Set a background color property.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_background_color'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var colorValue = block.getFieldValue('COLOR');
  var code = `${leftCode};background-color: ${colorValue}| `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Font size block
Blockly.Blocks['css_font_size'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)
        .appendField("font-size:")
        .appendField(new Blockly.FieldNumber(16), "SIZE")
        .appendField("px");
    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');
    this.setTooltip("Set the font size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_font_size'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var fontSize = block.getFieldValue('SIZE');
  var code = `${leftCode};font-size: ${fontSize}px|; `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Font weight block
Blockly.Blocks['css_font_weight'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)
        .appendField("font-weight:")
        .appendField(new Blockly.FieldDropdown([
          ["normal", "normal"],
          ["bold", "bold"],
          ["bolder", "bolder"],
          ["lighter", "lighter"],
          ["100", "100"],
          ["200", "200"],
          ["300", "300"],
          ["400", "400"],
          ["500", "500"],
          ["600", "600"],
          ["700", "700"],
          ["800", "800"],
          ["900", "900"]
        ]), "WEIGHT"); // Dropdown for font-weight values
    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');
    this.setTooltip("Set the font weight.");
    this.setHelpUrl("");
  }
};

// JavaScript code generation for font weight
Blockly.JavaScript['css_font_weight'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var fontWeight = block.getFieldValue('WEIGHT');
  var code = `${leftCode};font-weight: ${fontWeight}| `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


// Margin block
Blockly.Blocks['css_margin'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)  // Allows any type of input
        .appendField("margin:")
        .appendField(new Blockly.FieldTextInput('0'), 'MARGIN')  // Text input for margin value
        .appendField("px");

    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');
    this.setTooltip("Set the margin size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_margin'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var marginValue = block.getFieldValue('MARGIN');

  var code = `${leftCode};margin: ${marginValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Margin Left Block
Blockly.Blocks['css_margin_left'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')
        .setCheck(null)
        .appendField("margin-left:")
        .appendField(new Blockly.FieldTextInput('0'), 'MARGIN_LEFT')
        .appendField("px");

    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the left margin size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_margin_left'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var marginLeftValue = block.getFieldValue('MARGIN_LEFT');

  var code = `${leftCode};margin-left: ${marginLeftValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Margin Right Block
Blockly.Blocks['css_margin_right'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')
        .setCheck(null)
        .appendField("margin-right:")
        .appendField(new Blockly.FieldTextInput('0'), 'MARGIN_RIGHT')
        .appendField("px");

    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the right margin size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_margin_right'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var marginRightValue = block.getFieldValue('MARGIN_RIGHT');

  var code = `${leftCode};margin-right: ${marginRightValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Margin Top Block
Blockly.Blocks['css_margin_top'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')
        .setCheck(null)
        .appendField("margin-top:")
        .appendField(new Blockly.FieldTextInput('0'), 'MARGIN_TOP')
        .appendField("px");

    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the top margin size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_margin_top'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var marginTopValue = block.getFieldValue('MARGIN_TOP');

  var code = `${leftCode};margin-top: ${marginTopValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Margin Bottom Block
Blockly.Blocks['css_margin_bottom'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')
        .setCheck(null)
        .appendField("margin-bottom:")
        .appendField(new Blockly.FieldTextInput('0'), 'MARGIN_BOTTOM')
        .appendField("px");

    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the bottom margin size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_margin_bottom'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var marginBottomValue = block.getFieldValue('MARGIN_BOTTOM');

  var code = `${leftCode};margin-bottom: ${marginBottomValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


// Padding block
Blockly.Blocks['css_padding'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)  // Allows any type of input
        .appendField("padding:")
        .appendField(new Blockly.FieldTextInput('0'), 'PADDING')  // Text input for padding value
        .appendField("px");

    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');
    this.setTooltip("Set the padding size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_padding'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var paddingValue = block.getFieldValue('PADDING');

  var code = `${leftCode};padding: ${paddingValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Padding Left Block
Blockly.Blocks['css_padding_left'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')
        .setCheck(null)
        .appendField("padding-left:")
        .appendField(new Blockly.FieldTextInput('0'), 'PADDING_LEFT')
        .appendField("px");

    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the left padding size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_padding_left'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var paddingLeftValue = block.getFieldValue('PADDING_LEFT');

  var code = `${leftCode};padding-left: ${paddingLeftValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Padding Right Block
Blockly.Blocks['css_padding_right'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')
        .setCheck(null)
        .appendField("padding-right:")
        .appendField(new Blockly.FieldTextInput('0'), 'PADDING_RIGHT')
        .appendField("px");

    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the right padding size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_padding_right'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var paddingRightValue = block.getFieldValue('PADDING_RIGHT');

  var code = `${leftCode};padding-right: ${paddingRightValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Padding Top Block
Blockly.Blocks['css_padding_top'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')
        .setCheck(null)
        .appendField("padding-top:")
        .appendField(new Blockly.FieldTextInput('0'), 'PADDING_TOP')
        .appendField("px");

    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the top padding size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_padding_top'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var paddingTopValue = block.getFieldValue('PADDING_TOP');

  var code = `${leftCode};padding-top: ${paddingTopValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Padding Bottom Block
Blockly.Blocks['css_padding_bottom'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')
        .setCheck(null)
        .appendField("padding-bottom:")
        .appendField(new Blockly.FieldTextInput('0'), 'PADDING_BOTTOM')
        .appendField("px");

    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the bottom padding size in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_padding_bottom'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var paddingBottomValue = block.getFieldValue('PADDING_BOTTOM');

  var code = `${leftCode};padding-bottom: ${paddingBottomValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Width block
Blockly.Blocks['css_width'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)  // Allows any type of input
        .appendField("width:")
        .appendField(new Blockly.FieldTextInput('100'), 'WIDTH')  // Text input for width value
        .appendField("px");

    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');
    this.setTooltip("Set the width in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_width'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var widthValue = block.getFieldValue('WIDTH');

  var code = `${leftCode};width: ${widthValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Height block
Blockly.Blocks['css_height'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)  // Allows any type of input
        .appendField("height:")
        .appendField(new Blockly.FieldTextInput('100'), 'HEIGHT')  // Text input for height value
        .appendField("px");

    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');
    this.setTooltip("Set the height in pixels.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_height'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var heightValue = block.getFieldValue('HEIGHT');

  var code = `${leftCode};height: ${heightValue}px| `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_border'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
    .setCheck(null)
    .appendField("border:")
    .appendField(new Blockly.FieldTextInput('1px solid black'), 'BORDER');
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the border style.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_border'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var borderValue = block.getFieldValue('BORDER');
  var code = `${leftCode};border: ${borderValue}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


// Display block
Blockly.Blocks['css_display'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)
        .appendField("display:")
        .appendField(new Blockly.FieldDropdown([
            ["block", "block"],
            ["inline", "inline"],
            ["flex", "flex"],
            ["grid", "grid"],
            ["none", "none"]
        ]), "DISPLAY_TYPE");
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the display property.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_display'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var displayType = block.getFieldValue('DISPLAY_TYPE');
  var code = `${leftCode};display: ${displayType}| `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Position block
Blockly.Blocks['css_position'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)
        .appendField("position:")
        .appendField(new Blockly.FieldDropdown([
            ["static", "static"],
            ["relative", "relative"],
            ["absolute", "absolute"],
            ["fixed", "fixed"],
            ["sticky", "sticky"]
        ]), "POSITION_TYPE");
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the position property.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_position'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var positionType = block.getFieldValue('POSITION_TYPE');
  var code = `${leftCode};position: ${positionType}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_z_index'] = {
  init: function() {
      this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null)
        .appendField("z-index:")
        .appendField(new Blockly.FieldTextInput(1), 'Z_INDEX');
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the z-index value.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_z_index'] = function(block) {

  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';

  var zIndexValue = block.getFieldValue('Z_INDEX');
  var code = `${leftCode};z-index: ${zIndexValue}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


// Text Decoration Block
Blockly.Blocks['css_text_decoration'] = {
  init: function() {
    // Main text decoration dropdown
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)  // Allows any type of input
        .appendField("text-decoration:")
        .appendField(new Blockly.FieldDropdown([
            ["none", "none"],
            ["underline", "underline"],
            ["overline", "overline"],
            ["line-through", "line-through"]
        ]), 'DECORATION_TYPE');  // Dropdown for the text-decoration type

 

    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');  // Set block color
    this.setTooltip("Set the text decoration with optional style, color, and thickness.");
    this.setHelpUrl("");
  }
};


Blockly.JavaScript['css_text_decoration'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';

  var decorationType = block.getFieldValue('DECORATION_TYPE');

  // Generate CSS code for text-decoration properties
  var code = `${leftCode};text-decoration: ${decorationType}|\n`;
 

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Font Family Block
Blockly.Blocks['css_font_family'] = {
  init: function() {
    // Dropdown for predefined font families
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)  // Allows any type of input
        .appendField("font-family:")
        .appendField(new Blockly.FieldDropdown([
            ["Arial", "Arial"],
            ["Verdana", "Verdana"],
            ["Georgia", "Georgia"],
            ["Times New Roman", "Times New Roman"],
            ["Courier New", "Courier New"],
            ["Century Gothic", "Century Gothic"],
            ["Tahoma", "Tahoma"],
            ["Impact", "Impact"],

        ]), 'FONT_FAMILY');  // Dropdown for font-family selection
    
  

    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');  // Set block color
    this.setTooltip("Set the font-family.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_font_family'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';

  var fontFamily = block.getFieldValue('FONT_FAMILY');

  // Use the custom font if "Custom" is selected, otherwise use the predefined option
  var finalFontFamily = fontFamily

  var code = `${leftCode};font-family: ${finalFontFamily}| `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// List style type block
Blockly.Blocks['css_list_style_type'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)
        .appendField("list-style-type:")
        .appendField(new Blockly.FieldDropdown([
          ["none", "none"],
          ["disc", "disc"],
          ["circle", "circle"],
          ["square", "square"],
          ["decimal", "decimal"],
          ["lower-alpha", "lower-alpha"],
          ["upper-alpha", "upper-alpha"],
          ["lower-roman", "lower-roman"],
          ["upper-roman", "upper-roman"],
          ["inherit", "inherit"],
          ["initial", "initial"],
          ["unset", "unset"]
        ]), "STYLE_TYPE"); // Dropdown for list-style-type values
    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');
    this.setTooltip("Set the list style type.");
    this.setHelpUrl("");
  }
};

// JavaScript code generation for list style type
Blockly.JavaScript['css_list_style_type'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var listStyleType = block.getFieldValue('STYLE_TYPE');
  var code = `${leftCode};list-style-type: ${listStyleType}| `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Text-align block
Blockly.Blocks['css_text_align'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)
        .appendField("text-align:")
        .appendField(new Blockly.FieldDropdown([
          ["left", "left"],
          ["right", "right"],
          ["center", "center"],
          ["justify", "justify"]
        ]), "ALIGN");  // Dropdown for text-align values
    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');  // Customize block color
    this.setTooltip("Set the text alignment of the element.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/CSS/text-align");
  }
};

// JavaScript code generation for text-align
Blockly.JavaScript['css_text_align'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var alignment = block.getFieldValue('ALIGN');
  var code = `${leftCode};text-align: ${alignment}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_letter_spacing'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null)
        .appendField("letter-spacing:")
        .appendField(new Blockly.FieldTextInput('0'), 'LETTER_SPACING')
        .appendField("px");
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the letter spacing.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_letter_spacing'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var letterSpacingValue = block.getFieldValue('LETTER_SPACING');
  var code = `${leftCode};letter-spacing: ${letterSpacingValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_word_spacing'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null)
        .appendField("word-spacing:")
        .appendField(new Blockly.FieldTextInput('0'), 'WORD_SPACING')
        .appendField("px");
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the word spacing.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_word_spacing'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var wordSpacingValue = block.getFieldValue('WORD_SPACING');
  var code = `${leftCode};word-spacing: ${wordSpacingValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_text_transform'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("text-transform:")
        .appendField(new Blockly.FieldDropdown([
          ["none", "none"], 
          ["uppercase", "uppercase"], 
          ["lowercase", "lowercase"], 
          ["capitalize", "capitalize"]
        ]), 'TEXT_TRANSFORM');
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the text transform property.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_text_transform'] = function(block) {
  var transformValue = block.getFieldValue('TEXT_TRANSFORM');
  var code = `;text-transform: ${transformValue}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Border-collapse block
Blockly.Blocks['css_border_collapse'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allows chaining on the left side
        .setCheck(null)
        .appendField("border-collapse:")
        .appendField(new Blockly.FieldDropdown([
          ["collapse", "collapse"],
          ["separate", "separate"]
        ]), "BORDER_COLLAPSE");  // Dropdown for border-collapse values
    this.setOutput(true, "String");  // Set output type
    this.setColour('#A5BE00');  // Customize block color
    this.setTooltip("Set the border collapse behavior for table elements.");
    this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse");
  }
};

// JavaScript code generation for border-collapse
Blockly.JavaScript['css_border_collapse'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var borderCollapse = block.getFieldValue('BORDER_COLLAPSE');
  var code = `${leftCode};border-collapse: ${borderCollapse}| `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_transition'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null)
        .appendField("transition:")
        .appendField(new Blockly.FieldTextInput('all 0.3s ease'), 'TRANSITION');
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the transition property.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_transition'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var transitionValue = block.getFieldValue('TRANSITION');
  var code = `${leftCode};transition: ${transitionValue}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_transform'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null)
        .appendField("transform:")
        .appendField(new Blockly.FieldTextInput('rotate(45deg)'), 'TRANSFORM');
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the transform property.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_transform'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var transformValue = block.getFieldValue('TRANSFORM');
  var code = `${leftCode};transform: ${transformValue}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_box_shadow'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null)
        .appendField("box-shadow:")
        .appendField(new Blockly.FieldTextInput('2px 2px 5px black'), 'BOX_SHADOW');
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the box shadow.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_box_shadow'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var boxShadowValue = block.getFieldValue('BOX_SHADOW');
  var code = `${leftCode};box-shadow: ${boxShadowValue}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_text_shadow'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null)
        .appendField("text-shadow:")
        .appendField(new Blockly.FieldTextInput('2px 2px 5px black'), 'TEXT_SHADOW');
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the text shadow.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_text_shadow'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var textShadowValue = block.getFieldValue('TEXT_SHADOW');
  var code = `${leftCode};text-shadow: ${textShadowValue}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_text_shadow'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null) 
        .appendField("text-shadow:")
        .appendField(new Blockly.FieldTextInput('2px 2px 5px black'), 'TEXT_SHADOW');
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the text shadow.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_text_shadow'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var textShadowValue = block.getFieldValue('TEXT_SHADOW');
  var code = `${leftCode};text-shadow: ${textShadowValue}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_opacity'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null) 
        .appendField("opacity:")
        .appendField(new Blockly.FieldNumber(1, 0, 1, 0.1), 'OPACITY');
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the opacity.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_opacity'] = function(block) {
  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var opacityValue = block.getFieldValue('OPACITY');
  var code = `${leftCode};opacity: ${opacityValue}|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['css_border_radius'] = {
  init: function() {
    this.appendValueInput('LEFT_INPUT')  // Allow chaining on the left
        .setCheck(null)
        .appendField("border-radius:")
        .appendField(new Blockly.FieldTextInput('0'), 'BORDER_RADIUS')
        .appendField("px");
    this.setOutput(true, "String");
    this.setColour('#A5BE00');
    this.setTooltip("Set the border radius.");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['css_border_radius'] = function(block) {

  var leftCode = Blockly.JavaScript.valueToCode(block, 'LEFT_INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var borderRadiusValue = block.getFieldValue('BORDER_RADIUS');
  var code = `${leftCode};border-radius: ${borderRadiusValue}px|`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

