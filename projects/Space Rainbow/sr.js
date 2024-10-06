(function() {
  const canvas = document.getElementById('canvas');
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  function resizeCanvasToDisplaySize(canvas) {
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
  }

  const vertexShaderSource = `
    attribute vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec2 iMouse;
    uniform float iSpeed;
    uniform float iIntensity;
    uniform bool iColorMode;

    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
      vec2 mouse = (iMouse * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
      
      float dist = length(uv - mouse);
      float ripple = sin(dist * 10.0 - iTime * iSpeed) * 0.5 + 0.5;
      
      vec3 color;
      if (iColorMode) {
        color = 0.5 + 0.5 * cos(iTime * iSpeed * 0.1 + uv.xyx + vec3(0, 2, 4));
      } else {
        color = vec3(0.5 + 0.5 * sin(iTime * iSpeed * 0.1 + uv.x * 5.0),
                     0.5 + 0.5 * sin(iTime * iSpeed * 0.15 + uv.y * 5.0),
                     0.5 + 0.5 * sin(iTime * iSpeed * 0.2 + length(uv) * 5.0));
      }
      
      color = mix(color, vec3(1.0), ripple * 0.3 * iIntensity);
      color += pow(1.0 - dist, 4.0) * 0.1 * iIntensity;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.error('Shader compile failed with: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.error('Program failed to link: ' + gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  // Compile shaders and create program
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vertexShader, fragmentShader);

  // Look up attribute and uniform locations
  const positionAttributeLocation = gl.getAttribLocation(program, "aPosition");
  const iTimeUniformLocation = gl.getUniformLocation(program, "iTime");
  const iResolutionUniformLocation = gl.getUniformLocation(program, "iResolution");
  const iMouseUniformLocation = gl.getUniformLocation(program, "iMouse");
  const iSpeedUniformLocation = gl.getUniformLocation(program, "iSpeed");
  const iIntensityUniformLocation = gl.getUniformLocation(program, "iIntensity");
  const iColorModeUniformLocation = gl.getUniformLocation(program, "iColorMode");

  // Create a buffer for the positions
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Full-screen quad
  const positions = [
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Set up the vertex array
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // Interactive controls
  let speed = 1;
  let intensity = 1;
  let colorMode = false;
  let mouseX = 0;
  let mouseY = 0;

  document.getElementById('speed').addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
    document.getElementById('speedValue').textContent = speed.toFixed(1);
  });

  document.getElementById('intensity').addEventListener('input', (e) => {
    intensity = parseFloat(e.target.value);
    document.getElementById('intensityValue').textContent = intensity.toFixed(1);
  });

  document.getElementById('colorMode').addEventListener('click', () => {
    colorMode = !colorMode;
  });

  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  canvas.addEventListener('touchmove', (e) => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
  });

  function render(time) {
    resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    // Convert time from milliseconds to seconds
    let seconds = time * 0.001;

    // Set uniforms
    gl.uniform1f(iTimeUniformLocation, seconds);
    gl.uniform2f(iResolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(iMouseUniformLocation, mouseX, gl.canvas.height - mouseY);
    gl.uniform1f(iSpeedUniformLocation, speed);
    gl.uniform1f(iIntensityUniformLocation, intensity);
    gl.uniform1i(iColorModeUniformLocation, colorMode);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // Loop the animation
    requestAnimationFrame(render);
  }

  // Start the animation loop
  requestAnimationFrame(render);

})();