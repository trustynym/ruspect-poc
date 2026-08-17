(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>{let[t,n,r]=e,i=Math.max(1,Math.min(255,r|0)),a=Math.min(255,t*r/(i+1)*255|0),o=Math.min(255,n*r/(i+1)*255|0),s=Math.min(255,r/(i+1)*255|0);return(i|a<<24|o<<16|s<<8)>>>0},t=vasel.getContext(`webgl2`),n=vasel.width=innerWidth,r=vasel.height=innerHeight,i=[],a=()=>{let e=t.createFramebuffer(),a=t.createTexture();return t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,n,r,0,t.RGBA,t.UNSIGNED_BYTE,null),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,e),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),t.bindFramebuffer(t.FRAMEBUFFER,null),i.push(()=>{t.deleteFramebuffer(e),t.deleteTexture(a)}),{fb:e,tex:a}},o=a(),s=a();t.bindFramebuffer(t.FRAMEBUFFER,s.fb),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,null);var c=a(),l=(e,t,n)=>{if(e.length<16)return[new Float32Array,new Uint16Array];let r=new Float32Array(e.length),i=2*e[1]-e[9],a=2*e[2]-e[10];for(let o=0;o<e.length>>3;o++){let s=o<<3,c=e[s|1],l=e[s|2];e[s|3];let u=e[s|4];e[s|5],e[s|6],e[s|7],e[(s|1)+8],e[(s|2)+8];let d=c-i,f=l-a,p=Math.atan2(f,d),m=t*u*-Math.sin(p),h=n*u*Math.cos(p);r[o<<3|0]=c+m,r[o<<3|1]=l+h,r[o<<3|2]=0,r[o<<3|3]=0,r[o<<3|4]=c-m,r[o<<3|5]=l-h,r[o<<3|6]=1,r[o<<3|7]=0,i=c,a=l}let o=new Uint16Array(((e.length>>>3)-1)*6);for(let t=0;t<(e.length>>3)-1;t++)o[t*6+0]=t<<1|0,o[t*6+1]=t<<1|1,o[t*6+2]=(t<<1)+2,o[t*6+3]=(t<<1)+2,o[t*6+4]=t<<1|1,o[t*6+5]=(t<<1)+3;return[r,o]},u=(e,n)=>{let r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,e,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null);let i=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,i),t.bufferData(t.ELEMENT_ARRAY_BUFFER,n,t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null),[r,i]},{vsh:d,fsh:f,prog:p,setColor:m}=(()=>{let e=t.createShader(t.VERTEX_SHADER);t.shaderSource(e,`#version 300 es

layout(location=0)in vec4 aPos;
out vec4 vPos;

void main(){
  vPos=aPos;
  vPos.xy = vPos.xy * 2. - 1.;
  gl_Position=vec4(vPos.xy,0.,1.);
}
`),t.compileShader(e),console.log(t.getShaderInfoLog(e)||`novsherr`);let n=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(n,`#version 300 es

precision highp float;

vec3 unpackSpect(vec4 packed){
    float r = float(packed.r);
    float g = float(packed.g);
    float b = float(packed.b);
    float a = float(packed.a);
    float m = a+1.;
    float i = m * (b / 255.);
    float w = (m * r) / (255. * i);
    float s = (m * g) / (255. * i);
    return vec3(w,s,i);
}

ivec4 packSpect(vec3 unpacked){
    int m = max(1,min(255,int((unpacked.z))));
    float fm = float(m)+1.;
    return ivec4(
        min(255,int(((unpacked.x * unpacked.z)/fm)*255.)),
        min(255,int(((unpacked.y * unpacked.z)/fm)*255.)),
        min(255,int(((unpacked.z)/fm)*255.)),
        m);
}

in vec4 vPos;

uniform uint uColor;

layout(location=0)out vec4 outColor;

void main(){
    float r = float((uColor>>24) &0xffu);
    float g = float((uColor>>16) &0xffu);
    float b = float((uColor>>8)  &0xffu);
    float a = float((uColor>>0)  &0xffu);

    vec3 unpacked = unpackSpect(vec4(r,g,b,a));

    float mulF = pow(1.-abs(vPos.z-.5)*2.,.25);
    unpacked.z *= mulF;

    gl_FragDepth = 1.-mulF;

    outColor=vec4(packSpect(unpacked))/255.;
    // outColor=vec4(r,g,b,a);
    // outColor=vec4(vec3(vPos.z),1.);
    // outColor = vec4(.5,0.,,1.);
}`),t.compileShader(n),console.log(t.getShaderInfoLog(n)||`nofsherr`);let r=t.createProgram();t.attachShader(r,e),t.attachShader(r,n),t.linkProgram(r),console.log(t.getProgramInfoLog(r)||`nolinkerr`);let i=t.getUniformLocation(r,`uColor`);return{vsh:e,fsh:n,prog:r,setColor(e){t.uniform1ui(i,e)}}})(),h=null,g=null,_=20,v=[],y=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,y),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,vasel.width,vasel.height),t.bindRenderbuffer(t.RENDERBUFFER,null);var b=()=>{h&&t.deleteBuffer(h),g&&t.deleteBuffer(g);let[n,r]=u(...l(v,_/vasel.width,_/vasel.height));h=n,g=r,!(v.length<16)&&(t.enable(t.STENCIL_TEST),t.bindFramebuffer(t.FRAMEBUFFER,o.fb),t.viewport(0,0,vasel.width,vasel.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(p),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,y),t.enable(t.STENCIL_TEST),t.clearStencil(0),t.clear(t.STENCIL_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),t.stencilFunc(t.ALWAYS,1,-2),t.stencilOp(t.ZERO,t.REPLACE,t.REPLACE),t.enableVertexAttribArray(0),t.bindBuffer(t.ARRAY_BUFFER,n),t.vertexAttribPointer(0,4,t.FLOAT,!1,16,0),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.drawElements(t.TRIANGLES,((v.length>>>3)-1)*6,t.UNSIGNED_SHORT,0),t.disable(t.STENCIL_TEST),t.disable(t.DEPTH_TEST),t.bindFramebuffer(t.FRAMEBUFFER,c.fb),x(s.tex),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.STENCIL_ATTACHMENT,t.RENDERBUFFER,y),t.enable(t.STENCIL_TEST),t.stencilFunc(t.EQUAL,1,1),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.useProgram(p),m(e(k)),t.enableVertexAttribArray(0),t.bindBuffer(t.ARRAY_BUFFER,n),t.vertexAttribPointer(0,4,t.FLOAT,!1,16,0),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.enable(t.BLEND),t.blendFuncSeparate(t.CONSTANT_ALPHA,t.CONSTANT_ALPHA,t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),t.blendColor(0,0,0,.5),x(o.tex),t.disable(t.BLEND),t.disable(t.STENCIL_TEST),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null),t.bindFramebuffer(t.FRAMEBUFFER,null),S(c.tex))},x=(()=>{let e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,0,1,0,1,1,0,0,1,1,0,1]),t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null);let n=t.createShader(t.VERTEX_SHADER);t.shaderSource(n,`#version 300 es

layout(location=0)in vec2 aPos;

out vec2 vPos;

void main(){
    gl_Position=vec4(aPos*2.-1.,0.,1.);
    vPos=aPos;
}`),t.compileShader(n),console.log(t.getShaderInfoLog(n)||`novsherr`);let r=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(r,`#version 300 es
precision highp float;
in vec2 vPos;

uniform sampler2D uSampler;

layout(location=0)out vec4 outColor;


vec3 unpackSpect(vec4 packed){
    float r = float(packed.r);
    float g = float(packed.g);
    float b = float(packed.b);
    float a = float(packed.a);
    float m = a+1.;
    float i = m * (b / 255.);
    float w = (m * r) / (255. * i);
    float s = (m * g) / (255. * i);
    return vec3(w,s,i);
}

ivec4 packSpect(vec3 unpacked){
    int m = max(1,min(255,int((unpacked.z))));
    float fm = float(m);
    return ivec4(
        min(255,int(((unpacked.x * unpacked.z)/fm)*255.)),
        min(255,int(((unpacked.y * unpacked.z)/fm)*255.)),
        min(255,int(((unpacked.z)/fm)*255.)),
        m);
}

    

void main(){
    vec4 color = texture(uSampler,vPos);

    // float r = float(color.r*255.);
    // float g = float(color.g*255.);
    // float b = float(color.b*255.);
    // float a = float(color.a*255.);

    // vec3 unpacked = unpackSpect(vec4(r,g,b,a));

    // outColor=vec4(packSpect(unpacked))/255.;

    outColor=color;
}
`),t.compileShader(r),console.log(t.getShaderInfoLog(r)||`nofsherr`);let i=t.createProgram();t.attachShader(i,n),t.attachShader(i,r),t.linkProgram(i),console.log(t.getProgramInfoLog(i)||`nolinkerr`);let a=t.getUniformLocation(i,`uSampler`);return t.useProgram(i),t.uniform1i(a,0),t.useProgram(null),n=>{t.useProgram(i),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,n),t.enableVertexAttribArray(0),t.bindBuffer(t.ARRAY_BUFFER,e),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0),t.bindBuffer(t.ARRAY_BUFFER,null),t.drawArrays(t.TRIANGLES,0,6)}})(),S=(()=>{let e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,0,1,0,1,1,0,0,1,1,0,1]),t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null);let n=t.createShader(t.VERTEX_SHADER);t.shaderSource(n,`#version 300 es

layout(location=0)in vec2 aPos;

out vec2 vPos;

void main(){
    gl_Position=vec4(aPos*2.-1.,0.,1.);
    vPos=aPos;
}`),t.compileShader(n),console.log(t.getShaderInfoLog(n)||`novsherr`);let r=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(r,`#version 300 es
precision highp float;
in vec2 vPos;

uniform sampler2D uSampler;

layout(location=0)out vec4 outColor;

const float spreadFac = 2.;
const float spreadExpFac = .5;

void addColorFac(inout vec3 val, in float waveLengthCr, in vec3 col, in float width,in float strength, in float position, in float widthMul){
    val += col * strength * exp(-pow((waveLengthCr-position)/(widthMul * width + 1e-10),2.)) / sqrt(widthMul);
}

vec3 unpackSpect(vec4 packed){
    float r = float(packed.r);
    float g = float(packed.g);
    float b = float(packed.b);
    float a = float(packed.a);
    float m = a+1.;
    float i = m * (b / 255.);
    float w = (m * r) / (255. * i);
    float s = (m * g) / (255. * i);
    return vec3(w,s,i);
}

// float ACESFilm(float x)
// {
// float a = 2.51;
// float b = 0.03;
// float c = 2.43;
// float d = 0.59;
// float e = 0.14;
// // return min(1.,(x*(a*x+b))/(x*(c*x+d)+e));
// return (x*(a*x+b))/(x*(c*x+d)+e);
// }

float tone(float x){
    return (1.+x/10.)*x/(1.+x);
}
vec3 tone(vec3 x){
    // return x/(1.+x);
    // return x/(5.+x);
    return x;
}

void main(){
    vec4 color = texture(uSampler,vPos);

    vec3 up = unpackSpect(color*255.);

    float waveLengthCr = up.r;
    float spreadCr = up.g;
    // float waveLengthCr = vPos.x;
    // float spreadCr = vPos.y;
    
    float widthMul = pow(spreadFac * (spreadCr), pow(2., spreadExpFac))+1.;

    vec3 s = vec3(0.);
    addColorFac(s,waveLengthCr,vec3(1.,0.,0.),.2,.85,.35,widthMul);
    addColorFac(s,waveLengthCr,vec3(1.,0.,0.),.15,.3,.75,widthMul);
    addColorFac(s,waveLengthCr,vec3(0.,1.,0.),.2,.85,.5,widthMul);
    addColorFac(s,waveLengthCr,vec3(0.,0.,1.),.2,.8,.65,widthMul);

    // vec3 cColor =s*up.b;
    // vec3 cColor =s*log2(up.b+1.)/8.;
    // vec3 cColor =s*log2(up.b+1.)/8.;
    // vec3 cColor =s*ACESFilm(up.b/10.);
    // vec3 cColor =s*tone(up.b);
    // vec3 cColor =s*up.b;
    vec3 cColor = s*tone(up.b);


    // cColor = log2(cColor+1.)/8.;

    // outColor=vec4(cColor,1.);
    outColor=vec4(pow(tone(cColor),vec3(2.2)),1.);
    // outColor=vec4(vec3(up),1.);
    // outColor=color;
}
`),t.compileShader(r),console.log(t.getShaderInfoLog(r)||`nofsherr`);let i=t.createProgram();t.attachShader(i,n),t.attachShader(i,r),t.linkProgram(i),console.log(t.getProgramInfoLog(i)||`nolinkerr`);let a=t.getUniformLocation(i,`uSampler`);return t.useProgram(i),t.uniform1i(a,0),t.useProgram(null),n=>{t.useProgram(i),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,n),t.enableVertexAttribArray(0),t.bindBuffer(t.ARRAY_BUFFER,e),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0),t.bindBuffer(t.ARRAY_BUFFER,null),t.drawArrays(t.TRIANGLES,0,6)}})(),C=()=>{t.bindFramebuffer(t.FRAMEBUFFER,s.fb),t.viewport(0,0,vasel.width,vasel.height),x(c.tex),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,vasel.width,vasel.height),S(c.tex)},w=``;addEventListener(`keydown`,e=>{w=e.key}),addEventListener(`keyup`,e=>{w===e.key&&(w=``)});var T=!1,E=0,D=0,O=0,k=[.3,.2,1.5];addEventListener(`pointerdown`,e=>{e.preventDefault(),v.length=0,document.body.setPointerCapture(e.pointerId);let t=e.getCoalescedEvents()||[e];for(let e of t)v.push(0,e.x/vasel.clientWidth,1-e.y/vasel.clientHeight,0,e.pressure,0,0,0);b()}),addEventListener(`pointermove`,e=>{if(e.preventDefault(),!e.buttons)return;if(w&&w!==`Alt`){let t=T?(e.x-E)/1e3:0,n=T?(e.y-D)/1e3:0,r=T?O:O=k[2];E=e.x,D=e.y,T=!0,w===`f`?(k[0]=Math.min(1,Math.max(0,k[0]+t)),k[1]=Math.min(1,Math.max(0,k[1]+n))):w===`s`&&(k[2]=Math.min(255,Math.max(1/255,k[2]+r*n))),v.length=0,v.push(0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0),hudel.innerText=k.map(e=>(e*100|0)/100).join(`,`),b();return}if(T)return;let t=e.getCoalescedEvents()||[e];for(let e of t)v.push(0,e.x/vasel.clientWidth,1-e.y/vasel.clientHeight,0,e.pressure,0,0,0);b()}),addEventListener(`pointerup`,e=>{if(e.preventDefault(),T){T=!1,console.log(k.slice());return}let t=e.getCoalescedEvents()||[e];for(let e of t)v.push(0,e.x/vasel.clientWidth,1-e.y/vasel.clientHeight,0,e.pressure,0,0,0);b(),C()}),v.length=0,v.push(0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0),b();