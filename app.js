// app.js

// Initialize the Blockly workspace
var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    trashcan: false,  // Hide the trashcan to prevent accidental deletion,
    theme: {
        'componentStyles': {
            'workspaceBackgroundColour': 'white',
            // 'toolboxBackgroundColour': '#fff',
            // 'toolboxForegroundColour': '#333',
            // 'flyoutBackgroundColour': '#fafafa',
            // 'scrollbarColour': '#999'
        }
    }
});

// Create a function to add or update the label block
function updateFileLabelBlock(fileName) {
    document.getElementById('current-filename').textContent = fileName;
}
 var isFlyoutOpen;

// Data structure to hold user-created files
var files = [];
var currentFileIndex = -1;

// Object to map filenames to their content for easy access
var userFiles = {};

// Function to add a new file
function addFile(name, type) {
    // Check if file already exists
    if (userFiles.hasOwnProperty(`${name}.${type}`)) {
        alert(`File "${name}.${type}" already exists.`);
        return;
    }

    // Initialize file content based on type
    var initialBlocks = '';

    // Create file object
    var fileObj = {
        name: name,
        type: type,
        xml: initialBlocks,
        generatedCode: '',
    };

    // Add to files array and userFiles object
    files.push(fileObj);
    userFiles[`${name}.${type}`] = ''; // Initialize empty content

    // Render the file list and select the new file
    renderFileList();
    selectFile(files.length - 1);
}

// Function to render the file list in the UI
function renderFileList() {
    var fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    files.forEach((file, index) => {
        // Create a clickable <a> tag for each file
        var a = document.createElement('a');
        a.textContent = `${file.name}.${file.type}`;
        a.href = '#'; // Prevent default link behavior
        a.className = 'file-item'; // Add a class for styling

        // Set the index of the file
        a.dataset.index = index;

        // Highlight the active file
        if (index === currentFileIndex) {
            a.classList.add('active');
        }

        // Click event to select the file
        a.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default behavior of anchor
            selectFile(parseInt(this.dataset.index));
        });

        // Right-click event to delete the file
        a.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            if (confirm(`Are you sure you want to delete "${file.name}.${file.type}"?`)) {
                if (index == currentFileIndex) {
                    alert("Cannot delete the active file.");
                    return;
                }
                deleteFile(index);
            }
        });

        // Append to the file list container
        fileList.appendChild(a);
    });
}

// Function to select a file
function selectFile(index) {
    if (index < 0 || index >= files.length) return;

    // Save current workspace to the current file before switching
    if (currentFileIndex !== -1) {
        var currentFile = files[currentFileIndex];
        var xml = Blockly.Xml.workspaceToDom(workspace);
        var xmlText = Blockly.Xml.domToText(xml);
        currentFile.xml = xmlText;
        currentFile.generatedCode = generateCodeForFile(currentFile);
        userFiles[`${currentFile.name}.${currentFile.type}`] = currentFile.generatedCode;
    }

    currentFileIndex = index;
    var file = files[index];

    updateFileLabelBlock(`${file.name}.${file.type}`);

    // Load the selected file's blocks into the workspace
    workspace.clear();
    if (file.xml.trim() !== '') {
        var xml = Blockly.Xml.textToDom(file.xml);
        Blockly.Xml.domToWorkspace(xml, workspace);
        //Show xml of the selected file
        // console.log(xml);
    }

    // Update the generated code textarea
    document.getElementById('generatedCode').value = file.generatedCode;

    // Update the active class in the file list
    var fileListItems = document.querySelectorAll('#fileList a'); // Fix: Select the <a> items inside the #fileList
    fileListItems.forEach(item => item.classList.remove('active')); // Remove 'active' from all
    if (fileListItems[index]) {
        fileListItems[index].classList.add('active'); // Add 'active' to the selected file
    }

    // Update the userFiles object
    userFiles[`${file.name}.${file.type}`] = file.generatedCode;

    // Update the live preview
    updateLivePreview();
}

// Function to delete a file
function deleteFile(index) {
    if (index < 0 || index >= files.length) return;

    var file = files[index];
    var filename = `${file.name}.${file.type}`;

    // Remove from files array and userFiles object
    files.splice(index, 1);
    delete userFiles[filename];

    // If the deleted file was selected, clear the workspace or select another file
    if (currentFileIndex === index) {
        workspace.clear();
        document.getElementById('generatedCode').value = '';
        if (files.length > 0) {
            selectFile(0);
        } else {
            currentFileIndex = -1;
        }
    } else if (currentFileIndex > index) {
        currentFileIndex--;
    }

    renderFileList();
}

// Handle adding a new file via the form
document.getElementById('addFileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var fileNameInput = document.getElementById('newFileName');
    var fileTypeSelect = document.getElementById('newFileType');
    var name = fileNameInput.value.trim();
    var type = fileTypeSelect.value;

    if (name === '') {
        alert('File name cannot be empty.');
        return;
    }

    // Validate file name (avoid special characters, spaces, etc.)
    var validName = /^[a-zA-Z0-9_-]+$/.test(name);
    if (!validName) {
        alert('Invalid file name. Use only letters, numbers, underscores, and hyphens.');
        return;
    }

    addFile(name, type);
    fileNameInput.value = ''; // Clear input
});

// Function to generate code for all files
function generateAllCode() {
    var allCode = {
        html: {},
        css: '',
        js: ''
    };

    files.forEach(file => {
        var code = generateCodeForFile(file);
        if (file.type === 'html') {
            allCode.html[`${file.name}.${file.type}`] = code;

        } else if (file.type === 'css') {
            allCode.css += code + '\n';
        } else if (file.type === 'js') {
            allCode.js += code + '\n';
        }
    });

    return allCode;
}

// Function to generate code for a single file based on its type
function generateCodeForFile(file) {
    var code = '';
    if (file.type === 'html') {
        // Use your custom HTML generator
        if (Blockly.Html) {
            code = Blockly.Html.workspaceToCode(workspace);
        } else {
            // If no custom generator, use JavaScript generator as placeholder
            code = Blockly.JavaScript.workspaceToCode(workspace);
            console.warn('No custom HTML generator found. Using JavaScript generator instead.');
        }
    } else if (file.type === 'css') {
        // Use your custom CSS generator
        if (Blockly.Css) {
            code = Blockly.JavaScript.workspaceToCode(workspace);
        } else {
            // If no custom generator, use JavaScript generator as placeholder
            code = Blockly.JavaScript.workspaceToCode(workspace);
            console.warn('No custom CSS generator found. Using JavaScript generator instead.');
        }
    } else if (file.type === 'js') {
        // Use the JavaScript generator
        code = Blockly.JavaScript.workspaceToCode(workspace);
    }
    return code;
}
//Function to generate HTML from blocks
function generateHTMLFromBlocks() {
    if (currentFileIndex === -1) return; // No file selected

    var selectedFile = files[currentFileIndex];

    // Check if the selected file is an HTML file
    if (selectedFile.type !== 'html') {
        console.warn('Please select an HTML file to preview.');
        document.getElementById('preview').srcdoc = ''; // Clear the iframe
        return;
    }

    // Get the selected HTML file's code
    var htmlContent = selectedFile.generatedCode;

    // console.log("HTML Content:", htmlContent);

    // Temporary container to parse HTML and find linked resources
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlContent, 'text/html');

    var bodyContent = doc.body.innerHTML;
    var styleContentHead = doc.head.querySelector('style')?.textContent || '';
    var bodyStyle = doc.body.getAttribute('style') || '';  // Get the inline style on <body>


    // Collect CSS and JS file names from link and script tags in the HTML
    var linkedCSS = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
        .map(link => link.getAttribute('href'));

    var linkedJS = Array.from(doc.querySelectorAll('script[src]'))
        .map(script => script.getAttribute('src'));

    // console.log("Linked CSS files:", linkedCSS);
    // console.log("Linked JS files:", linkedJS);

    // Aggregate CSS and JS contents based on the linked files
    var allCSS = linkedCSS
        .map(href => {
            var cssFile = files.find(file => `${file.name}.css` === href);
            // console.log(`CSS file for ${href}:`, cssFile);
            return cssFile ? cssFile.generatedCode : '';
        })
        .join('\n');
    allCSS = `${styleContentHead} ${allCSS}`;
    var allJS = linkedJS
        .map(src => {
            var jsFile = files.find(file => `${file.name}.js` === src);
            // console.log(`JS file for ${src}:`, jsFile);
            return jsFile ? jsFile.generatedCode : '';
        })
        .join('\n');

    // console.log("All CSS combined:", allCSS);
    // console.log("All JS combined:", allJS);

    return [allCSS, bodyStyle, bodyContent, allJS, selectedFile]
}
// Function to update the live preview iframe

function updateLivePreview() {

    const [allCSS, bodyStyle, bodyContent, allJS, selectedFile] = generateHTMLFromBlocks()

    // Construct the full HTML document with the specific CSS and JS included
    var fullHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Live Preview - ${selectedFile.name}</title>
        ${allCSS ? `<style>${allCSS}</style>` : ''}
    </head>
    <body ${bodyStyle ? `style="${bodyStyle}"` : ''}>
        ${bodyContent}
    
        ${allJS ? `<script>${allJS}</script>` : ''}
         <script>
      // Intercept link clicks and handle internal/external navigation
      document.addEventListener('click', function(e) {
          var target = e.target.closest('a'); // Support nested elements inside <a>
          if (target && target.tagName === 'A' && target.getAttribute('href')) {
              var href = target.getAttribute('href');
              // Check if the link is external
              if (href.startsWith('http://') || href.startsWith('https://')) {
                  // External link: allow default behavior (e.g., open in new tab)
                  // Optionally, you can set target="_blank" dynamically
                  target.setAttribute('target', '_blank');
              } else {
                  // Internal link: handle navigation within the editor
                  e.preventDefault(); // Prevent default navigation
                  window.parent.postMessage({ type: 'navigate', href: href }, '*'); // Send message to parent
              }
          }
      });
    </script>
    </body>
    </html>`;

    //console.log("Final HTML for preview:", fullHTML);

    // Update the Live Preview iframe's srcdoc
    var iframe = document.getElementById('preview');
    iframe.srcdoc = fullHTML;

    // Also update the pop-out window
    updatePopOutWindow(allCSS, bodyStyle, bodyContent, allJS);
}


// Function to load a specific page into the Live Preview iframe
function loadPage(page) {
    function updatePopOutWindow(allCSS, bodyStyle, bodyContent, allJS) {
        if (previewWindow && !previewWindow.closed) {
            previewWindow.postMessage({
                type: "updateContent",
                css: allCSS,
                style: bodyStyle,
                content: bodyContent,
                js: allJS
            }, "*");
        }
    }
    // Ensure the page exists in userFiles
    if (!userFiles.hasOwnProperty(page)) {
        alert(`File "${page}" does not exist.`);
        return;
    }

    // Find the file object
    var fileObj = files.find(file => `${file.name}.${file.type}` === page);

    if (!fileObj) {
        alert(`File "${page}" not found.`);
        return;
    }

    // Update currentFileIndex to the target file
    var targetIndex = files.indexOf(fileObj);
    if (targetIndex === -1) {
        alert(`File "${page}" not found in the file list.`);
        return;
    }

    // Select the target file, which will update the Live Preview
    selectFile(targetIndex);
}
function showModal() {
    confirmationModal.style.display = 'block'; // Show the modal
}
const confirmationModal = document.getElementById('confirmationModal');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
// Hide the modal when the user clicks "No"
noButton.addEventListener('click', function () {
    confirmationModal.style.display = 'none'; // Close the modal
});

// Proceed with the download when the user clicks "Yes"
yesButton.addEventListener('click', function () {
    confirmationModal.style.display = 'none'; // Close the modal

    // Trigger the actual download (replace this with your actual download logic)
    exportProjectAsZip();
});
// Function to export all files as a ZIP
function exportProjectAsZip() {


    var zip = new JSZip();

    // Identify the main HTML file (e.g., 'index.html')
    var mainHtmlFile = files.find(file => file.type === 'html' && file.name.toLowerCase() === 'index');

    if (!mainHtmlFile) {
        alert('Please create an "index.html" file as the main HTML document for exporting.');
        return;
    }

    // Add HTML files
    files.filter(file => file.type === 'html').forEach(file => {
        var htmlContent = file.generatedCode;

        // Parse the HTML to inject only referenced CSS and JS files
        var parser = new DOMParser();
        var doc = parser.parseFromString(htmlContent, 'text/html');

        // Add linked CSS files
        var cssLinks = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
            .map(link => link.getAttribute('href'))
            .filter(href => href.endsWith('.css'));

        cssLinks.forEach(cssFileName => {
            var cssFile = files.find(file => `${file.name}.css` === cssFileName);
            if (cssFile) zip.file(cssFileName, cssFile.generatedCode);
        });

        // Add linked JS files
        var jsLinks = Array.from(doc.querySelectorAll('script[src]'))
            .map(script => script.getAttribute('src'))
            .filter(src => src.endsWith('.js'));

        jsLinks.forEach(jsFileName => {
            var jsFile = files.find(file => `${file.name}.js` === jsFileName);
            if (jsFile) zip.file(jsFileName, jsFile.generatedCode);
        });

        // Add the HTML file itself
        zip.file(`${file.name}.html`, doc.documentElement.outerHTML);
    });

    // Generate the ZIP file and trigger download
    zip.generateAsync({ type: 'blob' }).then(content => {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(content);
        a.download = 'project.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    });
}

// Add event listener for the export button
document.getElementById('exportButton').addEventListener('click', showModal);


// Function to create an initial HTML file (e.g., index.html)
function createInitialHtmlFile() {
    var initialFileName = 'index';
    var initialFileType = 'html';
    addFile(initialFileName, initialFileType);


    // Inject default blocks for HTML
    injectDefaultHtmlBlocks(workspace);  // Ensure 'workspace' is defined here
}

// Function to inject default blocks for HTML structure
function injectDefaultHtmlBlocks(workspace) {

    const xmlText = ``
    // const xmlText = `
    //    <xml xmlns="https://developers.google.com/blockly/xml"><block type="html_doctype" id="=~G0u!a[/8K^=WF|Q18C" x="26" y="28"><next><block type="html_html" id="AJRC)uHs3[w3Hm[{9y;I"><statement name="CONTENT"><block type="html_head" id=".vC4_R99:m%\`p_PhZJt|"><next><block type="html_body" id="}8/9vZOxk9M?gGv/tm,G"><value name="ATTRIBUTES"><block type="html_attribute_style" id="ULu;W@d~f@2|gHRyRmPC"><value name="LEFT_INPUT"><block type="css_background_color" id="/UOSX/AWaa=]jK^}I-xp"><field name="COLOR">pink</field></block></value></block></value><statement name="CONTENT"><block type="html_heading" id="WY|y(wzStycc;q9U/+Sb"><field name="HEADING_LEVEL">h1</field><field name="HEADING_LEVEL_CLOSING">h1</field><value name="ATTRIBUTES"><block type="html_attribute_style" id="Y;GzqtNBuj4R@,?-CrLy"><value name="LEFT_INPUT"><block type="css_text_align" id="bLN#q.s+EedSmDcQ/\`5}"><field name="ALIGN">left</field><value name="LEFT_INPUT"><block type="css_border" id="FUkm;SH*/\`|5N7z5d_PS"><field name="BORDER">4px dotted white</field></block></value></block></value></block></value><statement name="CONTENT"><block type="plain_text" id="m,s4IST$KO86@BY;0g^s"><field name="CONTENT">I am the best!</field></block></statement></block></statement></block></next></block></statement></block></next></block></xml>
    // `;

    if (xmlText) {

        const xml = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }
}

// Initialize by creating an initial HTML file when the page loads
window.addEventListener('load', function () {
    createInitialHtmlFile();

    // Optionally, create a default about.html file
    // addFile('about', 'html');
});

// Function to generate code from the workspace and store it in the current file
function updateGeneratedCode() {
    if (currentFileIndex === -1) return;

    var file = files[currentFileIndex];
    var code = '';

    // Generate code based on file type
    if (file.type === 'html') {
        // Use your custom HTML generator
        if (Blockly.Html) {
            code = Blockly.Html.workspaceToCode(workspace);
        } else {
            // If no custom generator, use JavaScript generator as placeholder
            code = Blockly.JavaScript.workspaceToCode(workspace);
            console.warn('No custom HTML generator found. Using JavaScript generator instead.');
        }
    } else if (file.type === 'css') {
        // Use your custom CSS generator
        if (Blockly.Css) {
            code = Blockly.JavaScript.workspaceToCode(workspace);
        } else {
            // If no custom generator, use JavaScript generator as placeholder
            code = Blockly.JavaScript.workspaceToCode(workspace);
            console.warn('No custom CSS generator found. Using JavaScript generator instead.');
        }
    } else if (file.type === 'js') {
        // Use the JavaScript generator
        code = Blockly.JavaScript.workspaceToCode(workspace);
    }

    file.generatedCode = code;
    userFiles[`${file.name}.${file.type}`] = code; // Update the userFiles mapping
    document.getElementById('generatedCode').value = code;

    // Update the Live Preview
    updateLivePreview();
}

// Add a listener to update the generated code whenever the workspace changes
workspace.addChangeListener(updateGeneratedCode);

//document.getElementById('runCode').addEventListener('click',updateGeneratedCode);

// Listen for messages from the iframe to handle navigation
window.addEventListener('message', function (event) {
    if (event.data.type === 'navigate' && event.data.href) {
        var href = event.data.href;
        console.log(`Message received to navigate to: ${href}`);

        if (userFiles.hasOwnProperty(href)) {
            loadPage(href);
        } else {
            alert(`File "${href}" does not exist.`);
        }
    }
});

// Handle opening/closing of File Manager and Toolbox
const fileManagerButton = document.getElementById("fileManagerButton");
const fileManager = document.getElementById("fileManager");
const toolboxButton = document.getElementById("toolsButton");

// Toggle File Manager visibility
fileManagerButton.addEventListener("click", function () {
    var toolboxDiv = document.querySelector('.blocklyToolboxDiv');
    var flyout=document.querySelector('.blocklyFlyout');
    
    //To close toolbox if user clicks on files button
    var isVisible = window.getComputedStyle(toolboxDiv).display == 'block';

    if (isVisible) {
        toolboxButton.classList.toggle('active')
        document.querySelector('.blocklyToolboxDiv').style.setProperty('display', 'none', 'important');
        if(isFlyoutOpen){
            flyout.style.setProperty('display', 'none', 'important');
        }   
    }
    if (fileManager.style.display === "none" || !fileManager.style.display) {
        fileManager.style.display = "block";
        this.classList.toggle('active');
    } else {
        fileManager.style.display = "none";
        this.classList.toggle('active');
    }
});

// Get elements
const resizer = document.getElementById('resizer');
const rightPane = document.getElementById('rightPane');
const blocklyArea = document.getElementById('blocklyArea');

// Initial mouse position
let x = 0;
let rightPaneWidth = rightPane.offsetWidth;

// Mouse down event to start resizing
resizer.addEventListener('mousedown', function (e) {
    x = e.clientX;
    rightPaneWidth = rightPane.offsetWidth;

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

// Function to resize the right pane
function resize(e) {
    const dx = e.clientX - x;
    rightPane.style.width = `${rightPaneWidth - dx}px`;
    blocklyArea.style.flexGrow = 1;  // Ensure the Blockly area fills the remaining space
    Blockly.svgResize(workspace);    // Resize the Blockly workspace
}

// Stop resizing on mouse up
function stopResize() {
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

// Toggle between showing the code and the preview
document.getElementById('showCodeButton').addEventListener('click', function () {
    toggleView('code');
});

document.getElementById('showPreviewButton').addEventListener('click', function () {
    toggleView('preview');
});


function toggleView(view) {
    const codeSection = document.getElementById('generatedCodeSection');
    const previewSection = document.getElementById('previewSection');

    // Reset active button styles
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));

    if (view === 'code') {
        codeSection.style.display = 'block';
        previewSection.style.display = 'none';
        document.getElementById('showCodeButton').classList.add('active');
    } else {
        codeSection.style.display = 'none';
        previewSection.style.display = 'block';
        document.getElementById('showPreviewButton').classList.add('active');
    }
}

let previewWindow = null;
function updatePopOutWindow(allCSS, bodyStyle, bodyContent, allJS) {
    if (previewWindow && !previewWindow.closed) {
        previewWindow.postMessage({
            type: "updateContent",
            css: allCSS,
            style: bodyStyle,
            content: bodyContent,
            js: allJS
        }, "*");
    }
}
function popOutPreview() {
    if (previewWindow && !previewWindow.closed) {
        // Focus the existing preview window if already open
        previewWindow.focus();
    } else {
        // Open a new preview window
        previewWindow = window.open("", "PreviewWindow", "width=800,height=600");

        // Basic HTML structure with a message listener for updates
        const [allCSS, bodyStyle, bodyContent, allJS, selectedFile] = generateHTMLFromBlocks();

        previewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Live Preview - ${selectedFile.name}</title>
                ${allCSS ? `<style>${allCSS}</style>` : ''}
                <script>
                    // Set up listener to handle updates from main window
                    window.addEventListener('message', (event) => {
                        if (event.data.type === "updateContent") {
                            const { css, style, content, js } = event.data;
                            // Update CSS
                            document.head.querySelector("style")?.remove();
                            if (css) {
                                const styleTag = document.createElement("style");
                                styleTag.innerHTML = css;
                                document.head.appendChild(styleTag);
                            }
                            // Update body content
                            document.body.innerHTML = content;
                            // Update body style
                            document.body.style = style;
                            // Update JS
                            const scriptTag = document.createElement("script");
                            scriptTag.innerHTML = js;
                            document.body.appendChild(scriptTag);
                        }
                    });
                </script>
            </head>
            <body style="${bodyStyle}">
                ${bodyContent}
                <script>${allJS}</script>
            </body>
            </html>
        `);

        // Send initial content to preview window
        setTimeout(() => {
            updatePopOutWindow(allCSS, bodyStyle, bodyContent, allJS, selectedFile);
        }, 100);
    }
}

document.getElementById('popOut').addEventListener('click', function () {
    popOutPreview()
})

//Addded this function to toggle toolbox
toolboxButton.addEventListener('click', function () {


    //To close fileManger when toolbox is clicked
    if (fileManager.style.display === "block") {
        fileManagerButton.classList.toggle('active')
        fileManager.style.display = "none";
    }

    var toolboxDiv = document.querySelector('.blocklyToolboxDiv');
    var flyout=document.querySelector('.blocklyFlyout');
    var flyoutVisible=flyout.style.display === "block";
 
    var isVisible = window.getComputedStyle(toolboxDiv).display == 'block';

    if (isVisible) {

        this.classList.toggle('active');
        toolboxDiv.style.setProperty('display', 'none', 'important');
        if(isFlyoutOpen && flyoutVisible) {
            flyout.style.display = "none";
        }
        
        
    }
    else {
        this.classList.toggle('active');
        toolboxDiv.style.setProperty('display', 'block', 'important');
        if(isFlyoutOpen && !flyoutVisible) {
            flyout.style.display = "block";
        }
     
        

    }
})
// This function sets up an event listener to manage the opening/closing of categories
function setupSingleCategoryOpen() {
    // Listen for Blockly events on the workspace
    workspace.addChangeListener(function (event) {
        //console.log(event.type)
        // Check if the event is a category open event
        if (event.type === 'toolbox_item_select') {

            //Checking if the flyOut is open
            isFlyoutOpen=workspace.getFlyout().isVisible();
    
              
            var selectedCategory = Blockly.getMainWorkspace().getToolbox().getSelectedItem();
            var selectedCategoryName = selectedCategory.name_;

       
            const toolbox = workspace.getToolbox();

            if (selectedCategory.parent_) {

              if (selectedCategory.parent_) {

                var parentCategory = selectedCategory.parent_.name_;

                var parentCategoryParent=''
               
 
                // Loop through all categories to get the parent of parent category if any
                toolbox.getToolboxItems().forEach(item => {
                    if(item.name_ == parentCategory){
                       parentCategoryParent=item.toolboxItemDef_.id;
                    }    
                    
                });
                //Making sure only the selected category and parent category are open
                toolbox.getToolboxItems().forEach(item=>{
                    if(item.name_!==selectedCategoryName && item.name_!==parentCategory && item.name_!==parentCategoryParent){
                        if(item.expanded_){
                            item.setExpanded(false);
                        }
                    }
                })

                       
              
            }
                      
              
            }
            else {
                // Loop through all categories
                toolbox.getToolboxItems().forEach(item => {

                    if (item.expanded_ && item.name_ != selectedCategoryName) {
                        item.setExpanded(false);
                    }

                });
            }


        }
    });
}

// Call this function after Blockly workspace has been initialized
setupSingleCategoryOpen();


