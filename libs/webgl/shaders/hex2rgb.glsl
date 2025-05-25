vec3 hex2rgb(int hexValue){
    vec3 rgbColor;
    rgbColor.r=float((hexValue>>16)&0xFF)/255.;
    rgbColor.g=float((hexValue>>8)&0xFF)/255.;
    rgbColor.b=float((hexValue)&0xFF)/255.;
    return rgbColor;
}

#pragma glslify:export(hex2rgb);