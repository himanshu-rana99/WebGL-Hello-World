var gl;
var points;
var renderMode;
var renderModeLoc;
var menu; 
var program;
	
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
    // Configure WebGL.
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	// This part responds to menu clicks from the menu set in HTML.
	menu = document.getElementById("mymenu"); 
	menu.addEventListener("click", resetDataOnMenuClick);
    
    // Load shaders.
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	setupTriangleData();

    render();
};

function resetDataOnMenuClick() {
	renderMode = menu.selectedIndex;
	
	// Set up uniform here. 
	renderModeLoc = gl.getUniformLocation(program, "renderMode");
	
	setupTriangleData();
}

function setupTriangleData() {
	
	var vertices;
	var colors;
	// Setup vertex data for the render mode. 
	switch(renderMode) {
		case 0: // Smooth rainbow.
			vertices = getVerticesForTriangles();
			colors = getVertexColorsForTriangles();
			break;
		case 1: // Smooth rainbow using triangle fan.
			vertices = getVerticesForTriangleFan();
			colors = getVertexColorsForTriangleFan();
			break;
		case 2: // Solid green.
			vertices = getVerticesForTriangles();
			colors = getVertexColorsForTriangles();
			break;
		case 3: // Solid blue.
			vertices = getVerticesForTriangles();
			colors = getVertexColorsForTriangles();
			break;
		case 4: // Outline.
			vertices = getVerticesForOutline();
			colors = getVertexColorsForOutline();
			break;
		default: // Default to smooth rainbow.
			vertices = getVerticesForTriangles();
			colors = getVertexColorsForTriangles();
	}
	
    // Load the vertex data into the GPU.
    var bufferIdVertices = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdVertices );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW );
	
    // Associate shader variables with our vertex data buffer.
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// Load the color data into the GPU
	var bufferIdColors = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdColors );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.DYNAMIC_DRAW );
	
	// Associate shader variables with our vertex data buffer.
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
}

// TODO: Edit the getVerticesForTriangles function.
function getVerticesForTriangles() {
	var vertices = [

		//top right
		vec2(0, 0),
		vec2(1, 0),
		vec2(0.45, 0.9), 

		//top middle 
		vec2(0, 0),
		vec2(0.45, 0.9),
		vec2(-0.45, 0.9),

		//top left 
		vec2(0, 0),
		vec2(-0.45, 0.9),
		vec2(-1, 0),


		//bottom middle 
		vec2(0, 0),
		vec2(-0.45, -0.9),
		vec2(0.45, -0.9),

		//bottom left 
		vec2(0, 0),
		vec2(-0.45, -0.9),
		vec2(-1, 0),

		//bottom right 
		vec2(0, 0),
		vec2(0.45, -0.9),
		vec2(1, 0),

		
    ];
	return vertices;
}

// TODO: Edit the getColorsForTriangles function.
function getVertexColorsForTriangles(){
	var colors = [

		//top right 
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 0.0, 0.0, 1.0),
		vec4(1.0, 1.0, 0.0, 1.0), 

		//top middle 
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 0.0, 1.0),
		vec4(0.0, 1.0, 0.0, 1.0), 

		//top left 
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(0.0, 1.0, 0.0, 1.0),
		vec4(0.0, 1.0, 1.0, 1.0),

		//bottom middle 
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(0.0, 0.0, 1.0, 1.0),
		vec4(1.0, 0.0, 1.0, 1.0), 

		//bottom left 
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(0.0, 0.0, 1.0, 1.0),
		vec4(0.0, 1.0, 1.0, 1.0), 

		//bottom right 
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 0.0, 1.0, 1.0),
		vec4(1.0, 0.0, 0.0, 1.0)
	];
	return colors;
}

// TODO: Edit the getVerticesForTriangleFan function.
function getVerticesForTriangleFan() {
	var vertices = [
		vec2(0,0), 
		vec2(-0.5, 1), 
		vec2(0.5, 1), 
		vec2(1,0), 
		vec2(0.5,-1), 
		vec2(-0.5,-1), 
		vec2(-1,0),
		vec2(-0.5, 1)

    ];
	return vertices;
}

// TODO: Edit the getVertexColorsForTriangleFan function.
function getVertexColorsForTriangleFan(){
	var colors = [
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 0.0, 1.0),
		vec4(0.0, 1.0, 0.0, 1.0),
		vec4(0.0, 1.0, 1.0, 1.0),
		vec4(0.0, 0.0, 1.0, 1.0),
		vec4(1.0, 0.0, 1.0, 1.0),
		vec4(1.0, 0.0, 0.0, 1.0), 
		vec4(1.0, 1.0, 0.0, 1.0)

	];
	return colors;
}

// TODO: Edit the getVerticesForOutline function.
function getVerticesForOutline(){
	var vertices = [
		vec2(-0.5, 0.9),
		vec2(0.5, 0.9),
		vec2(1, 0), 
		vec2(0.5, -0.9), 
		vec2(-0.5, -0.9), 
		vec2(-1,0)
    ];
	return vertices;
}

// TODO: Edit the getVertexColorsForOutline function.
function getVertexColorsForOutline(){
	var colors = [
		vec4(1.0, 1.0, 0.0, 1.0),
		vec4(0.0, 1.0, 0.0, 1.0),
		vec4(0.0, 1.0, 1.0, 1.0), 
		vec4(0.0, 0.0, 1.0, 1.0),
		vec4(1.0, 0.0, 1.0, 1.0),
		vec4(1.0, 0.0, 0.0, 1.0)
	];
	return colors;
}

// TODO: Edit the render function.
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.uniform1i(renderModeLoc, renderMode);
	
	switch(renderMode){
		case 0:
			// Goal: Smooth Rainbow - TRIANGLES
			gl.drawArrays( gl.TRIANGLES, 0, 18);
			break;
		case 1:
			// Goal: Smooth Rainbow - TRIANGLE FAN
			gl.drawArrays( gl.TRIANGLE_FAN, 0, 8); 
			
			break;
		case 2: 
			// Goal: Solid Color - Green
			gl.drawArrays( gl.TRIANGLES, 0, 18 );
			break;
		case 3:
			// Goal: Solid Color - Blue
			gl.drawArrays( gl.TRIANGLES, 0, 18 );
			break;
		case 4:
			// Goal: Outline
			gl.drawArrays( gl.LINE_LOOP, 0, 6); 
			
			break;
		default:
			// Make the default behavior match the smooth rainbow rendering.
			gl.drawArrays( gl.TRIANGLES, 0, 18 );
			
	}
	requestAnimFrame(render);
}


